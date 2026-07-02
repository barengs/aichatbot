import React from 'react';
import { Search, UserPlus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

export default function UserManagementPage() {
    return (
        <div className="flex flex-col h-full bg-[#F8FAFC]">
            <div className="p-8 pb-4">
                <div className="mb-2">
                    <p className="text-xs text-gray-500 font-medium mb-1">Admin / <span className="text-gray-900 font-bold">System Console</span></p>
                    <h1 className="text-3xl font-bold text-[#0F3B2C]">Management Center</h1>
                    <p className="text-sm text-gray-500 mt-1">Configure users and AI model parameters for TaniCerdas SMK.</p>
                </div>
            </div>
            <div className="flex-1 p-8 m-0 flex flex-col h-full">
                <div className="flex justify-between items-center mb-6">
                    <div className="relative w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <Input className="pl-10 rounded-md bg-white border-gray-200 focus-visible:ring-[#0F3B2C] shadow-sm" placeholder="Search by name, NISN/NIP, or role..." />
                    </div>
                    <Button className="bg-[#0F3B2C] hover:bg-[#154E3A] rounded-md px-6 flex items-center gap-2">
                        <UserPlus size={16} /> Add New User
                    </Button>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-50">
                            <TableRow>
                                <TableHead className="font-semibold text-gray-600">Name</TableHead>
                                <TableHead className="font-semibold text-gray-600">Email</TableHead>
                                <TableHead className="font-semibold text-gray-600">NISN / NIP</TableHead>
                                <TableHead className="font-semibold text-gray-600">Role</TableHead>
                                <TableHead className="font-semibold text-gray-600 text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow className="group">
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#D1F4E0] text-[#0F3B2C] flex items-center justify-center text-xs font-bold">BP</div>
                                        <span className="text-gray-900 font-medium">Budi Pratama</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-gray-600">budi.smk@edu.id</TableCell>
                                <TableCell className="text-gray-600 font-mono text-sm">202100456</TableCell>
                                <TableCell><Badge className="bg-[#D1F4E0] text-[#0F3B2C] hover:bg-[#D1F4E0] shadow-none">Siswa</Badge></TableCell>
                                <TableCell className="text-center space-x-1">
                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-700 h-8 w-8"><Edit2 size={16} /></Button>
                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-600 h-8 w-8"><Trash2 size={16} /></Button>
                                </TableCell>
                            </TableRow>
                            <TableRow className="group">
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs font-bold">AS</div>
                                        <span className="text-gray-900 font-medium">Agus Salim, M.Pd</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-gray-600">agus.salim@smk.sch.id</TableCell>
                                <TableCell className="text-gray-600 font-mono text-sm">198205122010121001</TableCell>
                                <TableCell><Badge className="bg-[#0F3B2C] text-white hover:bg-[#154E3A] shadow-none">Guru</Badge></TableCell>
                                <TableCell className="text-center space-x-1">
                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-700 h-8 w-8"><Edit2 size={16} /></Button>
                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-600 h-8 w-8"><Trash2 size={16} /></Button>
                                </TableCell>
                            </TableRow>
                            <TableRow className="group">
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-bold">SA</div>
                                        <span className="text-gray-900 font-medium">Super Admin</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-gray-600">admin@tanicerdas.com</TableCell>
                                <TableCell className="text-gray-600 font-mono text-sm">ADMIN_001</TableCell>
                                <TableCell><Badge className="bg-gray-800 text-white hover:bg-gray-700 shadow-none">Admin</Badge></TableCell>
                                <TableCell className="text-center space-x-1">
                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-700 h-8 w-8"><Edit2 size={16} /></Button>
                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-600 h-8 w-8"><Trash2 size={16} /></Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <div className="p-4 border-t border-gray-200 bg-white flex items-center justify-between text-sm text-gray-500">
                        <span>Showing 1-3 of 42 users</span>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="w-8 h-8 p-0 border-gray-200">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            </Button>
                            <Button variant="outline" size="sm" className="w-8 h-8 p-0 border-gray-200">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
