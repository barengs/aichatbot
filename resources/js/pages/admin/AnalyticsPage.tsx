import React, { useState, useEffect } from 'react';
import { Download, TrendingUp, Bug, Droplets, AlertTriangle, Info, XCircle, CalendarIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Search, Cpu } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../../lib/axios';

export default function AnalyticsPage() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        totalChatsToday: 0,
        chartData: [],
        recentChats: [],
        alerts: [],
        totalTokensToday: 0,
        totalTokensAllTime: 0
    });

    useEffect(() => {
        api.get('/admin/analytics')
            .then(res => {
                setData(res.data);
            })
            .catch(err => console.error("Error fetching analytics", err))
            .finally(() => setLoading(false));
    }, []);

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const berhasil = payload.find((p: any) => p.dataKey === 'berhasil')?.value || 0;
            const divalidasi = payload.find((p: any) => p.dataKey === 'divalidasi')?.value || 0;
            const total = berhasil + divalidasi;
            
            const berhasilPct = total > 0 ? Math.round((berhasil / total) * 100) : 0;
            const divalidasiPct = total > 0 ? Math.round((divalidasi / total) * 100) : 0;

            return (
                <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100 text-sm">
                    <p className="font-bold text-gray-900 mb-2">{label}</p>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-[#0F3B2C]"></div>
                        <span className="text-gray-600">Berhasil:</span>
                        <span className="font-semibold text-gray-900">{berhasil} ({berhasilPct}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#A3E5C2]"></div>
                        <span className="text-gray-600">Divalidasi:</span>
                        <span className="font-semibold text-gray-900">{divalidasi} ({divalidasiPct}%)</span>
                    </div>
                </div>
            );
        }
        return null;
    };

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
                            <h3 className="text-3xl font-bold text-gray-900">{data.totalChatsToday}</h3>
                            <span className="flex items-center text-xs font-medium text-green-600 mb-1">
                                <TrendingUp size={12} className="mr-1" /> {data.totalChatsToday > 0 ? '+12%' : '0%'}
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
                        <CardTitle className="text-xs font-semibold text-gray-500">Penggunaan Token AI</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                            <Cpu size={24} className="text-blue-500" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">{data.totalTokensToday.toLocaleString('id-ID')}</h4>
                            <p className="text-xs text-blue-600 font-medium">Total: {data.totalTokensAllTime.toLocaleString('id-ID')}</p>
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
                            <BarChart data={data.chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                                <Tooltip content={<CustomTooltip />} cursor={{fill: '#F3F4F6'}} />
                                <Bar dataKey="berhasil" stackId="a" fill="#0F3B2C" radius={[0, 0, 4, 4]} barSize={40} />
                                <Bar dataKey="divalidasi" stackId="a" fill="#A3E5C2" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Alerts Perlu Perhatian</h3>
                    
                    {data.alerts && data.alerts.length > 0 ? (
                        data.alerts.map((alert: any) => (
                            <div key={alert.id} className={`bg-white p-4 rounded-xl border ${alert.type === 'negative' ? 'border-red-100' : 'border-green-100'} shadow-sm relative overflow-hidden`}>
                                <div className={`absolute left-0 top-0 bottom-0 w-1 ${alert.type === 'negative' ? 'bg-red-500' : 'bg-[#0F3B2C]'}`}></div>
                                <div className="flex gap-3">
                                    {alert.type === 'negative' ? (
                                        <AlertTriangle className="text-red-500 shrink-0" size={18} />
                                    ) : (
                                        <Info className="text-[#0F3B2C] shrink-0" size={18} />
                                    )}
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900">{alert.title}</h4>
                                        <p className="text-xs text-gray-500 mt-1 mb-2 leading-relaxed">{alert.description}</p>
                                        <button className={`text-xs font-bold ${alert.type === 'negative' ? 'text-red-600' : 'text-[#0F3B2C]'} hover:underline`}>Tinjau Sekarang</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-sm text-gray-500 p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
                            Tidak ada alert baru hari ini.
                        </div>
                    )}
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
                        {data.recentChats.map((chat: any) => (
                            <TableRow key={chat.id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#D1F4E0] text-[#0F3B2C] flex items-center justify-center text-xs font-bold">{chat.user_initials}</div>
                                        <div>
                                            <p className="text-sm text-gray-900">{chat.user_name}</p>
                                            <p className="text-xs text-gray-500 font-normal">{chat.user_school}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-gray-600 text-sm truncate max-w-xs">"{chat.last_message}"</TableCell>
                                <TableCell><Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 font-medium">{chat.status}</Badge></TableCell>
                                <TableCell className="text-right">
                                    <Button size="sm" className="bg-[#0F3B2C] hover:bg-[#154E3A] text-xs h-8">Review</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}

