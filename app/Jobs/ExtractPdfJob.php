<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class ExtractPdfJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public int $documentId)
    {
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $document = \App\Models\Document::find($this->documentId);
        if (!$document) return;

        // 1. Ekstrak teks dari PDF (sesuaikan path jika tidak di storage)
        $text = (new \Spatie\PdfToText\Pdf())
            ->setPdf(storage_path('app/' . $document->file_path))
            ->text();

        // 2. Dispatch Job Chunking
        dispatch(new ChunkTextJob($this->documentId, $text));
    }
}
