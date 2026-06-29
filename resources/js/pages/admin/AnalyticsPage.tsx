import React from 'react';
import { Download, TrendingUp, Bug, Droplets, AlertTriangle, Info, XCircle, CalendarIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Search } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Sen', berhasil: 40, divalidasi: 15 },
  { name: 'Sel', berhasil: 60, divalidasi: 10 },
  { name: 'Rab', berhasil: 35, divalidasi: 25 },
  { name: 'Kam', berhasil: 80, divalidasi: 5 },
  { name: 'Jum', berhasil: 85, divalidasi: 15 },
  { name: 'Sab', berhasil: 20, divalidasi: 30 },
  { name: 'Min', berhasil: 10, divalidasi: 20 },
];

export default function AnalyticsPage() {
    return (
        <div className="p-8 bg-[#F8FAFC] min-h-full">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard Analitik Guru</h1>
                    <p className="text-sm text-gray-500">Pantau aktivitas pembelajaran dan kesehatan tanaman di ekosistem SMK.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="bg-white">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        Minggu Ini
                    </Button>
                    <Button className="bg-[#0F3B2C] hover:bg-[#154E3A]">
                        <Download className="mr-2 h-4 w-4" />
                        Laporan PDF
                    </Button>
                </div>
            </div>

            {/* Top KPI Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <Card className="shadow-sm border-gray-200">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-semibold text-gray-500">Total Chat Hari Ini</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-end gap-2 mb-2">
                            <h3 className="text-3xl font-bold text-gray-900">1,284</h3>
                            <span className="flex items-center text-xs font-medium text-green-600 mb-1">
                                <TrendingUp size={12} className="mr-1" /> 12%
                            </span>
                        </div>
                        <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden mt-3">
                            <div className="h-full bg-[#0F3B2C] w-[65%] rounded-full"></div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-gray-200">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-semibold text-gray-500">Topik Terpopuler</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="bg-[#D1F4E0] text-[#0F3B2C]">Hama</Badge>
                                <span className="text-sm font-semibold">45%</span>
                            </div>
                            <Bug size={16} className="text-[#0F3B2C]" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="bg-orange-100 text-orange-700">Hidroponik</Badge>
                                <span className="text-sm font-semibold">32%</span>
                            </div>
                            <Droplets size={16} className="text-orange-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-gray-200">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-semibold text-gray-500">Tren Penyakit Tanaman</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center">
                            <div className="w-6 h-6 bg-red-200 rounded animate-pulse"></div>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">Bercak Daun</h4>
                            <p className="text-xs text-red-600 font-medium">Meningkat di SMK Pertanian 1</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-gray-200">
                    <CardHeader className="pb-2 flex flex-row items-start justify-between">
                        <CardTitle className="text-xs font-semibold text-gray-500">Feedback Negatif</CardTitle>
                        <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <h3 className="text-3xl font-bold text-red-600 mb-1">14</h3>
                        <p className="text-xs text-gray-500">Butuh validasi guru segera.</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
                <Card className="col-span-2 shadow-sm border-gray-200">
                    <CardHeader className="flex flex-row items-center justify-between pb-6">
                        <CardTitle className="text-lg font-bold">Aktivitas Chat Mingguan</CardTitle>
                        <div className="flex gap-4 text-xs">
                            <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#0F3B2C]"></span> Berhasil</div>
                            <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#A3E5C2]"></span> Divalidasi</div>
                        </div>
                    </CardHeader>
                    <CardContent className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                                <Bar dataKey="berhasil" stackId="a" fill="#0F3B2C" radius={[0, 0, 4, 4]} barSize={40} />
                                <Bar dataKey="divalidasi" stackId="a" fill="#A3E5C2" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Alerts Perlu Perhatian</h3>
                    
                    <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                        <div className="flex gap-3">
                            <AlertTriangle className="text-red-500 shrink-0" size={18} />
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">Feedback Thumbs Down</h4>
                                <p className="text-xs text-gray-500 mt-1 mb-2 leading-relaxed">Jawaban AI mengenai "Dosis NPK" dianggap tidak akurat oleh Siswa Ari.</p>
                                <button className="text-xs font-bold text-red-600 hover:underline">Tinjau Sekarang</button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-green-100 shadow-sm relative overflow-hidden bg-green-50/30">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0F3B2C]"></div>
                        <div className="flex gap-3">
                            <Info className="text-[#0F3B2C] shrink-0" size={18} />
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">Saran Topik Baru</h4>
                                <p className="text-xs text-gray-500 mt-1 mb-2 leading-relaxed">Banyak pertanyaan tentang "Kultur Jaringan" yang belum ada di Knowledge Base.</p>
                                <button className="text-xs font-bold text-[#0F3B2C] hover:underline">Tambah Konten</button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                        <div className="flex gap-3">
                            <XCircle className="text-red-500 shrink-0" size={18} />
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">Feedback Thumbs Down</h4>
                                <p className="text-xs text-gray-500 mt-1 mb-2 leading-relaxed">Siswa menolak rekomendasi AI untuk pestisida kimia pada tomat.</p>
                                <button className="text-xs font-bold text-red-600 hover:underline">Tinjau Sekarang</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Card className="shadow-sm border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
                    <h3 className="text-lg font-bold text-gray-900">Monitoring Obrolan</h3>
                    <div className="relative w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <Input className="pl-9 h-9 rounded-full bg-gray-50 border-gray-200 text-sm" placeholder="Cari pertanyaan siswa..." />
                    </div>
                </div>
                
                <Table>
                    <TableHeader className="bg-gray-50">
                        <TableRow>
                            <TableHead className="font-semibold text-gray-600 w-[25%]">Siswa</TableHead>
                            <TableHead className="font-semibold text-gray-600">Pertanyaan Terakhir</TableHead>
                            <TableHead className="font-semibold text-gray-600 w-[15%]">Status AI</TableHead>
                            <TableHead className="font-semibold text-gray-600 text-right w-[15%]">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#D1F4E0] text-[#0F3B2C] flex items-center justify-center text-xs font-bold">BA</div>
                                    <div>
                                        <p className="text-sm text-gray-900">Bagus Aris</p>
                                        <p className="text-xs text-gray-500 font-normal">SMK Pertanian 1</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="text-gray-600 text-sm truncate max-w-xs">"Kenapa daun cabai saya melengkung ke at..."</TableCell>
                            <TableCell><Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 font-medium">Terselesaikan</Badge></TableCell>
                            <TableCell className="text-right">
                                <Button size="sm" className="bg-[#0F3B2C] hover:bg-[#154E3A] text-xs h-8">Review</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs font-bold">SR</div>
                                    <div>
                                        <p className="text-sm text-gray-900">Siti Rahma</p>
                                        <p className="text-xs text-gray-500 font-normal">SMK Pertanian 2</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="text-gray-600 text-sm truncate max-w-xs">"Berapa pH ideal untuk melon hidroponik si..."</TableCell>
                            <TableCell><Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 font-medium">Feedback (-)</Badge></TableCell>
                            <TableCell className="text-right">
                                <Button size="sm" className="bg-[#0F3B2C] hover:bg-[#154E3A] text-xs h-8">Validate</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-bold">DW</div>
                                    <div>
                                        <p className="text-sm text-gray-900">Dedi Wijaya</p>
                                        <p className="text-xs text-gray-500 font-normal">SMK Pertanian 1</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="text-gray-600 text-sm truncate max-w-xs">"Cara membedakan busuk batang dan bus..."</TableCell>
                            <TableCell><Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-200 font-medium">Menunggu</Badge></TableCell>
                            <TableCell className="text-right">
                                <Button size="sm" className="bg-[#0F3B2C] hover:bg-[#154E3A] text-xs h-8">Review</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}

