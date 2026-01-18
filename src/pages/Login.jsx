import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/dashboard';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                login({ username: data.username, role: data.role }, data.token);
                navigate(from, { replace: true });
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Network error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative overflow-hidden font-sans">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500 via-transparent to-transparent animate-pulse" style={{ animationDuration: '10s' }}></div>
            </div>

            <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-600/20 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-md w-full bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-10 relative z-10 animate-slide-up">
                <div className="text-center mb-10">

                    <div className="flex justify-center mb-6">
                        <img src={logo} alt="GemsMuse" className="h-24 w-auto object-contain brightness-0 invert" />
                    </div>
                    <p className="text-amber-500 text-xs uppercase tracking-[0.3em] mt-2">Login</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm flex items-center animate-fade-in">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Username</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            </div>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-white placeholder-gray-500 transition-all duration-300"
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-white placeholder-gray-500 transition-all duration-300"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-700 text-white font-bold py-3 px-4 rounded-lg hover:from-amber-600 hover:to-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 focus:ring-offset-gray-900 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing in...
                            </span>
                        ) : 'Sign In'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <button className="text-sm text-gray-500 hover:text-amber-500 transition-colors duration-200">Forgot Password?</button>
                </div>
            </div>

            <div className="absolute bottom-6 text-center w-full">
                <p className="text-gray-600 text-xs tracking-wider">© {new Date().getFullYear()} GemsMuse. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Login;
