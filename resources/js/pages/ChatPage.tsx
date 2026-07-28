import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Paperclip, Send, Leaf, Bug, Droplets, Calendar, BarChart, Download, X, File as FileIcon, Loader2, ThumbsUp, ThumbsDown, MessageSquarePlus } from 'lucide-react';
import { Button } from '../components/ui/button';
import ReactMarkdown from 'react-markdown';
import api from '../lib/axios';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    feedback?: 'positive' | 'negative';
    attachment_name?: string;
}

export default function ChatPage() {
    const [input, setInput] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [sessionId, setSessionId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    // Feedback State
    const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
    const [activeMessageId, setActiveMessageId] = useState<string | null>(null);
    const [feedbackComment, setFeedbackComment] = useState('');
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const sid = searchParams.get('session');
        if (sid) {
            setSessionId(parseInt(sid));
            api.get(`/user/chat/sessions/${sid}`).then(res => {
                setMessages(res.data.messages.map((m: any) => ({
                    id: m.id.toString(),
                    role: m.role,
                    content: m.content
                })));
            }).catch(err => console.error("Error loading session:", err));
        } else {
            setSessionId(null);
            setMessages([]);
        }
    }, [searchParams]);

    const submitFeedback = async (messageId: string, isPositive: boolean, comment: string = '') => {
        try {
            await api.post('/user/chat/feedback', {
                message_id: messageId,
                is_positive: isPositive,
                comment: comment
            });
            // Update local state to show feedback was given
            setMessages(prev => prev.map(m => m.id === messageId ? { ...m, feedback: isPositive ? 'positive' : 'negative' } : m));
        } catch (err) {
            console.error("Failed to submit feedback", err);
        }
    };

    const handlePositiveFeedback = (messageId: string) => {
        submitFeedback(messageId, true);
    };

    const handleNegativeFeedbackClick = (messageId: string) => {
        setActiveMessageId(messageId);
        setFeedbackComment('');
        setFeedbackModalOpen(true);
    };

    const handleNegativeFeedbackSubmit = () => {
        if (activeMessageId) {
            submitFeedback(activeMessageId, false, feedbackComment);
        }
        setFeedbackModalOpen(false);
    };

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
        const userMsg: Message = { 
            id: Date.now().toString(), 
            role: 'user', 
            content: input,
            attachment_name: selectedFile ? selectedFile.name : undefined
        };
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
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }

        try {
            const response = await api.post('/user/chat/message', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            const aiMsg: Message = { id: response.data.message_id?.toString() || (Date.now() + 1).toString(), role: 'assistant', content: response.data.reply };
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
        <div className="flex flex-col h-full bg-[#F8FAFC] dark:bg-gray-900 relative">
            {sessionId && (
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent dark:from-gray-900 dark:via-gray-900/80 z-30 pointer-events-none">
                    <div className="pt-4 flex justify-center w-full">
                        <div className="pointer-events-auto shadow-sm rounded-full">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => navigate('/chat')}
                                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-[#0F3B2C] dark:text-green-400 border-[#D1F4E0] dark:border-gray-600 shadow-md rounded-full px-5 py-2 border-2 flex items-center justify-center"
                            >
                                <MessageSquarePlus size={20} className="mr-2" strokeWidth={2.5} /> <span className="font-bold">Percakapan Baru</span>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Main Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 pt-24 md:p-8 md:pt-28 flex flex-col items-center">
                {messages.length === 0 ? (
                    <>
                        <div className="w-16 h-16 bg-[#D1F4E0] dark:bg-green-900/30 text-[#0F3B2C] dark:text-green-400 rounded-2xl flex items-center justify-center mb-6 mt-10">
                            <Leaf size={32} />
                        </div>
                        <h1 className="text-3xl font-bold text-[#0F3B2C] dark:text-white mb-2 text-center">Selamat Datang di Tanya AI</h1>
                        <p className="text-gray-500 dark:text-gray-400 mb-12 text-center max-w-lg">
                            Tanya asisten AI untuk solusi pertanian presisi, hama tanaman, hingga strategi budidaya modern sesuai kurikulum SMK.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl w-full">
                            {/* Starter 1 */}
                            <div onClick={() => setInput("Bagaimana cara atasi hama wereng secara organik?")} className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-transparent shadow-sm hover:border-[#D1F4E0] dark:hover:border-gray-600 hover:shadow-md cursor-pointer transition-all">
                                <Bug className="text-[#0F3B2C] dark:text-green-400 mb-3" size={24} />
                                <h3 className="font-semibold text-gray-900 dark:text-white">Atasi Hama Wereng</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Solusi organik dan kimiawi terkendali.</p>
                            </div>
                            {/* Starter 2 */}
                            <div onClick={() => setInput("Apa formula AB Mix yang tepat untuk hidroponik selada?")} className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-transparent shadow-sm hover:border-[#D1F4E0] dark:hover:border-gray-600 hover:shadow-md cursor-pointer transition-all">
                                <Droplets className="text-[#0F3B2C] dark:text-green-400 mb-3" size={24} />
                                <h3 className="font-semibold text-gray-900 dark:text-white">Nutrisi Hidroponik</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Formula AB Mix untuk tanaman selada.</p>
                            </div>
                            {/* Starter 3 */}
                            <div onClick={() => setInput("Berdasarkan cuaca tahun ini, kapan jadwal tanam padi yang optimal?")} className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-transparent shadow-sm hover:border-[#D1F4E0] dark:hover:border-gray-600 hover:shadow-md cursor-pointer transition-all">
                                <Calendar className="text-[#0F3B2C] dark:text-green-400 mb-3" size={24} />
                                <h3 className="font-semibold text-gray-900 dark:text-white">Jadwal Tanam Padi</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Prediksi cuaca & kalender musim 2024.</p>
                            </div>
                            {/* Starter 4 */}
                            <div onClick={() => setInput("Bagaimana cara interpretasi hasil cek lab pH dan NPK tanah?")} className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-transparent shadow-sm hover:border-[#D1F4E0] dark:hover:border-gray-600 hover:shadow-md cursor-pointer transition-all">
                                <BarChart className="text-[#0F3B2C] dark:text-green-400 mb-3" size={24} />
                                <h3 className="font-semibold text-gray-900 dark:text-white">Analisis Tanah SMK</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Interpretasi hasil cek lab pH & NPK.</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="w-full max-w-3xl flex flex-col gap-6 relative mt-10 md:mt-0">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                {msg.attachment_name && (
                                    <div className="flex items-center gap-2 bg-[#E2F6EA] text-[#0F3B2C] px-3 py-1.5 rounded-lg mb-2 text-sm border border-[#D1F4E0]">
                                        <FileIcon size={16} />
                                        <span className="truncate max-w-[200px] font-medium">{msg.attachment_name}</span>
                                    </div>
                                )}
                                <div className={`max-w-[85%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-[#0F3B2C] text-white rounded-tr-sm' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-tl-sm shadow-sm'}`}>
                                    <div className="prose prose-sm max-w-none dark:prose-invert prose-p:leading-relaxed prose-img:rounded-xl prose-img:shadow-md">
                                        <ReactMarkdown>{msg.content.split('\n\n[Teks dari file')[0]}</ReactMarkdown>
                                    </div>
                                </div>
                                {msg.role === 'assistant' && msg.id.length < 13 && ( // Simple check if it's a real DB ID, not Date.now()
                                    <div className="flex gap-2 mt-2 ml-2">
                                        <button 
                                            onClick={() => handlePositiveFeedback(msg.id)}
                                            className={`p-1.5 rounded-full hover:bg-gray-200 transition-colors ${msg.feedback === 'positive' ? 'text-green-600 bg-green-50' : 'text-gray-400'}`}
                                            title="Jawaban ini membantu"
                                            disabled={!!msg.feedback}
                                        >
                                            <ThumbsUp size={16} />
                                        </button>
                                        <button 
                                            onClick={() => handleNegativeFeedbackClick(msg.id)}
                                            className={`p-1.5 rounded-full hover:bg-gray-200 transition-colors ${msg.feedback === 'negative' ? 'text-red-600 bg-red-50' : 'text-gray-400'}`}
                                            title="Jawaban ini tidak akurat"
                                            disabled={!!msg.feedback}
                                        >
                                            <ThumbsDown size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
                                    <Loader2 className="animate-spin text-[#0F3B2C] dark:text-green-400" size={20} />
                                    <span className="text-gray-500 dark:text-gray-400 text-sm">AI sedang berpikir...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-[#F8FAFC] dark:bg-gray-900">
                <div className="max-w-3xl mx-auto relative">




                    {selectedFile && (
                        <div className="mb-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-transparent rounded-xl p-2 flex items-center gap-3 shadow-sm w-fit">
                            <div className="bg-[#D1F4E0] dark:bg-green-900/30 text-[#0F3B2C] dark:text-green-400 p-2 rounded-lg">
                                <FileIcon size={16} />
                            </div>
                            <div className="flex flex-col pr-4">
                                <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate max-w-[200px]">{selectedFile.name}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{(selectedFile.size / 1024).toFixed(1)} KB</span>
                            </div>
                            <button
                                onClick={() => setSelectedFile(null)}
                                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )}

                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-transparent rounded-2xl p-2 flex items-end shadow-sm">
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.txt,.pdf"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                        <button
                            className="p-3 text-gray-400 hover:text-[#0F3B2C] dark:hover:text-green-400 transition-colors disabled:cursor-not-allowed"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={loading}
                        >
                            <Paperclip size={20} />
                        </button>
                        <textarea
                            ref={textareaRef}
                            className="flex-1 bg-transparent border-none outline-none px-2 py-3 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 resize-none overflow-y-auto"
                            style={{ minHeight: '44px', maxHeight: '150px' }}
                            rows={1}
                            placeholder="Tanya AI seputar pertanian hijau disini..."
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                                e.target.style.height = 'auto';
                                e.target.style.height = `${e.target.scrollHeight}px`;
                            }}
                            onKeyDown={handleKeyDown}
                            disabled={loading}
                        />
                        <button 
                            onClick={handleSend}
                            disabled={loading || (!input.trim() && !selectedFile)}
                            className="p-3 bg-[#0F3B2C] text-white rounded-full hover:bg-[#154E3A] transition-colors ml-2 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                        </button>
                    </div>
                    <p className="text-center text-xs text-gray-400 mt-3">
                        Tanya AI dapat membuat kesalahan. Periksa informasi penting.
                    </p>
                </div>
            </div>

            {/* Feedback Modal */}
            {feedbackModalOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                <ThumbsDown size={18} className="text-red-500" /> 
                                Berikan Masukan
                            </h3>
                            <button onClick={() => setFeedbackModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-5">
                            <p className="text-sm text-gray-600 mb-4">Mengapa jawaban ini tidak memuaskan? (Opsional)</p>
                            <textarea 
                                className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3B2C]/20 focus:border-[#0F3B2C] resize-none h-24"
                                placeholder="Contoh: Jawaban tidak sesuai dengan konteks hidroponik..."
                                value={feedbackComment}
                                onChange={(e) => setFeedbackComment(e.target.value)}
                            ></textarea>
                            <div className="flex justify-end gap-3 mt-4">
                                <Button variant="outline" onClick={() => setFeedbackModalOpen(false)}>Batal</Button>
                                <Button className="bg-[#0F3B2C] hover:bg-[#154E3A]" onClick={handleNegativeFeedbackSubmit}>Kirim Feedback</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
