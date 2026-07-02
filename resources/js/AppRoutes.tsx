import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import ChatPage from './pages/ChatPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import UserManagementPage from './pages/admin/UserManagementPage';
import AISettingsPage from './pages/admin/AISettingsPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import AuthCallback from './pages/auth/AuthCallback';
import ProtectedRoute from './components/ProtectedRoute';
import ChatHistoryPage from './pages/user/ChatHistoryPage';
import ProfilePage from './pages/user/ProfilePage';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/chat" replace />} />
            
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/password-reset/:token" element={<ResetPasswordPage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />

            <Route element={<DashboardLayout />}>
                {/* Public General Routes */}
                <Route path="/chat" element={<ChatPage />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    {/* Protected User Routes */}
                    <Route path="/history" element={<ChatHistoryPage />} />
                    <Route path="/profile" element={<ProfilePage />} />

                    {/* Admin Routes */}
                    <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                        <Route path="/analytics" element={<AnalyticsPage />} />
                        <Route path="/users" element={<UserManagementPage />} />
                        <Route path="/ai-settings" element={<AISettingsPage />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}
