<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SiswaController extends Controller
{
    public function initSession(Request $request)
    {
        return response()->json(['session_id' => 1]);
    }

    public function sendMessage(Request $request)
    {
        return response()->json(['reply' => 'AI Reply Placeholder']);
    }

    public function submitFeedback(Request $request)
    {
        return response()->json(['message' => 'Feedback submitted']);
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
}
