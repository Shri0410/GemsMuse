import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const ManageAttributes = () => {
    const { token } = useAuth();
    const [attributes, setAttributes] = useState({ metal_type: [], metal_purity: [], metal_color: [] });
    const [loading, setLoading] = useState(true);
    const [newItem, setNewItem] = useState({ type: 'metal_type', value: '' });

    const fetchAttributes = async () => {
        try {
            const res = await fetch('/api/attributes');
            const data = await res.json();
            setAttributes(data);
        } catch (error) {
            console.error('Error fetching attributes:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttributes();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newItem.value.trim()) return;

        try {
            const res = await fetch('/api/attributes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ attribute_type: newItem.type, value: newItem.value.trim() })
            });

            if (res.ok) {
                setNewItem(prev => ({ ...prev, value: '' }));
                fetchAttributes();
            } else {
                const err = await res.json();
                alert(err.error);
            }
        } catch (error) {
            console.error('Error adding attribute:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this option?')) return;
        try {
            const res = await fetch(`/api/attributes/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchAttributes();
        } catch (error) {
            console.error('Error deleting attribute:', error);
        }
    };

    const AttributeSection = ({ title, type, items }) => (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">{title}</h3>
            <ul className="space-y-2 mb-6 max-h-60 overflow-y-auto no-scrollbar">
                {items?.map(item => (
                    <li key={item.id} className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-md group">
                        <span className="text-sm font-medium text-gray-700">{item.value}</span>
                        <button
                            onClick={() => handleDelete(item.id)}
                            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                        >
                            <span className="material-icons-outlined text-sm">delete</span>
                        </button>
                    </li>
                ))}
                {items?.length === 0 && <li className="text-xs text-gray-400 italic">No options defined.</li>}
            </ul>
            <form onSubmit={(e) => {
                if (newItem.type !== type) {
                    setNewItem({ type, value: newItem.value });
                    // This won't work perfectly due to async state update in same event loop for submit
                    // Implementation below handles it correctly by using local state or separate forms
                }
                // Actually simplified: specific form for this section
                e.preventDefault();
                handleAddSubmit(type, e.target.elements.value.value, e.target);
            }} className="flex gap-2">
                <input
                    type="text"
                    name="value"
                    placeholder={`Add ${title}...`}
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                />
                <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-md transition-colors shadow-sm">
                    <span className="material-icons-outlined text-sm">add</span>
                </button>
            </form>
        </div>
    );

    // Better handler for multiple forms
    const handleAddSubmit = async (type, value, form) => {
        if (!value.trim()) return;
        try {
            const res = await fetch('/api/attributes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ attribute_type: type, value: value.trim() })
            });

            if (res.ok) {
                form.reset();
                fetchAttributes();
            } else {
                const err = await res.json();
                alert(err.error);
            }
        } catch (error) {
            console.error(error);
        }
    }

    if (loading) return <div className="p-10 text-center">Loading attributes...</div>;

    return (
        <div className="max-w-6xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-serif text-gray-800">Manage Attributes</h1>
                <p className="text-gray-500 mt-2">Customize the dropdown options for Metal Type, Purity, and Color.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <AttributeSection title="Metal Types" type="metal_type" items={attributes.metal_type} />
                <AttributeSection title="Metal Purity" type="metal_purity" items={attributes.metal_purity} />
                <AttributeSection title="Metal Colors" type="metal_color" items={attributes.metal_color} />
            </div>
        </div>
    );
};

export default ManageAttributes;
