import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Clock, ArrowRight } from 'lucide-react';
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
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/user/chat/sessions')
            .then(res => {
                setSessions(res.data.sessions);
            })
            .catch(err => console.error("Error loading history:", err))
            .finally(() => setLoading(false));
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="flex flex-col h-full bg-[#F8FAFC]">
            <div className="p-8 pb-4">
                <div className="mb-2">
                    <p className="text-xs text-gray-500 font-medium mb-1">User / <span className="text-gray-900 font-bold">Riwayat</span></p>
                    <h1 className="text-3xl font-bold text-[#0F3B2C]">Riwayat Chat</h1>
                    <p className="text-sm text-gray-500 mt-1">Lanjutkan percakapan Anda dengan Tanya AI sebelumnya.</p>
                </div>
            </div>

            <div className="flex-1 p-8 m-0 flex flex-col h-full overflow-y-auto">
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="w-8 h-8 rounded-full border-4 border-[#0F3B2C] border-t-transparent animate-spin"></div>
                    </div>
                ) : sessions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                            <MessageSquare size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Belum ada percakapan</h3>
                        <p className="text-gray-500">Mulai diskusi baru tentang pertanian dengan Tanya AI sekarang.</p>
                        <button 
                            onClick={() => navigate('/chat')}
                            className="mt-6 px-6 py-2 bg-[#0F3B2C] text-white rounded-md hover:bg-[#154E3A]"
                        >
                            Chat Sekarang
                        </button>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto w-full flex flex-col gap-2">
                        {sessions.map((session) => (
                            <div 
                                key={session.id} 
                                onClick={() => navigate(`/chat?session=${session.id}`)}
                                className="group flex items-center justify-between p-4 bg-white rounded-lg border border-transparent hover:border-gray-200 hover:shadow-sm cursor-pointer transition-all"
                            >
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    <div className="text-gray-400 group-hover:text-[#0F3B2C] transition-colors shrink-0">
                                        <MessageSquare size={18} />
                                    </div>
                                    <h3 className="text-[15px] font-medium text-gray-800 truncate group-hover:text-[#0F3B2C] transition-colors">
                                        {session.title}
                                    </h3>
                                </div>
                                <div className="flex items-center gap-6 shrink-0 ml-4">
                                    <div className="hidden sm:flex items-center gap-1 text-xs text-gray-400">
                                        <Clock size={14} />
                                        <span>{formatDate(session.updated_at)}</span>
                                    </div>
                                    <div className="w-16 text-right text-xs font-semibold text-gray-400 group-hover:text-[#0F3B2C] transition-colors">
                                        {session.messages_count} Pesan
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
