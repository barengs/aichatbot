<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = ['title', 'file_path', 'status'];

    public function chunks()
    {
        return $this->hasMany(DocumentChunk::class);
    }
}
