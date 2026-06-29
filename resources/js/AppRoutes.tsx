import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import ChatPage from './pages/ChatPage';
import KnowledgeBasePage from './pages/admin/KnowledgeBasePage';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import UserManagementPage from './pages/admin/UserManagementPage';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/chat" replace />} />

            <Route element={<DashboardLayout />}>
                {/* User Routes (General) */}
                <Route path="/chat" element={<ChatPage />} />

                {/* Admin Routes */}
                <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/users" element={<UserManagementPage />} />
            </Route>
        </Routes>
    );
}
