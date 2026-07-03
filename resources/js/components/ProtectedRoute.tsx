import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface ProtectedRouteProps {
    allowedRoles?: string[];
    allowedPermissions?: string[];
}

export default function ProtectedRoute({ allowedRoles, allowedPermissions }: ProtectedRouteProps) {
    const { token, user } = useSelector((state: RootState) => state.auth);

    // 1. Not logged in -> Redirect to login
    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    // 2. Logged in, check roles if provided
    if (allowedRoles && allowedRoles.length > 0) {
        const hasRequiredRole = user.roles?.some((r: any) => allowedRoles.includes(r.name));
        if (!hasRequiredRole) {
            return <Navigate to="/chat" replace />;
        }
    }

    // 3. Logged in, check permissions if provided
    if (allowedPermissions && allowedPermissions.length > 0) {
        const hasRequiredPermission = allowedPermissions.some(p => user.all_permissions?.includes(p));
        if (!hasRequiredPermission) {
            return <Navigate to="/chat" replace />;
        }
    }

    // 3. Authorized -> Render children
    return <Outlet />;
}
