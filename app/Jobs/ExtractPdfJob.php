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
    public function __construct(public string $filePath)
    {
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // 1. Ekstrak teks dari PDF
        $text = (new \Spatie\PdfToText\Pdf())
            ->setPdf($this->filePath)
            ->text();

        // 2. Dispatch Job Chunking (belum dibuat)
        // dispatch(new ChunkTextJob($this->filePath, $text));
    }
}
