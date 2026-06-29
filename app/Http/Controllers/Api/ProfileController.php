<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'activity' => 'nullable|string|max:50',
            'bio' => 'nullable|string',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string'
        ]);

        $user = $request->user();
        
        $user->update(['name' => $request->name]);

        $user->profile()->updateOrCreate(
            ['user_id' => $user->id],
            $request->only(['activity', 'bio', 'phone', 'address'])
        );

        $user->load(['roles', 'profile']);

        return response()->json(['message' => 'Profile updated successfully', 'user' => $user]);
    }
}
