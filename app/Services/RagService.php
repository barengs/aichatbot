<?php

namespace App\Services;

class RagService
{
    public function search(string $query, int $limit = 5): array
    {
        // TODO: Generate query embedding and search Pinecone
        return [];
    }

    public function generateResponse(string $query, array $context): string
    {
        // TODO: Call Prism with context and query
        return "";
    }
}
