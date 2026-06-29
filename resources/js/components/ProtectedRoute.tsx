import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface ProtectedRouteProps {
    allowedRoles?: string[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
    const { token, user } = useSelector((state: RootState) => state.auth);

    // 1. Not logged in -> Redirect to login
    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    // 2. Logged in, check roles if provided
    if (allowedRoles && allowedRoles.length > 0) {
        const hasRequiredRole = user.roles?.some(r => allowedRoles.includes(r.name));
        if (!hasRequiredRole) {
            // Unauthorised role, maybe redirect to chat (default home) or unauthorized page
            return <Navigate to="/chat" replace />;
        }
    }

    // 3. Authorized -> Render children
    return <Outlet />;
}
