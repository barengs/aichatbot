import React, { useState, useEffect } from 'react';
import { Search, ShieldPlus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import api from '../../lib/axios';

const MENUS = [
    { id: 'analytics', label: 'Analytics Dashboard' },
    { id: 'users', label: 'User Management' },
    { id: 'roles', label: 'Role Management' },
    { id: 'settings', label: 'AI Settings' },
];

const ACTIONS = ['create', 'read', 'update', 'delete'];

export default function RoleManagementPage() {
    const [roles, setRoles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingRole, setEditingRole] = useState<any>(null);
    const [formData, setFormData] = useState<{name: string, permissions: string[]}>({ name: '', permissions: [] });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const res = await api.get('/admin/roles');
            setRoles(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingRole) {
                await api.put(`/admin/roles/${editingRole.id}`, formData);
            } else {
                await api.post('/admin/roles', formData);
            }
            setModalOpen(false);
            setEditingRole(null);
            setFormData({ name: '', permissions: [] });
            fetchRoles();
        } catch (err: any) {
            alert(err.response?.data?.message || 'Failed to save role');
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (name === 'admin') return;
        if (!confirm('Are you sure you want to delete this role?')) return;
        try {
            await api.delete(`/admin/roles/${id}`);
            fetchRoles();
        } catch (err: any) {
            alert(err.response?.data?.message || 'Failed to delete role');
        }
    };

    const openEditModal = (role: any) => {
        setEditingRole(role);
        setFormData({ name: role.name, permissions: role.permissions?.map((p:any) => p.name) || [] });
        setModalOpen(true);
    };

    const openAddModal = () => {
        setEditingRole(null);
        setFormData({ name: '', permissions: [] });
        setModalOpen(true);
    };

    const togglePermission = (permName: string) => {
        setFormData(prev => {
            const hasPerm = prev.permissions.includes(permName);
            if (hasPerm) {
                return { ...prev, permissions: prev.permissions.filter(p => p !== permName) };
            } else {
                return { ...prev, permissions: [...prev.permissions, permName] };
            }
        });
    };

    const totalPages = Math.ceil(roles.length / itemsPerPage);
    const paginatedRoles = roles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="flex flex-col h-full bg-[#F8FAFC]">
            <div className="p-8 pb-4">
                <div className="mb-2">
                    <p className="text-xs text-gray-500 font-medium mb-1">Admin / <span className="text-gray-900 font-bold">Role Management</span></p>
                    <h1 className="text-3xl font-bold text-[#0F3B2C]">Roles & Permissions</h1>
                    <p className="text-sm text-gray-500 mt-1">Configure staff roles and their CRUD access levels.</p>
                </div>
            </div>
            
            <div className="flex-1 px-8 pb-8 flex flex-col h-full overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <div className="relative w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <Input className="pl-10 rounded-md bg-white border-gray-200 focus-visible:ring-[#0F3B2C] shadow-sm" placeholder="Search roles..." />
                    </div>
                    <Button onClick={openAddModal} className="bg-[#0F3B2C] hover:bg-[#154E3A] rounded-md px-6 flex items-center gap-2">
                        <ShieldPlus size={16} /> Add New Role
                    </Button>
                </div>

                <div className="bg-white border border-gray-200 shadow-sm overflow-hidden mb-4">
                    <Table>
                        <TableHeader className="bg-gray-50">
                            <TableRow>
                                <TableHead className="font-semibold text-gray-600">Role Name</TableHead>
                                <TableHead className="font-semibold text-gray-600">Permissions Count</TableHead>
                                <TableHead className="font-semibold text-gray-600 text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center py-8 text-gray-500">Loading roles...</TableCell>
                                </TableRow>
                            ) : paginatedRoles.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center py-8 text-gray-500">No roles found.</TableCell>
                                </TableRow>
                            ) : (
                                paginatedRoles.map(role => (
                                    <TableRow key={role.id} className="group">
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-3">
                                                <span className="text-gray-900 font-bold uppercase">{role.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-gray-600">
                                            <Badge className="bg-[#D1F4E0] text-[#0F3B2C] hover:bg-[#D1F4E0] shadow-none">
                                                {role.permissions?.length || 0} Permissions
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center space-x-1">
                                            <Button onClick={() => openEditModal(role)} variant="ghost" size="icon" className="text-gray-400 hover:text-gray-700 h-8 w-8" title="Detail & Edit"><Edit2 size={16} /></Button>
                                            {role.name !== 'admin' ? (
                                                <Button onClick={() => handleDelete(role.id, role.name)} variant="ghost" size="icon" className="text-gray-400 hover:text-red-600 h-8 w-8" title="Hapus"><Trash2 size={16} /></Button>
                                            ) : (
                                                <span className="text-xs text-gray-400 italic px-2">Protected</span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
                
                {!loading && roles.length > 0 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, roles.length)} of {roles.length} roles</p>
                        <div className="flex items-center gap-2">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </Button>
                            <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="font-bold text-gray-900">{editingRole ? 'Edit Role' : 'Add New Role'}</h3>
                            <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Role Name (e.g. editor, author)</label>
                                <Input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value.toLowerCase()})} placeholder="role_name" disabled={!!editingRole} />
                            </div>
                            
                            <div className="mt-2">
                                <label className="block text-xs font-medium text-gray-700 mb-2">CRUD Permissions Matrix</label>
                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-gray-50 border-b border-gray-200">
                                            <tr>
                                                <th className="px-4 py-2 font-semibold text-gray-600">Menu</th>
                                                {ACTIONS.map(a => (
                                                    <th key={a} className="px-4 py-2 text-center font-semibold text-gray-600 capitalize">{a}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {MENUS.map(menu => (
                                                <tr key={menu.id} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-4 py-3 font-medium text-gray-700">{menu.label}</td>
                                                    {ACTIONS.map(action => {
                                                        const permName = `${action}_${menu.id}`;
                                                        const isActive = formData.permissions.includes(permName);
                                                        return (
                                                            <td key={action} className="px-4 py-3 text-center">
                                                                <input 
                                                                    type="checkbox" 
                                                                    className="w-4 h-4 text-[#0F3B2C] border-gray-300 rounded focus:ring-[#0F3B2C] cursor-pointer"
                                                                    checked={isActive}
                                                                    onChange={() => togglePermission(permName)}
                                                                />
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                            <div className="flex justify-end gap-3 mt-4">
                                <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>Batal</Button>
                                <Button type="submit" className="bg-[#0F3B2C] hover:bg-[#154E3A]">Simpan Role</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
