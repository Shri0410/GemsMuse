import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomerAuth } from "../context/CustomerAuthContext";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();
  const { customer, login, loading: authLoading } = useCustomerAuth();

  useEffect(() => {
    if (!authLoading && customer) {
      navigate('/profile');
    }
  }, [customer, authLoading, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    const endpoint = isLogin ? '/api/customer-auth/login' : '/api/customer-auth/register';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      if (isLogin) {
        // Login Success
        // Use context login function to update state immediately
        login(data.token, data.user);
        navigate("/profile");
      } else {
        // Register Success
        setMessage({ type: 'success', text: data.message });
        setIsLogin(true); // Switch to login view
        setFormData({ fullName: '', email: '', password: '' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex-grow flex items-center justify-center bg-[#F9F7F4] dark:bg-[#121212] pt-40 pb-20 relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      <div className="w-full max-w-md px-6 relative z-10 animate-fade-in-up">
        <div className="bg-white dark:bg-[#1E1E1E] shadow-2xl p-8 md:p-12 relative overflow-hidden border-t-4 border-primary">
          <div className="absolute top-4 right-4 opacity-10">
            <span className="material-icons-outlined text-5xl text-primary transform -rotate-12">
              diamond
            </span>
          </div>
          <div className="text-center mb-10">
            <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase block mb-3">
              {isLogin ? "Welcome Back" : "Join The Legacy"}
            </span>
            <h1 className="text-3xl md:text-4xl font-serif text-text-main-light dark:text-text-main-dark">
              {isLogin ? "Login" : "Create Account"}
            </h1>
          </div>

          {message.text && (
            <div className={`mb-6 p-3 text-center text-xs font-bold uppercase tracking-wider rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-8">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-text-muted-light ml-1 font-bold">
                  Full Name
                </label>
                <div className="relative group">
                  <span className="absolute left-0 bottom-2.5 text-text-muted-light group-focus-within:text-primary transition-colors">
                    <span className="material-icons-outlined text-lg">
                      person_outline
                    </span>
                  </span>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-2 pl-8 text-text-main-light dark:text-text-main-dark focus:outline-none focus:border-primary transition-colors placeholder-transparent focus:ring-0 text-sm"
                    placeholder="Full Name"
                    type="text"
                    required
                  />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-text-muted-light ml-1 font-bold">
                Email or Username
              </label>
              <div className="relative group">
                <span className="absolute left-0 bottom-2.5 text-text-muted-light group-focus-within:text-primary transition-colors">
                  <span className="material-icons-outlined text-lg">
                    mail_outline
                  </span>
                </span>
                <input
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-2 pl-8 text-text-main-light dark:text-text-main-dark focus:outline-none focus:border-primary transition-colors placeholder-transparent focus:ring-0 text-sm"
                  placeholder="Email"
                  type="email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-text-muted-light ml-1 font-bold">
                Password
              </label>
              <div className="relative group">
                <span className="absolute left-0 bottom-2.5 text-text-muted-light group-focus-within:text-primary transition-colors">
                  <span className="material-icons-outlined text-lg">
                    lock_open
                  </span>
                </span>
                <input
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-2 pl-8 text-text-main-light dark:text-text-main-dark focus:outline-none focus:border-primary transition-colors placeholder-transparent focus:ring-0 text-sm"
                  placeholder="Password"
                  type="password"
                />
              </div>
            </div>
            <button
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-hover text-white py-4 mt-2 uppercase text-xs font-bold tracking-[0.2em] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              type="submit"
            >
              {loading ? "Processing..." : (isLogin ? "Login" : "Create Account")}
            </button>
          </form>
          <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
            <p className="text-text-muted-light dark:text-text-muted-dark text-xs mb-4 font-light italic font-serif">
              {isLogin ? "Do you have a story to tell?" : "Already a member?"}
            </p>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="inline-block text-xs uppercase tracking-[0.15em] font-bold text-text-main-light dark:text-text-main-dark hover:text-primary transition-colors border-b border-text-main-light dark:border-text-main-dark hover:border-primary pb-1"
            >
              {isLogin ? "Create an Account" : "Back to Login"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
