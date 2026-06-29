<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DocumentChunk extends Model
{
    protected $fillable = ['document_id', 'content', 'vector_id'];

    public function document()
    {
        return $this->belongsTo(Document::class);
    }
}
