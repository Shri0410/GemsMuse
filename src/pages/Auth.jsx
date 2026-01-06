import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();
    navigate("/profile");
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
                    className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-2 pl-8 text-text-main-light dark:text-text-main-dark focus:outline-none focus:border-primary transition-colors placeholder-transparent focus:ring-0 text-sm"
                    placeholder="Full Name"
                    type="text"
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
                  className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-2 pl-8 text-text-main-light dark:text-text-main-dark focus:outline-none focus:border-primary transition-colors placeholder-transparent focus:ring-0 text-sm"
                  placeholder="Email"
                  type="text"
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
                  className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-2 pl-8 text-text-main-light dark:text-text-main-dark focus:outline-none focus:border-primary transition-colors placeholder-transparent focus:ring-0 text-sm"
                  placeholder="Password"
                  type="password"
                />
              </div>
            </div>
            <button
              className="w-full bg-primary hover:bg-primary-hover text-white py-4 mt-2 uppercase text-xs font-bold tracking-[0.2em] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              type="submit"
            >
              {isLogin ? "Login" : "Create Account"}
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
