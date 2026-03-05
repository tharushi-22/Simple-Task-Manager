import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Lock, User, Loader2, ArrowRight } from 'lucide-react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            await register(username, email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create account. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden transform transition-all">
                <div className="p-8">
                    <div className="flex justify-center mb-6">
                        <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600">
                            <UserPlus size={32} />
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-center text-emerald-900 mb-2">Create Account</h2>
                    <p className="text-center text-emerald-600/70 mb-8 font-medium">Join us and manage your tasks effortlessly</p>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-emerald-900/70 ml-1">Username</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-600/50 group-focus-within:text-emerald-500 transition-colors">
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full pl-11 pr-4 py-3.5 bg-emerald-50/50 border border-emerald-100 text-emerald-900 placeholder-emerald-300 rounded-2xl focus:ring-4 focus:ring-emerald-200 focus:border-emerald-400 focus:bg-white transition-all outline-none"
                                    placeholder="johndoe"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-emerald-900/70 ml-1">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-600/50 group-focus-within:text-emerald-500 transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-11 pr-4 py-3.5 bg-emerald-50/50 border border-emerald-100 text-emerald-900 placeholder-emerald-300 rounded-2xl focus:ring-4 focus:ring-emerald-200 focus:border-emerald-400 focus:bg-white transition-all outline-none"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-emerald-900/70 ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-600/50 group-focus-within:text-emerald-500 transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    minlength="6"
                                    className="block w-full pl-11 pr-4 py-3.5 bg-emerald-50/50 border border-emerald-100 text-emerald-900 placeholder-emerald-300 rounded-2xl focus:ring-4 focus:ring-emerald-200 focus:border-emerald-400 focus:bg-white transition-all outline-none"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center space-x-2 py-4 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-400 text-white font-bold rounded-2xl shadow-lg shadow-emerald-200 hover:shadow-emerald-300 hover:-translate-y-0.5 active:translate-y-0 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-200"
                        >
                            {isSubmitting ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    <span>Create Account</span>
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="px-8 py-6 bg-emerald-50/30 border-t border-white/20 text-center">
                    <p className="text-sm text-emerald-800/60 font-medium">
                        Already have an account?{' '}
                        <Link to="/login" className="text-emerald-600 hover:text-emerald-500 font-bold transition-colors">
                            Sign In here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
