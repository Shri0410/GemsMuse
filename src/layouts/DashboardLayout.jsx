import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

// Icons as components for cleaner usage
const DashboardIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
);
const CollectionsIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
);
const ProductsIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
);
const ShowcaseIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
);
const LogoutIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
);
const UsersIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
);
const AttributesIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
);

const NavItem = ({ to, icon: Icon, label }) => {
    const location = useLocation();
    const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);

    return (
        <Link
            to={to}
            className={`flex items-center space-x-3 py-3 px-4 rounded-lg transition-all duration-300 group
                ${isActive
                    ? 'bg-amber-500/10 text-amber-500 border-r-4 border-amber-500'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
        >
            <span className={`transition-colors duration-300 ${isActive ? 'text-amber-500' : 'text-gray-500 group-hover:text-white'}`}>
                <Icon />
            </span>
            <span className="font-medium tracking-wide">{label}</span>
        </Link>
    );
};

const DashboardLayout = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            {/* Sidebar */}
            <aside className="w-72 bg-[#0f172a] shadow-2xl flex-shrink-0 flex flex-col transition-all duration-500 relative overflow-hidden">
                {/* Decorative BG element */}
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500 via-transparent to-transparent"></div>
                </div>

                <div className="p-8 border-b border-gray-800 relative z-10">
                    <div className="flex justify-center mb-4">
                        <img src={logo} alt="GemsMuse" className="h-16 w-auto object-contain brightness-0 invert" />
                    </div>
                    <p className="text-xs text-gray-500 text-center uppercase tracking-[0.2em]">Admin Dashboard</p>
                </div>

                <nav className="mt-8 px-4 space-y-2 flex-1 relative z-10">
                    <NavItem to="/dashboard/collections" icon={CollectionsIcon} label="Collections" />
                    <NavItem to="/dashboard/products" icon={ProductsIcon} label="Products" />
                    <NavItem to="/dashboard/featured" icon={ShowcaseIcon} label="Home Showcase" />
                    {user?.role === 'super_admin' && (
                        <NavItem to="/dashboard/users" icon={UsersIcon} label="Team" />
                    )}
                    <NavItem to="/dashboard/attributes" icon={AttributesIcon} label="Attributes" />
                </nav>

                <div className="p-6 border-t border-gray-800 bg-[#0b1120] relative z-10">
                    <div className="flex items-center justify-between group">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-700 flex items-center justify-center text-white font-bold shadow-lg">
                                {user?.username?.charAt(0).toUpperCase() || 'A'}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-medium text-white truncate group-hover:text-amber-500 transition-colors">{user?.username || 'Admin'}</p>
                                <p className="text-xs text-gray-500 truncate">Administrator</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-800/50 rounded-full transition-all duration-300 transform hover:rotate-90"
                            title="Logout"
                        >
                            <LogoutIcon />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-gray-50/50 relative">
                {/* Top Header Mockup */}
                <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-4 flex justify-between items-center shadow-sm">
                    <h2 className="text-xl font-medium text-gray-800">Overview</h2>
                    <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-mono text-gray-400">System Online</span>
                    </div>
                </header>

                <div className="p-8 animate-fade-in">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
