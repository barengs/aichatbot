import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';
import api from '../../lib/axios';

export default function AuthCallback() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');

        if (token) {
            // Fetch user info
            api.get('/me', {
                headers: { Authorization: `Bearer ${token}` }
            }).then(meRes => {
                const user = meRes.data;
                dispatch(setCredentials({ user, token }));
                navigate('/chat');
            }).catch(err => {
                console.error("Failed to fetch user data after callback", err);
                navigate('/login?error=auth_failed');
            });
        } else {
            navigate('/login?error=missing_token');
        }
    }, [location, navigate, dispatch]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
            <div className="w-12 h-12 border-4 border-[#0F3B2C] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">Authenticating...</p>
        </div>
    );
}
