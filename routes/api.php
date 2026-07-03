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
    Route::prefix('admin')->group(function () {
        // Analytics
        Route::middleware('permission:read_analytics')->get('analytics', [AdminController::class, 'getAnalytics']);
        
        // Users
        Route::middleware('permission:read_users')->get('users', [AdminController::class, 'index']);
        Route::middleware('permission:create_users')->post('users', [AdminController::class, 'store']);
        Route::middleware('permission:read_users')->get('users/{user}', [AdminController::class, 'show']);
        Route::middleware('permission:update_users')->put('users/{user}', [AdminController::class, 'update']);
        Route::middleware('permission:delete_users')->delete('users/{user}', [AdminController::class, 'destroy']);

        // Roles
        Route::middleware('permission:read_roles')->get('permissions', [\App\Http\Controllers\Api\RoleController::class, 'getPermissions']);
        Route::middleware('permission:read_roles|read_users')->get('roles', [\App\Http\Controllers\Api\RoleController::class, 'index']);
        Route::middleware('permission:create_roles')->post('roles', [\App\Http\Controllers\Api\RoleController::class, 'store']);
        Route::middleware('permission:read_roles')->get('roles/{role}', [\App\Http\Controllers\Api\RoleController::class, 'show']);
        Route::middleware('permission:update_roles')->put('roles/{role}', [\App\Http\Controllers\Api\RoleController::class, 'update']);
        Route::middleware('permission:delete_roles')->delete('roles/{role}', [\App\Http\Controllers\Api\RoleController::class, 'destroy']);

        // Settings
        Route::middleware('permission:read_settings')->get('settings', [AdminController::class, 'getSettings']);
        Route::middleware('permission:update_settings')->post('settings', [AdminController::class, 'updateSettings']);
    });

    // User Routes (Guru & Siswa - role dan permission diatur dinamis)
    Route::prefix('user')->group(function () {
        // Fitur Chat & Context Upload (File attachment pada chat)
        Route::post('chat/session', [\App\Http\Controllers\Api\ChatController::class, 'initSession']);
        Route::post('chat/message', [\App\Http\Controllers\Api\ChatController::class, 'sendMessage']);
        Route::post('chat/feedback', [\App\Http\Controllers\Api\ChatController::class, 'submitFeedback']);
        Route::get('chat/sessions', [\App\Http\Controllers\Api\ChatController::class, 'getSessions']);
        Route::get('chat/sessions/{id}', [\App\Http\Controllers\Api\ChatController::class, 'getSessionMessages']);
    });
});
