import toast from "react-hot-toast";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import api from '../../lib/axios';

export default function ResetPasswordPage() {
    const searchParams = new URLSearchParams(useLocation().search);
    const token = searchParams.get("token") || "";
    const emailFromUrl = searchParams.get("email") || "";
    const location = useLocation();
    
    const [email, setEmail] = useState(emailFromUrl);
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const emailParam = queryParams.get('email');
        if (emailParam) {
            setEmail(emailParam);
        }
    }, [location]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        if (password !== passwordConfirmation) {
            setError('Konfirmasi password tidak cocok.');
            setLoading(false);
            return;
        }

        try {
            const res = await api.post('/reset-password', { 
                email, 
                password, 
                password_confirmation: passwordConfirmation, 
                token 
            });
            setMessage(res.data.message || 'Password berhasil direset. Anda akan dialihkan ke halaman login...');
            toast.success('Password berhasil direset!');
            
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err: any) {
            const errorMsg = err.response?.data?.email?.[0] || err.response?.data?.password?.[0] || err.response?.data?.message || 'Gagal mereset password.';
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-gray-900">
            <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-[#0F3B2C] rounded-md flex items-center justify-center text-white mb-4">
                        <span className="text-xl font-bold">TA</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reset Password</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 text-center">Buat password baru untuk akun Anda.</p>
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
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            readOnly
                            value={email}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 text-gray-500 dark:text-gray-400 outline-none cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password Baru</label>
                        <input
                            type="password"
                            required
                            minLength={8}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-[#D1F4E0] focus:border-[#0F3B2C] outline-none"
                            placeholder="Minimal 8 karakter"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Konfirmasi Password</label>
                        <input
                            type="password"
                            required
                            minLength={8}
                            value={passwordConfirmation}
                            onChange={e => setPasswordConfirmation(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-[#D1F4E0] focus:border-[#0F3B2C] outline-none"
                            placeholder="Ulangi password baru"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !!message}
                        className="w-full bg-[#0F3B2C] text-white py-2 rounded-md hover:bg-[#0c2f23] transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Menyimpan...' : 'Simpan Password Baru'}
                    </button>
                </form>
            </div>
        </div>
    );
}
