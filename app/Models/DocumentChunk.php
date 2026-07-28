<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DocumentChunk extends Model
{
    protected $fillable = ['document_id', 'content', 'embedding'];

    public function document()
    {
        return $this->belongsTo(Document::class);
    }

    /**
     * Cari teks yang paling relevan dengan pertanyaan user.
     */
    public static function searchBySimilarity(string $query, int $limit = 3)
    {
        // 1. Generate embedding untuk pertanyaan
        $response = \Illuminate\Support\Facades\Http::withToken(env('OPENAI_API_KEY'))
            ->post('https://api.openai.com/v1/embeddings', [
                'model' => 'text-embedding-3-small',
                'input' => $query,
            ]);

        if (!$response->successful()) {
            return collect();
        }

        $embedding = $response->json('data.0.embedding');
        $vectorString = json_encode($embedding);

        // 2. Gunakan pgvector cosine distance (<=>) untuk mencari chunk terdekat
        return static::query()
            ->select('id', 'document_id', 'content')
            ->selectRaw('embedding <=> ?::vector AS distance', [$vectorString])
            ->orderBy('distance')
            ->take($limit)
            ->get();
    }
}
