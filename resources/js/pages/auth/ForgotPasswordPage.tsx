import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../lib/axios';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            const res = await api.post('/forgot-password', { email });
            setMessage(res.data.message || 'Tautan reset password telah dikirim ke email Anda.');
        } catch (err: any) {
            setError(err.response?.data?.email?.[0] || err.response?.data?.message || 'Gagal mengirim tautan reset password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-[#0F3B2C] rounded-md flex items-center justify-center text-white mb-4">
                        <span className="text-xl font-bold">TA</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Lupa Password</h2>
                    <p className="text-sm text-gray-500 mt-1 text-center">Masukkan email Anda untuk mereset password.</p>
                </div>

                {message && (
                    <div className="bg-green-50 text-green-700 p-3 rounded-md text-sm mb-4 border border-green-200">
                        {message}
                    </div>
                )}
                
                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4 border border-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D1F4E0] focus:border-[#0F3B2C] outline-none"
                            placeholder="email@sekolah.id"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#0F3B2C] text-white py-2 rounded-md hover:bg-[#0c2f23] transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Mengirim...' : 'Kirim Tautan Reset'}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-600">
                    Ingat password Anda? <Link to="/login" className="text-[#0F3B2C] font-semibold hover:underline">Masuk</Link>
                </p>
            </div>
        </div>
    );
}
