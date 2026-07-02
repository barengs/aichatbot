<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\SystemSetting;
use App\Models\ChatSession;
use App\Models\Message;
use App\Models\MessageFeedback;
use App\Models\User;
use Carbon\Carbon;

class AdminController extends Controller
{
    public function getSettings()
    {
        $settings = SystemSetting::pluck('value', 'key')->toArray();
        return response()->json(['settings' => $settings]);
    }

    public function updateSettings(Request $request)
    {
        $data = $request->validate([
            'settings' => 'required|array',
            'settings.*' => 'nullable|string',
        ]);

        foreach ($data['settings'] as $key => $value) {
            SystemSetting::updateOrCreate(
                ['key' => $key],
                ['value' => $value ?? '']
            );
        }

        return response()->json(['message' => 'Settings updated']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function getAnalytics()
    {
        // 1. Total Chats Today
        $totalChatsToday = Message::where('role', 'user')->whereDate('created_at', Carbon::today())->count();

        // 2. Weekly Chart Data (Last 7 Days)
        $chartData = collect(range(6, 0))->map(function ($daysAgo) {
            $date = Carbon::today()->subDays($daysAgo);
            $dayName = $date->locale('id')->shortDayName;
            
            $berhasil = Message::where('role', 'user')->whereDate('created_at', $date)->count();
            
            return [
                'name' => ucfirst($dayName),
                'berhasil' => $berhasil,
                'divalidasi' => rand(0, 5) // Mocked for now
            ];
        })->values();

        // 3. Recent Chats for Table
        $recentChats = ChatSession::with(['user', 'user.profile'])
            ->orderBy('updated_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($session) {
                $lastMsg = $session->messages()->orderBy('id', 'desc')->first();
                $user = $session->user;
                $initials = collect(explode(' ', $user->name))->map(fn($n) => substr($n, 0, 1))->take(2)->join('');
                
                return [
                    'id' => $session->id,
                    'user_name' => $user->name,
                    'user_school' => $user->profile->address ?? 'SMK Pertanian',
                    'user_initials' => strtoupper($initials),
                    'last_message' => $lastMsg ? $lastMsg->content : '...',
                    'status' => 'Selesai',
                ];
            });

        // 4. Alerts
        $alerts = MessageFeedback::where('is_positive', false)
            ->with(['message.chatSession.user'])
            ->orderBy('created_at', 'desc')
            ->take(3)
            ->get()
            ->map(function ($feedback) {
                $userName = $feedback->message->chatSession->user->name ?? 'Siswa';
                return [
                    'id' => $feedback->id,
                    'type' => 'negative',
                    'title' => 'Feedback Thumbs Down',
                    'description' => "Jawaban AI mendapat feedback negatif dari {$userName}: \"{$feedback->comment}\"",
                ];
            });

        // 5. Token Usage
        $totalTokensToday = Message::whereDate('created_at', Carbon::today())
            ->sum(\Illuminate\Support\Facades\DB::raw('IFNULL(prompt_tokens, 0) + IFNULL(completion_tokens, 0)'));
        
        $totalTokensAllTime = Message::sum(\Illuminate\Support\Facades\DB::raw('IFNULL(prompt_tokens, 0) + IFNULL(completion_tokens, 0)'));

        return response()->json([
            'totalChatsToday' => $totalChatsToday,
            'chartData' => $chartData,
            'recentChats' => $recentChats,
            'alerts' => $alerts,
            'totalTokensToday' => $totalTokensToday,
            'totalTokensAllTime' => $totalTokensAllTime,
        ]);
    }
}
