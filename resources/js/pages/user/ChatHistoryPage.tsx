import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Clock, ArrowRight, Search, Trash2 } from 'lucide-react';
import api from '../../lib/axios';

interface ChatSession {
    id: number;
    title: string;
    messages_count: number;
    updated_at: string;
}

export default function ChatHistoryPage() {
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [sessionToDelete, setSessionToDelete] = useState<number | null>(null);

    const fetchSessions = () => {
        setLoading(true);
        api.get('/user/chat/sessions')
            .then(res => setSessions(res.data.sessions))
            .catch(err => console.error("Error loading history:", err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchSessions();
    }, []);

    const confirmDelete = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        setSessionToDelete(id);
        setDeleteModalOpen(true);
    };

    const executeDelete = async () => {
        if (sessionToDelete) {
            try {
                await api.delete(`/user/chat/sessions/${sessionToDelete}`);
                fetchSessions();
            } catch (err) {
                console.error("Gagal menghapus sesi", err);
            } finally {
                setDeleteModalOpen(false);
                setSessionToDelete(null);
            }
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const filteredSessions = sessions.filter(session => 
        session.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full bg-[#F8FAFC] dark:bg-gray-900">
            <div className="p-8 pb-4">
                <div className="mb-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">User / <span className="text-gray-900 dark:text-gray-200 font-bold">Riwayat</span></p>
                    <h1 className="text-3xl font-bold text-[#0F3B2C] dark:text-white">Riwayat Chat</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Lanjutkan percakapan Anda dengan Tanya AI sebelumnya.</p>
                </div>
            </div>

            <div className="flex-1 px-8 pb-8 m-0 flex flex-col h-full overflow-y-auto">
                {/* Search Bar - Centered */}
                <div className="max-w-xl mx-auto w-full mb-8 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Cari riwayat percakapan..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#0F3B2C]/20 dark:focus:ring-green-500/20 focus:border-[#0F3B2C] dark:focus:border-green-500 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    />
                </div>
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="w-8 h-8 rounded-full border-4 border-[#0F3B2C] border-t-transparent animate-spin"></div>
                    </div>
                ) : sessions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 text-gray-400 dark:text-gray-500">
                            <MessageSquare size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Belum ada percakapan</h3>
                        <p className="text-gray-500 dark:text-gray-400">Mulai diskusi baru tentang pertanian dengan Tanya AI sekarang.</p>
                        <button 
                            onClick={() => navigate('/chat')}
                            className="mt-6 px-6 py-2 bg-[#0F3B2C] dark:bg-green-700 text-white rounded-md hover:bg-[#154E3A] dark:hover:bg-green-600"
                        >
                            Chat Sekarang
                        </button>
                    </div>
                ) : filteredSessions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 text-gray-400 dark:text-gray-500">
                            <Search size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Tidak ditemukan</h3>
                        <p className="text-gray-500 dark:text-gray-400">Tidak ada riwayat chat yang cocok dengan pencarian Anda.</p>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto w-full flex flex-col gap-1">
                        {filteredSessions.map((session) => (
                            <div 
                                key={session.id} 
                                onClick={() => navigate(`/chat?session=${session.id}`)}
                                className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:border-[#D1F4E0] dark:hover:border-gray-500 hover:shadow-md cursor-pointer transition-all gap-4"
                            >
                                <div className="flex items-center gap-4 flex-1 min-w-0 w-full">
                                    <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-gray-500 dark:text-gray-400 group-hover:text-[#0F3B2C] dark:group-hover:text-green-400 group-hover:bg-[#E2F6EA] dark:group-hover:bg-green-900/30 transition-colors shrink-0">
                                        <MessageSquare size={22} />
                                    </div>
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 truncate group-hover:text-[#0F3B2C] dark:group-hover:text-green-400 transition-colors">
                                        {session.title}
                                    </h3>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0 w-full sm:w-auto">
                                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                        <Clock size={16} />
                                        <span>{formatDate(session.updated_at)}</span>
                                    </div>
                                    <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full group-hover:bg-[#E2F6EA] dark:group-hover:bg-green-900/30 group-hover:text-[#0F3B2C] dark:group-hover:text-green-400 transition-colors">
                                        {session.messages_count} Pesan
                                    </div>
                                    <button
                                        onClick={(e) => confirmDelete(e, session.id)}
                                        className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all border border-gray-200 dark:border-gray-600 hover:border-red-200 dark:hover:border-red-800"
                                        title="Hapus obrolan"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Custom Delete Modal */}
            {deleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Hapus Obrolan</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Apakah Anda yakin ingin menghapus riwayat obrolan ini? Tindakan ini tidak dapat dibatalkan.</p>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteModalOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={executeDelete}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Ya, Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
