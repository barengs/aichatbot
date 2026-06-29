import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setCredentials } from '../../features/auth/authSlice';
import api from '../../lib/axios';

export default function ProfilePage() {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        activity: '',
        bio: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                activity: user.profile?.activity || '',
                bio: user.profile?.bio || '',
                phone: user.profile?.phone || '',
                address: user.profile?.address || ''
            });
        }
    }, [user]);

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await api.put('/profile', formData);
            // Update auth state with new user object
            dispatch(setCredentials({
                user: res.data.user,
                token: localStorage.getItem('token') || ''
            }));
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update profile", error);
            alert("Gagal memperbarui profil");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Profil Pengguna</h1>
                {!isEditing ? (
                    <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-[#0F3B2C] text-white rounded-lg text-sm font-medium hover:bg-[#154E3A]">
                        Edit Profil
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300">
                            Batal
                        </button>
                        <button onClick={handleSave} disabled={loading} className="px-4 py-2 bg-[#0F3B2C] text-white rounded-lg text-sm font-medium hover:bg-[#154E3A] disabled:opacity-50">
                            {loading ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-xl">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md border border-gray-200">{user?.email}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Nama</label>
                        {isEditing ? (
                            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0F3B2C]" />
                        ) : (
                            <p className="text-gray-900 px-3 py-2">{user?.name || '-'}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Aktivitas (Guru/Siswa)</label>
                        {isEditing ? (
                            <input type="text" placeholder="Guru / Siswa" value={formData.activity} onChange={e => setFormData({...formData, activity: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0F3B2C]" />
                        ) : (
                            <p className="text-gray-900 px-3 py-2">{user?.profile?.activity || '-'}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Telepon</label>
                        {isEditing ? (
                            <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0F3B2C]" />
                        ) : (
                            <p className="text-gray-900 px-3 py-2">{user?.profile?.phone || '-'}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Alamat</label>
                        {isEditing ? (
                            <textarea value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0F3B2C]" rows={3} />
                        ) : (
                            <p className="text-gray-900 px-3 py-2">{user?.profile?.address || '-'}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Bio</label>
                        {isEditing ? (
                            <textarea value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0F3B2C]" rows={3} />
                        ) : (
                            <p className="text-gray-900 px-3 py-2">{user?.profile?.bio || '-'}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Peran (Role Sistem)</label>
                        <div className="mt-1 flex flex-wrap gap-2 px-3 py-2">
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
