import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { MessageSquare, LayoutDashboard, Database, Users, Settings, LogOut, Bell, Menu, History, UserCircle, LogIn, Shield, Moon, Sun } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../features/auth/authSlice';
import api from '../lib/axios';
import { toast } from 'react-toastify';

export default function DashboardLayout() {
    const user = useSelector((state: RootState) => state.auth.user);
    const hasRole = (roleName: string) => user?.roles?.some(r => r.name === roleName) ?? false;
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Chat is public
    const canAccessChat = true;
    
    const hasPermission = (perm: string) => user?.all_permissions?.includes(perm) ?? false;
    
    // Derived permissions
    const canViewAnalytics = hasPermission('read_analytics');
    const canManageUsers = hasPermission('read_users');
    const canManageRoles = hasPermission('read_roles');
    const canManageSettings = hasPermission('read_settings');
    
    const isAdminAreaVisible = canViewAnalytics || canManageUsers || canManageRoles || canManageSettings;

    const handleLogout = async () => {
        try {
            const res = await api.post('/logout');
            toast.success(res.data?.message || 'Berhasil keluar');
        } catch (e: any) {
            toast.error(e.response?.data?.message || 'Sesi sudah berakhir');
        }
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-[#F8FAFC] dark:bg-gray-900">
            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-30 md:hidden" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                />
            )}
            
            {/* Sidebar */}
            <aside className={`bg-[#F8FAFC] dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-sm flex flex-col transition-all duration-300 fixed md:relative z-40 inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 ${isCollapsed ? 'md:w-20 w-64' : 'w-64'}`}>
                <div className={`p-6 flex flex-col ${isCollapsed ? 'items-center px-2' : ''}`}>
                    <h1 className={`text-xl font-bold text-gray-900 dark:text-white flex items-center ${isCollapsed ? 'justify-center' : 'gap-2'}`}>
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
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) => `flex items-center ${isCollapsed ? 'md:justify-center justify-start' : 'gap-3'} px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-[#D1F4E0] text-[#0F3B2C] dark:bg-[#0c2f23] dark:text-[#A3E5C2]' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                title="Chat"
                            >
                                <MessageSquare size={18} className="shrink-0" />
                                <span className={isCollapsed ? 'md:hidden block ml-3' : ''}>Chat</span>
                            </NavLink>
                            {user && (
                                <>
                                    <NavLink
                                        to="/history"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={({ isActive }) => `flex items-center ${isCollapsed ? 'md:justify-center justify-start' : 'gap-3'} px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-[#D1F4E0] text-[#0F3B2C] dark:bg-[#0c2f23] dark:text-[#A3E5C2]' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                        title="Riwayat Chat"
                                    >
                                        <History size={18} className="shrink-0" />
                                        <span className={isCollapsed ? 'md:hidden block ml-3' : ''}>Riwayat Chat</span>
                                    </NavLink>
                                    <NavLink
                                        to="/profile"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={({ isActive }) => `flex items-center ${isCollapsed ? 'md:justify-center justify-start' : 'gap-3'} px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-[#D1F4E0] text-[#0F3B2C] dark:bg-[#0c2f23] dark:text-[#A3E5C2]' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                        title="Profil"
                                    >
                                        <UserCircle size={18} className="shrink-0" />
                                        <span className={isCollapsed ? 'md:hidden block ml-3' : ''}>Profil</span>
                                    </NavLink>
                                </>
                            )}
                        </>
                    )}

                    {isAdminAreaVisible && (
                        <>
                            <div className="pt-4 pb-2">
                                <p className={`px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider ${isCollapsed ? 'hidden' : ''}`}>Admin</p>
                            </div>
                            
                            {canViewAnalytics && (
                                <NavLink
                                    to="/analytics"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) => `flex items-center ${isCollapsed ? 'md:justify-center justify-start' : 'gap-3'} px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-[#D1F4E0] text-[#0F3B2C] dark:bg-[#0c2f23] dark:text-[#A3E5C2]' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                    title="Dashboard"
                                >
                                    <LayoutDashboard size={18} className="shrink-0" />
                                    <span className={isCollapsed ? 'md:hidden block ml-3' : ''}>Dashboard</span>
                                </NavLink>
                            )}
                            
                            {canManageUsers && (
                                <NavLink
                                    to="/users"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) => `flex items-center ${isCollapsed ? 'md:justify-center justify-start' : 'gap-3'} px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-[#D1F4E0] text-[#0F3B2C] dark:bg-[#0c2f23] dark:text-[#A3E5C2]' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                    title="User Management"
                                >
                                    <Users size={18} className="shrink-0" />
                                    <span className={isCollapsed ? 'md:hidden block ml-3' : ''}>User Management</span>
                                </NavLink>
                            )}

                            {canManageRoles && (
                                <NavLink
                                    to="/roles"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) => `flex items-center ${isCollapsed ? 'md:justify-center justify-start' : 'gap-3'} px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-[#D1F4E0] text-[#0F3B2C] dark:bg-[#0c2f23] dark:text-[#A3E5C2]' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                    title="Role Management"
                                >
                                    <Shield size={18} className="shrink-0" />
                                    <span className={isCollapsed ? 'md:hidden block ml-3' : ''}>Role Management</span>
                                </NavLink>
                            )}
                            
                            {canManageSettings && (
                                <NavLink
                                    to="/ai-settings"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) => `flex items-center ${isCollapsed ? 'md:justify-center justify-start' : 'gap-3'} px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-[#D1F4E0] text-[#0F3B2C] dark:bg-[#0c2f23] dark:text-[#A3E5C2]' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                    title="AI Settings"
                                >
                                    <Database size={18} className="shrink-0" />
                                    <span className={isCollapsed ? 'md:hidden block ml-3' : ''}>AI Settings</span>
                                </NavLink>
                            )}
                        </>
                    )}
                </nav>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                    {user ? (
                        <>
                            <NavLink to="/settings" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `flex items-center ${isCollapsed ? 'md:justify-center justify-start' : 'gap-3'} px-3 py-2 w-full text-left rounded-md text-sm font-medium ${isActive ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`} title="Pengaturan">
                                <Settings size={18} className="shrink-0" />
                                <span className={isCollapsed ? 'md:hidden block ml-3' : ''}>Pengaturan</span>
                            </NavLink>
                            <button onClick={handleLogout} className={`flex items-center ${isCollapsed ? 'md:justify-center justify-start' : 'gap-3'} px-3 py-2 w-full text-left rounded-md text-sm font-medium text-red-600 hover:bg-red-50`} title="Keluar">
                                <LogOut size={18} className="shrink-0" />
                                <span className={isCollapsed ? 'md:hidden block ml-3' : ''}>Keluar</span>
                            </button>
                        </>
                    ) : (
                        <button onClick={() => navigate('/login')} className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2 w-full ${isCollapsed ? '' : 'text-left'} rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700`} title="Masuk">
                            <LogIn size={18} />
                            {!isCollapsed && <span>Masuk</span>}
                        </button>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col bg-white dark:bg-gray-800 overflow-hidden">
                {/* Global Header */}
                <header className="h-16 border-b border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between px-6 shrink-0">
                    <div className="flex items-center gap-4">
                        {/* Mobile Toggle */}
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 md:hidden block">
                            <Menu size={20} />
                        </button>
                        {/* Desktop Toggle */}
                        <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 hidden md:block">
                            <Menu size={20} />
                        </button>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            {/* Dynamic Title can go here, handled by sub-pages typically */}
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsDark(!isDark)} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                            <Bell size={20} />
                        </button>
                        {user && (
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-[#D1F4E0] flex items-center justify-center overflow-hidden">
                                    <span className="text-sm font-bold text-[#0F3B2C]">
                                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                    </span>
                                </div>
                                <span className="px-3 py-1 bg-[#D1F4E0] text-[#0F3B2C] dark:bg-[#0c2f23] dark:text-[#A3E5C2] rounded-full text-xs font-semibold">
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
