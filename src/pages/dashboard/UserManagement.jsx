import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const UserManagement = () => {
    const { token, user: currentUser } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [usersList, setUsersList] = useState([]);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [editingUser, setEditingUser] = useState(null);

    // Fetch users (if authorized, though route returns list for any admin, we can show it)
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/auth/users', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setUsersList(data);
                }
            } catch (err) {
                console.error("Failed to fetch users", err);
            }
        };
        fetchUsers();
    }, [token, message]); // Re-fetch on message change (usually after add/delete)

    const handleDeleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            const res = await fetch(`/api/auth/users/${userId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Failed to delete');

            setMessage({ type: 'success', text: 'User removed successfully' });
            // remove from local list immediately
            setUsersList(prev => prev.filter(u => u.id !== userId));
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        }
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setFormData({
            username: user.username,
            email: user.email,
            password: '' // empty password means no change
        });
        setMessage({ type: '', text: '' });
    };

    const handleCancelEdit = () => {
        setEditingUser(null);
        setFormData({ username: '', email: '', password: '' });
        setMessage({ type: '', text: '' });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const url = editingUser
                ? `/api/auth/users/${editingUser.id}`
                : '/api/auth/register';

            const method = editingUser ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Failed to operation');

            setMessage({ type: 'success', text: `User ${editingUser ? 'updated' : 'created'} successfully!` });

            if (editingUser) {
                // Update local list
                setUsersList(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...data.user } : u));
                handleCancelEdit(); // Reset form
            } else {
                setFormData({ username: '', email: '', password: '' });
                // If created, we should re-fetch or add to list. 
                // Since create doesn't return the full user object with ID usually, re-fetching is safer or just rely on useEffect dependency to message? 
                // My useEffect depends on [message], so it will re-fetch.
            }
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-serif text-gray-800">Team Management</h1>
                    <p className="text-gray-500 mt-2 text-sm uppercase tracking-wider">Create and Manage Dashboard Access</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Create/Edit User Form - Super Admin Only */}
                {currentUser?.role === 'super_admin' ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-serif text-gray-800">{editingUser ? 'Edit Member' : 'Add New Member'}</h2>
                            {editingUser && (
                                <button onClick={handleCancelEdit} className="text-sm text-gray-500 hover:text-gray-800 underline">
                                    Cancel
                                </button>
                            )}
                        </div>

                        {message.text && (
                            <div className={`mb-6 p-4 rounded-lg flex items-center ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                                <span className="material-icons-outlined mr-2">
                                    {message.type === 'success' ? 'check_circle' : 'error'}
                                </span>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium text-gray-700"
                                    placeholder="e.g. johndoe"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium text-gray-700"
                                    placeholder="e.g. john@gemsmuse.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Password {editingUser && <span className="text-[10px] font-normal lowercase">(Leave blank to keep current)</span>}</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium text-gray-700"
                                    placeholder="••••••••"
                                    required={!editingUser}
                                    minLength={6}
                                />
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gray-900 text-white py-4 px-8 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-amber-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                >
                                    {loading ? (editingUser ? 'Updating...' : 'Creating...') : (editingUser ? 'Update Account' : 'Create Account')}
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-8 flex items-center justify-center text-amber-800">
                        <span className="material-icons-outlined mr-2">lock</span>
                        <span>Only Super Admins can add new users.</span>
                    </div>
                )}

                {/* User List Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-xl font-serif mb-6 text-gray-800">Current Members</h2>

                    <div className="space-y-4">
                        {usersList.length === 0 ? (
                            <p className="text-gray-400 text-sm">No other users found.</p>
                        ) : (
                            usersList.map((u) => (
                                <div key={u.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 group hover:border-amber-200 transition-colors">
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-sm ${u.role === 'super_admin' ? 'bg-gradient-to-tr from-amber-600 to-amber-800' : 'bg-gray-400'}`}>
                                            {u.username.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800 text-sm">{u.username} {currentUser?.id === u.id && '(You)'}</p>
                                            <p className="text-xs text-gray-400 uppercase tracking-wider">{u.role === 'super_admin' ? 'Super Admin' : 'Admin'}</p>
                                        </div>
                                    </div>

                                    {currentUser?.role === 'super_admin' && u.id !== currentUser?.id && (
                                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                                            <button
                                                onClick={() => handleEditUser(u)}
                                                className="p-2 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-full transition-all"
                                                title="Edit User"
                                            >
                                                <span className="material-icons-outlined">edit</span>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(u.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                                title="Delete User"
                                            >
                                                <span className="material-icons-outlined">delete_outline</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>

                    {currentUser?.role !== 'super_admin' && (
                        <p className="mt-6 text-xs text-gray-400 text-center italic">
                            Only Super Admins can manage team members.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
