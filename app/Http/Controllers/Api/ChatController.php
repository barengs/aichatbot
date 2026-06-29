<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ChatSession;
use App\Models\Message;
use App\Models\SystemSetting;
use Prism\Prism\Prism;
use Prism\Prism\ValueObjects\Messages\UserMessage;
use Prism\Prism\ValueObjects\Messages\AssistantMessage;
use Prism\Prism\ValueObjects\Media\Image;

class ChatController extends Controller
{
    public function initSession(Request $request)
    {
        $session = ChatSession::create([
            'user_id' => $request->user()->id,
            'title' => 'Percakapan Baru'
        ]);

        return response()->json(['session_id' => $session->id]);
    }

    public function sendMessage(Request $request)
    {
        $request->validate([
            'session_id' => 'required|exists:chat_sessions,id',
            'message' => 'required|string',
            'file' => 'nullable|file|mimes:jpeg,png,jpg,txt|max:5120'
        ]);

        $session = ChatSession::findOrFail($request->session_id);
        
        // Save user message to DB
        $userMessage = Message::create([
            'chat_session_id' => $session->id,
            'role' => 'user',
            'content' => $request->message
        ]);

        // Get AI Config from DB
        $apiKey = SystemSetting::where('key', 'gemini_api_key')->value('value');
        if ($apiKey) {
            config(['prism.providers.gemini.api_key' => $apiKey]);
        }
        
        // Get chat history for memory
        $history = $session->messages()->orderBy('id', 'asc')->get()->map(function ($msg) {
            return $msg->role === 'user' 
                ? new UserMessage($msg->content) 
                : new AssistantMessage($msg->content);
        })->toArray();
        
        // Handle current message with possible attachment
        $additionalContent = [];
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $extension = strtolower($file->getClientOriginalExtension());
            if (in_array($extension, ['jpg', 'jpeg', 'png'])) {
                $additionalContent[] = Image::fromLocalPath($file->getRealPath());
            } elseif ($extension === 'txt') {
                $textContext = file_get_contents($file->getRealPath());
                $userMessage->content .= "\n\n[Context attached by user]:\n" . $textContext;
                $userMessage->save();
                
                // Update the last item in history
                array_pop($history); 
                $history[] = new UserMessage($userMessage->content);
            }
        }
        
        if (!empty($additionalContent)) {
            // Replace the last simple user message in history with one that has media
            array_pop($history);
            $history[] = new UserMessage($userMessage->content, $additionalContent);
        }

        try {
            $response = Prism::text()
                ->using('gemini', 'gemini-1.5-flash')
                ->withSystemPrompt('Anda adalah asisten ahli pertanian hijau. Berikan jawaban yang relevan dan solutif.')
                ->withMessages($history)
                ->generate();
            
            $replyText = $response->text;
        } catch (\Exception $e) {
            $replyText = "Maaf, terjadi kesalahan saat menghubungi AI: " . $e->getMessage();
        }

        // Save AI reply to DB
        Message::create([
            'chat_session_id' => $session->id,
            'role' => 'assistant',
            'content' => $replyText
        ]);

        // Auto rename session
        if ($session->messages()->count() <= 2 && $session->title === 'Percakapan Baru') {
            $session->title = substr($request->message, 0, 30) . '...';
            $session->save();
        }

        return response()->json(['reply' => $replyText]);
    }

    public function submitFeedback(Request $request)
    {
        return response()->json(['message' => 'Feedback submitted']);
    }
}
