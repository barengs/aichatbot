import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import ChatPage from './pages/ChatPage';
import ChatHistoryPage from './pages/user/ChatHistoryPage';
import ProfilePage from './pages/user/ProfilePage';
import SettingsPage from './pages/user/SettingsPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import UserManagementPage from './pages/admin/UserManagementPage';
import RoleManagementPage from './pages/admin/RoleManagementPage';
import AISettingsPage from './pages/admin/AISettingsPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import AuthCallback from './pages/auth/AuthCallback';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            
            <Route element={<DashboardLayout />}>
                <Route path="/" element={<Navigate to="/chat" replace />} />
                <Route path="/chat" element={<ChatPage />} />
                
                {/* Protected User Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/history" element={<ChatHistoryPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Route>

                {/* Admin Routes */}
                <Route element={<ProtectedRoute allowedPermissions={['read_analytics']} />}>
                    <Route path="/analytics" element={<AnalyticsPage />} />
                </Route>
                <Route element={<ProtectedRoute allowedPermissions={['read_users']} />}>
                    <Route path="/users" element={<UserManagementPage />} />
                </Route>
                <Route element={<ProtectedRoute allowedPermissions={['read_roles']} />}>
                    <Route path="/roles" element={<RoleManagementPage />} />
                </Route>
                <Route element={<ProtectedRoute allowedPermissions={['read_settings']} />}>
                    <Route path="/ai-settings" element={<AISettingsPage />} />
                </Route>
            </Route>
        </Routes>
    );
}
