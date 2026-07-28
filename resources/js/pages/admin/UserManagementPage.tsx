import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Edit2, Trash2, Shield } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import api from '../../lib/axios';

export default function UserManagementPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role_id: '' });
    const [roles, setRoles] = useState<any[]>([]);

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const res = await api.get('/admin/roles');
            setRoles(res.data.filter((r: any) => !['guru', 'siswa'].includes(r.name)));
        } catch (err) {
            console.error(err);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await api.get('/admin/users');
            setUsers(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingUser) {
                await api.put(`/admin/users/${editingUser.id}`, formData);
            } else {
                await api.post('/admin/users', formData);
            }
            setModalOpen(false);
            setEditingUser(null);
            setFormData({ name: '', email: '', password: '', role_id: '' });
            fetchUsers();
        } catch (err) {
            console.error(err);
            alert('Failed to save user');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this admin?')) return;
        try {
            await api.delete(`/admin/users/${id}`);
            fetchUsers();
        } catch (err: any) {
            if (err.response?.status === 403) {
                alert(err.response.data.message);
            } else {
                console.error(err);
            }
        }
    };

    const openEditModal = (user: any) => {
        setEditingUser(user);
        setFormData({ name: user.name, email: user.email, password: '', role_id: user.roles?.[0]?.id || '' });
        setModalOpen(true);
    };

    const openAddModal = () => {
        setEditingUser(null);
        setFormData({ name: '', email: '', password: '', role_id: '' });
        setModalOpen(true);
    };
    return (
        <div className="flex flex-col h-full bg-[#F8FAFC] dark:bg-gray-900">
            <div className="p-8 pb-4">
                <div className="mb-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">Admin / <span className="text-gray-900 dark:text-white font-bold">System Console</span></p>
                    <h1 className="text-3xl font-bold text-[#0F3B2C] dark:text-[#A3E5C2]">Management Center</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Configure users and AI model parameters for TaniCerdas SMK.</p>
                </div>
            </div>
            <div className="flex-1 p-8 m-0 flex flex-col h-full">
                <div className="flex justify-between items-center mb-6">
                    <div className="relative w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <Input className="pl-10 rounded-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus-visible:ring-[#0F3B2C] shadow-sm" placeholder="Search by name or email..." />
                    </div>
                    <Button onClick={openAddModal} className="bg-[#0F3B2C] text-white hover:bg-[#154E3A] rounded-md px-6 flex items-center gap-2">
                        <UserPlus size={16} /> Add New Admin
                    </Button>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-50 dark:bg-gray-900/50">
                            <TableRow>
                                <TableHead className="font-semibold text-gray-600 dark:text-gray-300">Name</TableHead>
                                <TableHead className="font-semibold text-gray-600 dark:text-gray-300">Email</TableHead>
                                <TableHead className="font-semibold text-gray-600 dark:text-gray-300">ID</TableHead>
                                <TableHead className="font-semibold text-gray-600 dark:text-gray-300">Role</TableHead>
                                <TableHead className="font-semibold text-gray-600 dark:text-gray-300 text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-gray-500 dark:text-gray-400">Loading admins...</TableCell>
                                </TableRow>
                            ) : users.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-gray-500 dark:text-gray-400">No admins found.</TableCell>
                                </TableRow>
                            ) : (
                                users.map(user => (
                                    <TableRow key={user.id} className="group">
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 dark:text-gray-300 flex items-center justify-center text-xs font-bold">
                                                    <Shield size={14} />
                                                </div>
                                                <span className="text-gray-900 dark:text-white font-medium">{user.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-gray-600 dark:text-gray-300">{user.email}</TableCell>
                                        <TableCell className="text-gray-600 dark:text-gray-300 font-mono text-sm">{user.id}</TableCell>
                                        <TableCell><Badge className="bg-gray-800 text-white hover:bg-gray-700 shadow-none capitalize">{user.roles?.[0]?.name || 'User'}</Badge></TableCell>
                                        <TableCell className="text-center space-x-1">
                                            <Button onClick={() => openEditModal(user)} variant="ghost" size="icon" className="text-gray-400 hover:text-gray-700 dark:text-gray-300 h-8 w-8"><Edit2 size={16} /></Button>
                                            <Button onClick={() => handleDelete(user.id)} variant="ghost" size="icon" className="text-gray-400 hover:text-red-600 h-8 w-8"><Trash2 size={16} /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>

                    <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>Total {users.length} admin(s)</span>
                    </div>
                </div>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                            <h3 className="font-bold text-gray-900 dark:text-white">{editingUser ? 'Edit Admin' : 'Add New Admin'}</h3>
                            <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:text-gray-300">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                                <Input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Admin Name" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                <Input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="admin@example.com" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                                <select required value={formData.role_id} onChange={(e) => setFormData({...formData, role_id: e.target.value})} className="w-full h-10 px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0F3B2C]/20 focus:border-[#0F3B2C] text-sm">
                                    <option value="" disabled>Select a role...</option>
                                    {roles.map(r => (
                                        <option key={r.id} value={r.id}>{r.name.replace('_', ' ').toUpperCase()}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Password {editingUser && '(Leave empty to keep current)'}</label>
                                <Input type="password" required={!editingUser} value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder="******" />
                            </div>
                            <div className="flex justify-end gap-3 mt-4">
                                <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
                                <Button type="submit" className="bg-[#0F3B2C] text-white hover:bg-[#154E3A]">Save Admin</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
