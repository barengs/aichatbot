import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function ProfilePage() {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Profil Pengguna</h1>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-xl">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-500">Nama</label>
                        <p className="mt-1 text-lg font-semibold text-gray-900">{user?.name || 'User'}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-500">Email</label>
                        <p className="mt-1 text-gray-900">{user?.email}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-500">Peran (Role)</label>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {user?.roles?.map(r => (
                                <span key={r.name} className="px-3 py-1 bg-[#D1F4E0] text-[#0F3B2C] rounded-full text-xs font-semibold">
                                    {r.name.charAt(0).toUpperCase() + r.name.slice(1)}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
