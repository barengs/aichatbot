<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\ChatController;

// Auth Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [\App\Http\Controllers\Api\PasswordResetController::class, 'sendResetLinkEmail']);
Route::post('/reset-password', [\App\Http\Controllers\Api\PasswordResetController::class, 'reset']);
Route::get('/auth/google/redirect', [AuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback']);

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::put('/profile', [\App\Http\Controllers\Api\ProfileController::class, 'update']);

    // Admin Routes
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        Route::apiResource('users', AdminController::class);
        Route::get('settings', [AdminController::class, 'getSettings']);
        Route::post('settings', [AdminController::class, 'updateSettings']);
    });

    // User Routes (Guru & Siswa - role dan permission diatur dinamis)
    Route::prefix('user')->group(function () {
        // Fitur Chat & Context Upload (File attachment pada chat)
        Route::post('chat/session', [\App\Http\Controllers\Api\ChatController::class, 'initSession']);
        Route::post('chat/message', [\App\Http\Controllers\Api\ChatController::class, 'sendMessage']);
        Route::post('chat/feedback', [\App\Http\Controllers\Api\ChatController::class, 'submitFeedback']);
    });
});
