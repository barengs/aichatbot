<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Document;
use App\Jobs\ExtractPdfJob;

class DocumentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'file' => 'required|mimes:pdf|max:10240', // max 10MB
        ]);

        // Simpan file ke storage (storage/app/documents)
        $path = $request->file('file')->store('documents');

        // Buat record di database
        $document = Document::create([
            'title' => $request->title,
            'file_path' => $path,
            'status' => 'pending',
        ]);

        // Proses PDF di latar belakang (Job)
        ExtractPdfJob::dispatch($document->id);

        return response()->json([
            'message' => 'Dokumen berhasil diunggah dan sedang diproses.',
            'document' => $document
        ], 201);
    }
}
