<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MessageFeedback extends Model
{
    protected $table = 'message_feedback';
    protected $fillable = ['message_id', 'is_positive', 'comment'];

    public function message()
    {
        return $this->belongsTo(Message::class);
    }
}
