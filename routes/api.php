<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\GuruController;
use App\Http\Controllers\Api\SiswaController;

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

    // Admin Routes
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        Route::apiResource('users', AdminController::class);
        Route::get('settings', [AdminController::class, 'getSettings']);
        Route::post('settings', [AdminController::class, 'updateSettings']);
    });

    // Guru Routes
    Route::middleware('role:guru')->prefix('guru')->group(function () {
        Route::post('documents/upload', [GuruController::class, 'uploadDocument']);
        Route::get('documents', [GuruController::class, 'listDocuments']);
        Route::get('analytics', [GuruController::class, 'getAnalytics']);
    });

    // Siswa Routes
    Route::middleware('role:siswa')->prefix('siswa')->group(function () {
        Route::post('chat/session', [SiswaController::class, 'initSession']);
        Route::post('chat/message', [SiswaController::class, 'sendMessage']);
        Route::post('chat/feedback', [SiswaController::class, 'submitFeedback']);
    });
});
