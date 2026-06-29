import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { MessageSquare, LayoutDashboard, Database, Users, Settings, LogOut, Bell, Menu, History, UserCircle, LogIn } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../features/auth/authSlice';
import api from '../lib/axios';

export default function DashboardLayout() {
    const user = useSelector((state: RootState) => state.auth.user);
    const hasRole = (roleName: string) => user?.roles?.some(r => r.name === roleName) ?? false;
    const [isCollapsed, setIsCollapsed] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Chat is public
    const canAccessChat = true;
    const isAdmin = hasRole('admin');

    const handleLogout = async () => {
        try {
            await api.post('/logout');
        } catch (e) {
            // Ignore if it fails on server
        }
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-[#F8FAFC]">
            {/* Sidebar */}
            <aside className={`bg-[#F8FAFC] border-r border-gray-200 flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
                <div className={`p-6 flex flex-col ${isCollapsed ? 'items-center px-2' : ''}`}>
                    <h1 className={`text-xl font-bold text-gray-900 flex items-center ${isCollapsed ? 'justify-center' : 'gap-2'}`}>
                        <div className="w-8 h-8 bg-[#0F3B2C] rounded-md flex items-center justify-center text-white shrink-0">
                            <span className="text-sm font-bold">TA</span>
                        </div>
                        {!isCollapsed && <span>Tanya AI</span>}
                    </h1>
                </div>

                <nav className="flex-1 px-3 py-4 space-y-2">
                    {canAccessChat && (
                        <>
                            <NavLink
                                to="/chat"
                                className={({ isActive }) => `flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-[#D1F4E0] text-[#0F3B2C]' : 'text-gray-600 hover:bg-gray-100'}`}
                                title="Chat"
                            >
                                <MessageSquare size={18} />
                                {!isCollapsed && <span>Chat</span>}
                            </NavLink>
                            {user && (
                                <>
                                    <NavLink
                                        to="/history"
                                        className={({ isActive }) => `flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-[#D1F4E0] text-[#0F3B2C]' : 'text-gray-600 hover:bg-gray-100'}`}
                                        title="Riwayat Chat"
                                    >
                                        <History size={18} />
                                        {!isCollapsed && <span>Riwayat Chat</span>}
                                    </NavLink>
                                    <NavLink
                                        to="/profile"
                                        className={({ isActive }) => `flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-[#D1F4E0] text-[#0F3B2C]' : 'text-gray-600 hover:bg-gray-100'}`}
                                        title="Profil"
                                    >
                                        <UserCircle size={18} />
                                        {!isCollapsed && <span>Profil</span>}
                                    </NavLink>
                                </>
                            )}
                        </>
                    )}

                    {isAdmin && (
                        <>
                            <NavLink
                                to="/analytics"
                                className={({ isActive }) => `flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-[#D1F4E0] text-[#0F3B2C]' : 'text-gray-600 hover:bg-gray-100'}`}
                                title="Dashboard"
                            >
                                <LayoutDashboard size={18} />
                                {!isCollapsed && <span>Dashboard</span>}
                            </NavLink>
                            <NavLink
                                to="/users"
                                className={({ isActive }) => `flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-[#D1F4E0] text-[#0F3B2C]' : 'text-gray-600 hover:bg-gray-100'}`}
                                title="User Management"
                            >
                                <Users size={18} />
                                {!isCollapsed && <span>User Management</span>}
                            </NavLink>
                        </>
                    )}
                </nav>

                <div className="p-4 border-t border-gray-200 space-y-2">
                    {user ? (
                        <>
                            <button className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2 w-full ${isCollapsed ? '' : 'text-left'} rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100`} title="Pengaturan">
                                <Settings size={18} />
                                {!isCollapsed && <span>Pengaturan</span>}
                            </button>
                            <button onClick={handleLogout} className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2 w-full ${isCollapsed ? '' : 'text-left'} rounded-md text-sm font-medium text-red-600 hover:bg-red-50`} title="Keluar">
                                <LogOut size={18} />
                                {!isCollapsed && <span>Keluar</span>}
                            </button>
                        </>
                    ) : (
                        <button onClick={() => navigate('/login')} className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2 w-full ${isCollapsed ? '' : 'text-left'} rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100`} title="Masuk">
                            <LogIn size={18} />
                            {!isCollapsed && <span>Masuk</span>}
                        </button>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col bg-white overflow-hidden">
                {/* Global Header (Optional, some pages have custom headers) */}
                <header className="h-16 border-b border-gray-200 flex items-center justify-between px-6">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-gray-500 hover:text-gray-700">
                            <Menu size={20} />
                        </button>
                        <h2 className="text-xl font-bold text-gray-900">
                            {/* Dynamic Title can go here, handled by sub-pages typically */}
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="text-gray-500 hover:text-gray-700">
                            <Bell size={20} />
                        </button>
                        {user && (
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-[#D1F4E0] flex items-center justify-center overflow-hidden">
                                    <span className="text-sm font-bold text-[#0F3B2C]">
                                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                    </span>
                                </div>
                                <span className="px-3 py-1 bg-[#D1F4E0] text-[#0F3B2C] rounded-full text-xs font-semibold">
                                    {user?.roles?.length ? user.roles.map(r => r.name.charAt(0).toUpperCase() + r.name.slice(1)).join(', ') : 'User'}
                                </span>
                            </div>
                        )}
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
