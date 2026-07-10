<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

use Illuminate\Support\Facades\Http;
use App\Models\Document;
use App\Models\DocumentChunk;

class ChunkTextJob implements ShouldQueue
{
    use Queueable;

    public function __construct(public int $documentId, public string $text)
    {
    }

    public function handle(): void
    {
        // 1. Potong teks menjadi potongan kecil (chunk)
        $chunks = str_split($this->text, 1000);

        foreach ($chunks as $chunk) {
            $chunk = trim($chunk);
            if (empty($chunk)) continue;

            // 2. Generate Embedding via OpenAI
            $response = Http::withToken(env('OPENAI_API_KEY'))
                ->post('https://api.openai.com/v1/embeddings', [
                    'model' => 'text-embedding-3-small',
                    'input' => $chunk,
                ]);

            if ($response->successful()) {
                $embedding = $response->json('data.0.embedding');

                // 3. Simpan chunk dan vector ke database
                DocumentChunk::create([
                    'document_id' => $this->documentId,
                    'content' => $chunk,
                    'embedding' => json_encode($embedding), // pgvector input format
                ]);
            }
        }

        // 4. Update status dokumen selesai
        Document::where('id', $this->documentId)->update(['status' => 'completed']);
    }
}
