import React, { useState, useRef } from 'react';
import { Paperclip, Send, Leaf, Bug, Droplets, Calendar, BarChart, Download, X, File as FileIcon, Loader2 } from 'lucide-react';
import api from '../lib/axios';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatPage() {
    const [input, setInput] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [sessionId, setSessionId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() && !selectedFile) return;

        let currentSessionId = sessionId;

        // Create session if it doesn't exist
        if (!currentSessionId) {
            try {
                const res = await api.post('/user/chat/session');
                currentSessionId = res.data.session_id;
                setSessionId(currentSessionId);
            } catch (err) {
                console.error("Failed to create session", err);
                return;
            }
        }

        // Add user message to UI immediately
        const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setLoading(true);

        const formData = new FormData();
        formData.append('session_id', currentSessionId!.toString());
        formData.append('message', input || ' ');
        if (selectedFile) {
            formData.append('file', selectedFile);
        }

        setInput('');
        setSelectedFile(null);

        try {
            const response = await api.post('/user/chat/message', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: response.data.reply };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: 'Terjadi kesalahan jaringan atau server.' };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#F8FAFC]">
            {/* Main Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col items-center">
                {messages.length === 0 ? (
                    <>
                        <div className="w-16 h-16 bg-[#D1F4E0] text-[#0F3B2C] rounded-2xl flex items-center justify-center mb-6 mt-10">
                            <Leaf size={32} />
                        </div>
                        <h1 className="text-3xl font-bold text-[#0F3B2C] mb-2 text-center">Selamat Datang di Tanya AI</h1>
                        <p className="text-gray-500 mb-12 text-center max-w-lg">
                            Tanya asisten AI untuk solusi pertanian presisi, hama tanaman, hingga strategi budidaya modern sesuai kurikulum SMK.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl w-full">
                            {/* Starter 1 */}
                            <div onClick={() => setInput("Bagaimana cara atasi hama wereng secara organik?")} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:border-[#D1F4E0] hover:shadow-md cursor-pointer transition-all">
                                <Bug className="text-[#0F3B2C] mb-3" size={24} />
                                <h3 className="font-semibold text-gray-900">Atasi Hama Wereng</h3>
                                <p className="text-sm text-gray-500 mt-1">Solusi organik dan kimiawi terkendali.</p>
                            </div>
                            {/* Starter 2 */}
                            <div onClick={() => setInput("Apa formula AB Mix yang tepat untuk hidroponik selada?")} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:border-[#D1F4E0] hover:shadow-md cursor-pointer transition-all">
                                <Droplets className="text-[#0F3B2C] mb-3" size={24} />
                                <h3 className="font-semibold text-gray-900">Nutrisi Hidroponik</h3>
                                <p className="text-sm text-gray-500 mt-1">Formula AB Mix untuk tanaman selada.</p>
                            </div>
                            {/* Starter 3 */}
                            <div onClick={() => setInput("Berdasarkan cuaca tahun ini, kapan jadwal tanam padi yang optimal?")} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:border-[#D1F4E0] hover:shadow-md cursor-pointer transition-all">
                                <Calendar className="text-[#0F3B2C] mb-3" size={24} />
                                <h3 className="font-semibold text-gray-900">Jadwal Tanam Padi</h3>
                                <p className="text-sm text-gray-500 mt-1">Prediksi cuaca & kalender musim 2024.</p>
                            </div>
                            {/* Starter 4 */}
                            <div onClick={() => setInput("Bagaimana cara interpretasi hasil cek lab pH dan NPK tanah?")} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:border-[#D1F4E0] hover:shadow-md cursor-pointer transition-all">
                                <BarChart className="text-[#0F3B2C] mb-3" size={24} />
                                <h3 className="font-semibold text-gray-900">Analisis Tanah SMK</h3>
                                <p className="text-sm text-gray-500 mt-1">Interpretasi hasil cek lab pH & NPK.</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="w-full max-w-3xl flex flex-col gap-6">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-[#0F3B2C] text-white rounded-tr-sm' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm'}`}>
                                    <p className="whitespace-pre-wrap leading-relaxed text-[15px]">{msg.content}</p>
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
                                    <Loader2 className="animate-spin text-[#0F3B2C]" size={20} />
                                    <span className="text-gray-500 text-sm">AI sedang berpikir...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-[#F8FAFC]">
                <div className="max-w-3xl mx-auto relative">




                    {selectedFile && (
                        <div className="mb-3 bg-white border border-gray-200 rounded-xl p-2 flex items-center gap-3 shadow-sm w-fit">
                            <div className="bg-[#D1F4E0] text-[#0F3B2C] p-2 rounded-lg">
                                <FileIcon size={16} />
                            </div>
                            <div className="flex flex-col pr-4">
                                <span className="text-sm font-medium text-gray-800 truncate max-w-[200px]">{selectedFile.name}</span>
                                <span className="text-xs text-gray-500">{(selectedFile.size / 1024).toFixed(1)} KB</span>
                            </div>
                            <button
                                onClick={() => setSelectedFile(null)}
                                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )}

                    <div className="bg-white border border-gray-200 rounded-2xl p-2 flex items-center shadow-sm">
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.txt"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                        <button
                            className="p-3 text-gray-400 hover:text-[#0F3B2C] transition-colors disabled:opacity-50"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={loading}
                        >
                            <Paperclip size={20} />
                        </button>
                        <input
                            type="text"
                            className="flex-1 bg-transparent border-none outline-none px-2 text-gray-700 placeholder-gray-400"
                            placeholder="Tanya AI seputar pertanian hijau disini..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={loading}
                        />
                        <button 
                            onClick={handleSend}
                            disabled={loading || (!input.trim() && !selectedFile)}
                            className="p-3 bg-[#0F3B2C] text-white rounded-xl hover:bg-[#154E3A] transition-colors ml-2 disabled:opacity-50"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                    <p className="text-center text-xs text-gray-400 mt-3">
                        Tanya AI dapat membuat kesalahan. Periksa informasi penting.
                    </p>
                </div>
            </div>
        </div>
    );
}
