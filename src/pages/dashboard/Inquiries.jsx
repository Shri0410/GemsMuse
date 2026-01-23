import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const Inquiries = () => {
    const [inquiries, setInquiries] = useState([]);
    const { token } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const res = await fetch('/api/inquiries', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (Array.isArray(data)) {
                setInquiries(data);
            } else {
                setInquiries([]);
            }
        } catch (error) {
            console.error('Error fetching inquiries:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this inquiry?")) return;

        try {
            const res = await fetch(`/api/inquiries/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                setInquiries(prev => prev.filter(item => item.id !== id));
            } else {
                console.error("Failed to delete inquiry");
            }
        } catch (error) {
            console.error("Error deleting inquiry:", error);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) return <div className="p-8 text-center">Loading inquiries...</div>;

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8 animate-slide-up">
                <div>
                    <h2 className="text-3xl font-serif text-gray-800">Inquiries</h2>
                    <p className="text-gray-500 mt-1">Manage customer product inquiries</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-fade-in delay-100">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Items Interested</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 bg-white">
                            {inquiries.map((inquiry, index) => {
                                let items = [];
                                try {
                                    items = typeof inquiry.items === 'string' ? JSON.parse(inquiry.items) : inquiry.items;
                                } catch (e) { items = []; }

                                return (
                                    <tr
                                        key={inquiry.id}
                                        className="hover:bg-amber-50/30 transition-colors duration-200"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(inquiry.created_at)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-semibold text-gray-900">{inquiry.customer_name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex flex-col">
                                                <span>{inquiry.customer_email}</span>
                                                <span className="text-xs text-gray-400">{inquiry.customer_phone || 'N/A'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            <div className="max-w-xs overflow-hidden">
                                                {items.map((item, i) => (
                                                    <div key={i} className="truncate">
                                                        • {item.name} <span className="text-xs text-gray-400">(Qty: {item.quantity})</span>
                                                    </div>
                                                ))}
                                                {items.length === 0 && <span className="text-gray-400 italic">No items details</span>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${inquiry.status === 'new' ? 'bg-green-100 text-green-800' :
                                                    inquiry.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-gray-100 text-gray-800'}`}>
                                                {inquiry.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleDelete(inquiry.id)}
                                                className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50"
                                                title="Delete Inquiry"
                                            >
                                                <span className="material-icons-outlined text-lg">delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            {inquiries.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                                        No inquiries found yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Inquiries;
