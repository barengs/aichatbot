<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'chat_session_id',
        'role',
        'content',
        'prompt_tokens',
        'completion_tokens'
    ];

    public function chatSession()
    {
        return $this->belongsTo(ChatSession::class);
    }

    public function feedback()
    {
        return $this->hasOne(MessageFeedback::class);
    }
}
