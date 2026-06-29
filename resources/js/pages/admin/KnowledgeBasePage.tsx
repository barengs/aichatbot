import React from 'react';
import { UploadCloud, FileText, Search, MoreVertical, FilePlus, ChevronRight, ChevronLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

export default function KnowledgeBasePage() {
    return (
        <div className="p-8 bg-[#F8FAFC] min-h-full">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Manajemen Basis Pengetahuan</h1>
                <Button variant="outline" className="flex items-center gap-2">
                    <FilePlus size={16} /> Tambah Artikel Manual
                </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
                {/* Upload Card */}
                <Card className="col-span-2 shadow-sm border-gray-200">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-bold">Unggah Dokumen Baru</CardTitle>
                        <Badge variant="secondary" className="bg-[#D1F4E0] text-[#0F3B2C] hover:bg-[#D1F4E0]">AI Vectorizer Ready</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100 transition-colors">
                            <div className="w-12 h-12 bg-[#D1F4E0] text-[#0F3B2C] rounded-full flex items-center justify-center mb-4">
                                <UploadCloud size={24} />
                            </div>
                            <p className="font-medium text-gray-700">Drag and drop documents here</p>
                            <p className="text-sm text-gray-500 mt-1">Supports PDF, DOCX (Max 25MB)</p>
                        </div>

                        {/* Processing Status */}
                        <div className="mt-6">
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-sm text-gray-700"><span className="font-semibold">Memproses:</span> Panduan_Pupuk_Organik.pdf</p>
                                <span className="text-sm text-gray-500">Chunking & Vectorizing... 75%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-[#0F3B2C] w-[75%] rounded-full"></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Statistics Card */}
                <Card className="shadow-sm border-gray-200">
                    <CardHeader>
                        <CardTitle className="text-xs font-bold text-gray-500 uppercase tracking-wider">Statistik Basis Pengetahuan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                                <FileText size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total Dokumen</p>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-2xl font-bold text-gray-900">124</h3>
                                    <Badge variant="secondary" className="bg-[#D1F4E0] text-[#0F3B2C]">+12%</Badge>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-[#D1F4E0] text-[#0F3B2C] flex items-center justify-center">
                                <Search size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total Embeddings</p>
                                <h3 className="text-2xl font-bold text-gray-900">12.4k</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Document List Table */}
            <Card className="shadow-sm border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
                    <div className="relative w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <Input className="pl-10 rounded-full bg-gray-50 border-gray-200 focus-visible:ring-[#0F3B2C]" placeholder="Cari judul atau kategori..." />
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500 mr-2">Filter:</span>
                        <Badge className="bg-[#0F3B2C] hover:bg-[#154E3A]">Semua</Badge>
                        <Badge variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-200">Agribisnis</Badge>
                        <Badge variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-200">Hortikultura</Badge>
                        <Badge variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-200">Peternakan</Badge>
                    </div>
                </div>
                
                <Table>
                    <TableHeader className="bg-gray-50">
                        <TableRow>
                            <TableHead className="font-semibold text-gray-600 w-[40%]">Judul Dokumen</TableHead>
                            <TableHead className="font-semibold text-gray-600">Kategori</TableHead>
                            <TableHead className="font-semibold text-gray-600">Tanggal Unggah</TableHead>
                            <TableHead className="font-semibold text-gray-600">Status</TableHead>
                            <TableHead className="font-semibold text-gray-600 text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium flex items-center gap-3">
                                <FileText className="text-gray-400" size={18} />
                                Teknik Budidaya Padi Organik 2024.pdf
                            </TableCell>
                            <TableCell><Badge variant="secondary" className="bg-gray-100">Agribisnis</Badge></TableCell>
                            <TableCell className="text-gray-500">12 Jan 2024</TableCell>
                            <TableCell><Badge className="bg-[#D1F4E0] text-[#0F3B2C] hover:bg-[#D1F4E0] shadow-none">Completed</Badge></TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="icon" className="text-gray-400"><MoreVertical size={18} /></Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium flex items-center gap-3">
                                <FileText className="text-gray-400" size={18} />
                                Manajemen Hama Terpadu.docx
                            </TableCell>
                            <TableCell><Badge variant="secondary" className="bg-gray-100">Hortikultura</Badge></TableCell>
                            <TableCell className="text-gray-500">10 Jan 2024</TableCell>
                            <TableCell><Badge className="bg-green-100/50 text-[#0F3B2C] hover:bg-green-100/50 shadow-none border border-green-200 flex items-center w-fit gap-1.5"><span className="w-1.5 h-1.5 bg-[#0F3B2C] rounded-full animate-pulse"></span> Processing</Badge></TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="icon" className="text-gray-400"><MoreVertical size={18} /></Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium flex items-center gap-3">
                                <FileText className="text-gray-400" size={18} />
                                Nutrisi Hidroponik Skala SMK.pdf
                            </TableCell>
                            <TableCell><Badge variant="secondary" className="bg-gray-100">Irigasi</Badge></TableCell>
                            <TableCell className="text-gray-500">08 Jan 2024</TableCell>
                            <TableCell><Badge variant="destructive" className="bg-red-600 flex items-center w-fit gap-1.5"><span className="w-1.5 h-1.5 bg-white rounded-full"></span> Failed</Badge></TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="icon" className="text-gray-400"><MoreVertical size={18} /></Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                
                <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-sm text-gray-500">
                    <span>Showing 1 to 3 of 124 entries</span>
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="w-8 h-8"><ChevronLeft size={16} /></Button>
                        <Button variant="ghost" className="w-8 h-8 p-0 bg-white shadow-sm border border-gray-200 font-medium text-gray-900">1</Button>
                        <Button variant="ghost" className="w-8 h-8 p-0">2</Button>
                        <Button variant="ghost" className="w-8 h-8 p-0">3</Button>
                        <Button variant="ghost" size="icon" className="w-8 h-8"><ChevronRight size={16} /></Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
