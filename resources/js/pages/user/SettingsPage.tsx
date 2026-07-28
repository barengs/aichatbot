import React from 'react';
import { Bell, Shield, Monitor, Key } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function SettingsPage() {
    return (
        <div className="flex flex-col h-full bg-[#F8FAFC] dark:bg-gray-900">
            <div className="p-8 pb-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pengaturan Akun</h1>
                <p className="text-gray-500 dark:text-gray-400">Atur preferensi akun dan keamanan Anda di sini.</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 pt-4">
                <div className="max-w-3xl space-y-6">
                    {/* Security */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="text-[#0F3B2C] dark:text-green-400" size={24} />
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Keamanan</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                                <div>
                                    <h3 className="font-medium text-gray-800 dark:text-gray-200">Ganti Password</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Untuk keamanan, ganti password Anda melalui Administrator.</p>
                                </div>
                                <Button variant="outline" size="sm" disabled>Hubungi Admin</Button>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <div>
                                    <h3 className="font-medium text-gray-800 dark:text-gray-200">Autentikasi Dua Langkah (2FA)</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Tambahkan lapisan keamanan ekstra.</p>
                                </div>
                                <Button variant="outline" size="sm" disabled>Segera Hadir</Button>
                            </div>
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <Monitor className="text-[#0F3B2C] dark:text-green-400" size={24} />
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Preferensi</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                                <div>
                                    <h3 className="font-medium text-gray-800 dark:text-gray-200">Tema Aplikasi</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Gunakan ikon bulan/matahari di pojok kanan atas.</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <div>
                                    <h3 className="font-medium text-gray-800 dark:text-gray-200">Bahasa</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Pilih bahasa antarmuka aplikasi.</p>
                                </div>
                                <select className="border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-sm">
                                    <option>Bahasa Indonesia</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <Bell className="text-[#0F3B2C] dark:text-green-400" size={24} />
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Notifikasi</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-3">
                                <div>
                                    <h3 className="font-medium text-gray-800 dark:text-gray-200">Pembaruan Sistem</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Terima pemberitahuan tentang fitur baru AI.</p>
                                </div>
                                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#0F3B2C] focus:ring-[#0F3B2C]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
