import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { MessageSquare, LayoutDashboard, Database, Users, Settings, LogOut, Bell } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function DashboardLayout() {
    const user = useSelector((state: RootState) => state.auth.user);
    const hasRole = (roleName: string) => user?.roles?.some(r => r.name === roleName) ?? false;
    
    // Check if user is at least a siswa, guru, or admin to show Chat
    const canAccessChat = hasRole('siswa') || hasRole('guru') || hasRole('admin');
    const isAdmin = hasRole('admin');
    return (
        <div className="flex h-screen bg-[#F8FAFC]">
            {/* Sidebar */}
            <aside className="w-64 bg-[#F8FAFC] border-r border-gray-200 flex flex-col">
                <div className="p-6">
                    <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#0F3B2C] rounded-md flex items-center justify-center text-white">
                            <span className="text-sm font-bold">TC</span>
                        </div>
                        TaniCerdas
                    </h1>
                    <p className="text-xs text-gray-500 mt-1">AI Stewardship</p>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-1">
                    {canAccessChat && (
                        <NavLink 
                            to="/chat" 
                            className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-[#D1F4E0] text-[#0F3B2C]' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            <MessageSquare size={18} /> Chat
                        </NavLink>
                    )}
                    
                    {isAdmin && (
                        <>
                            <NavLink 
                                to="/analytics" 
                                className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-[#D1F4E0] text-[#0F3B2C]' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                <LayoutDashboard size={18} /> Dashboard
                            </NavLink>
                            <NavLink 
                                to="/knowledge-base" 
                                className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-[#D1F4E0] text-[#0F3B2C]' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                <Database size={18} /> Knowledge Base
                            </NavLink>
                            <NavLink 
                                to="/users" 
                                className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-[#D1F4E0] text-[#0F3B2C]' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                <Users size={18} /> User Management
                            </NavLink>
                        </>
                    )}
                </nav>

                <div className="p-4 border-t border-gray-200 space-y-1">
                    <button className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">
                        <Settings size={18} /> Pengaturan
                    </button>
                    <button className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md text-sm font-medium text-red-600 hover:bg-red-50">
                        <LogOut size={18} /> Keluar
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col bg-white overflow-hidden">
                {/* Global Header (Optional, some pages have custom headers) */}
                <header className="h-16 border-b border-gray-200 flex items-center justify-between px-6">
                    <h2 className="text-xl font-bold text-gray-900">
                        {/* Dynamic Title can go here, handled by sub-pages typically */}
                    </h2>
                    <div className="flex items-center gap-4">
                        <button className="text-gray-500 hover:text-gray-700">
                            <Bell size={20} />
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                                <img src="https://i.pravatar.cc/150?img=11" alt="User" />
                            </div>
                            <span className="px-3 py-1 bg-[#D1F4E0] text-[#0F3B2C] rounded-full text-xs font-semibold">
                                {user?.roles?.length ? user.roles.map(r => r.name.charAt(0).toUpperCase() + r.name.slice(1)).join(', ') : 'User'}
                            </span>
                        </div>
                    </div>
                </header>
                
                <div className="flex-1 overflow-y-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
