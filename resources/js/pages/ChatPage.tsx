import React, { useState } from 'react';
import { Paperclip, Send, Leaf, Bug, Droplets, Calendar, BarChart, Download } from 'lucide-react';

export default function ChatPage() {
    const [input, setInput] = useState('');
    
    return (
        <div className="flex flex-col h-full bg-[#F8FAFC]">
            {/* Main Chat Area */}
            <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center">
                <div className="w-16 h-16 bg-[#D1F4E0] text-[#0F3B2C] rounded-2xl flex items-center justify-center mb-6">
                    <Leaf size={32} />
                </div>
                <h1 className="text-3xl font-bold text-[#0F3B2C] mb-2">Selamat Datang di AgriSmart SMK</h1>
                <p className="text-gray-500 mb-12 text-center max-w-lg">
                    Tanya asisten AI untuk solusi pertanian presisi, hama tanaman, hingga strategi budidaya modern sesuai kurikulum SMK.
                </p>

                <div className="grid grid-cols-2 gap-4 max-w-3xl w-full">
                    {/* Starter 1 */}
                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:border-[#D1F4E0] hover:shadow-md cursor-pointer transition-all">
                        <Bug className="text-[#0F3B2C] mb-3" size={24} />
                        <h3 className="font-semibold text-gray-900">Atasi Hama Wereng</h3>
                        <p className="text-sm text-gray-500 mt-1">Solusi organik dan kimiawi terkendali.</p>
                    </div>
                    {/* Starter 2 */}
                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:border-[#D1F4E0] hover:shadow-md cursor-pointer transition-all">
                        <Droplets className="text-[#0F3B2C] mb-3" size={24} />
                        <h3 className="font-semibold text-gray-900">Nutrisi Hidroponik</h3>
                        <p className="text-sm text-gray-500 mt-1">Formula AB Mix untuk tanaman selada.</p>
                    </div>
                    {/* Starter 3 */}
                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:border-[#D1F4E0] hover:shadow-md cursor-pointer transition-all">
                        <Calendar className="text-[#0F3B2C] mb-3" size={24} />
                        <h3 className="font-semibold text-gray-900">Jadwal Tanam Padi</h3>
                        <p className="text-sm text-gray-500 mt-1">Prediksi cuaca & kalender musim 2024.</p>
                    </div>
                    {/* Starter 4 */}
                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:border-[#D1F4E0] hover:shadow-md cursor-pointer transition-all">
                        <BarChart className="text-[#0F3B2C] mb-3" size={24} />
                        <h3 className="font-semibold text-gray-900">Analisis Tanah SMK</h3>
                        <p className="text-sm text-gray-500 mt-1">Interpretasi hasil cek lab pH & NPK.</p>
                    </div>
                </div>
            </div>

            {/* Input Area */}
            <div className="p-6 bg-[#F8FAFC]">
                <div className="max-w-3xl mx-auto relative">
                    {/* Mock Chat Message */}
                    <div className="mb-6 flex justify-end">
                        <div className="bg-[#0F3B2C] text-white p-4 rounded-xl rounded-br-sm max-w-lg shadow-sm">
                            Bagaimana cara mencegah pembusukan akar pada tanaman tomat di musim hujan?
                        </div>
                    </div>
                    
                    <div className="absolute -top-12 right-0">
                        <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-sm hover:bg-gray-50">
                            <Download size={16} /> Export Chat (PDF)
                        </button>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl p-2 flex items-center shadow-sm">
                        <button className="p-3 text-gray-400 hover:text-gray-600 transition-colors">
                            <Paperclip size={20} />
                        </button>
                        <input 
                            type="text" 
                            className="flex-1 bg-transparent border-none outline-none px-2 text-gray-700 placeholder-gray-400"
                            placeholder="Tanya tentang budidaya atau kurikulum SMK..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button className="p-3 bg-[#0F3B2C] text-white rounded-xl hover:bg-[#154E3A] transition-colors ml-2">
                            <Send size={18} />
                        </button>
                    </div>
                    <p className="text-center text-xs text-gray-400 mt-3">
                        AgriSmart AI dapat membuat kesalahan. Periksa informasi penting.
                    </p>
                </div>
            </div>
        </div>
    );
}
