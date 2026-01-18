import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const FeaturedCollections = () => {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();

    // Form State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        subtitle: '',
        description: ''
    });
    const [file, setFile] = useState(null);
    const [formLoading, setFormLoading] = useState(false);

    useEffect(() => {
        fetchCollections();
    }, []);

    const fetchCollections = async () => {
        try {
            const res = await fetch('/api/collections');
            const data = await res.json();
            if (Array.isArray(data)) setCollections(data);
        } catch (error) {
            console.error('Error fetching collections:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const openModal = (collection = null) => {
        if (collection) {
            setEditingId(collection.id);
            setFormData({
                name: collection.name,
                subtitle: collection.subtitle || '',
                description: collection.description || ''
            });
        } else {
            setEditingId(null);
            setFormData({ name: '', subtitle: '', description: '' });
        }
        setFile(null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ name: '', subtitle: '', description: '' });
        setFile(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('subtitle', formData.subtitle);
        data.append('description', formData.description);
        if (file) {
            data.append('image', file);
        }

        // If creating new from here, we could auto-feature it, but let's stick to standard create
        // and let user click 'Add' to be explicit, or maybe auto-feature?
        // Let's auto-feature if creating from this specific page? 
        // The user said "add also myself... display only the home page our collections". 
        // It implies if added here, it should probably be for the home page.
        // But for now, let's just create it and let them toggle it, to be safe and simple.

        try {
            const url = editingId ? `/api/collections/${editingId}` : '/api/collections';
            const method = editingId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: { 'Authorization': `Bearer ${token}` },
                body: data
            });

            if (res.ok) {
                const result = await res.json();

                // If it was a new creation, let's optionally auto-feature it if the API supports it in one go (it doesn't yet).
                // Or we can simple chain the feature call if it's new.
                if (!editingId) {
                    // Auto-feature the new collection for convenience since we are in the Showcase section
                    const newId = result.id;
                    await fetch(`/api/collections/${newId}/feature`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ is_featured: true })
                    });
                }

                await fetchCollections();
                closeModal();
            } else {
                alert('Operation failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setFormLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this collection?')) return;
        try {
            await fetch(`/api/collections/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchCollections();
        } catch (error) {
            console.error('Error deleting collection:', error);
        }
    };

    const toggleFeatured = async (id, currentStatus) => {
        try {
            const newStatus = !currentStatus;

            // Optimistic update
            setCollections(prev => prev.map(c => c.id === id ? { ...c, is_featured: newStatus } : c));

            const res = await fetch(`/api/collections/${id}/feature`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ is_featured: newStatus })
            });

            if (!res.ok) {
                fetchCollections(); // Revert
                alert('Failed to update status');
            }
        } catch (error) {
            console.error(error);
            fetchCollections();
        }
    };

    const featuredCollections = collections.filter(c => c.is_featured);
    const availableCollections = collections.filter(c => !c.is_featured);

    return (
        <div className="max-w-7xl mx-auto animate-fade-in relative">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-serif text-gray-800">Home Showcase Management</h2>
                    <p className="text-gray-500 mt-1">Manage and curate collections for the Home Page.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="btn-luxury flex items-center gap-2"
                >
                    <span className="material-icons-outlined">add</span>
                    create Collection
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Active Showcase */}
                <div className="bg-white rounded-xl shadow-lg border border-amber-100 overflow-hidden flex flex-col h-full">
                    <div className="bg-gradient-to-r from-amber-50 to-white px-6 py-4 border-b border-amber-100 flex justify-between items-center bg-opacity-50">
                        <h3 className="font-serif text-xl text-amber-800 flex items-center gap-2">
                            <span className="material-icons-outlined text-amber-600">star</span>
                            Active on Home Page ({featuredCollections.length})
                        </h3>
                    </div>
                    <div className="p-6 flex-1 overflow-y-auto max-h-[600px] min-h-[300px]">
                        {featuredCollections.length === 0 ? (
                            <div className="text-center text-gray-400 py-12 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/50">
                                No collections currently featured.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {featuredCollections.map(collection => (
                                    <div key={collection.id} className="relative p-4 bg-white border border-amber-200 rounded-lg shadow-sm hover:shadow-md transition-all group">
                                        <div className="flex items-start gap-4">
                                            <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
                                                {collection.image_url ? (
                                                    <img src={`/${collection.image_url}`} alt={collection.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-gray-800 text-lg truncate">{collection.name}</h4>
                                                <p className="text-xs text-amber-600 font-bold uppercase tracking-wider mb-1">{collection.subtitle}</p>
                                                <p className="text-xs text-gray-500 line-clamp-2">{collection.description}</p>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-1 rounded-full shadow-sm">
                                            <button onClick={() => openModal(collection)} className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 hover:text-blue-600" title="Edit">
                                                <span className="material-icons-outlined text-sm">edit</span>
                                            </button>
                                            <button onClick={() => handleDelete(collection.id)} className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 hover:text-red-600" title="Delete">
                                                <span className="material-icons-outlined text-sm">delete</span>
                                            </button>
                                        </div>

                                        <div className="mt-3 flex justify-end border-t border-gray-100 pt-2">
                                            <button
                                                onClick={() => toggleFeatured(collection.id, true)}
                                                className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-1 rounded transition-colors flex items-center gap-1 uppercase tracking-wide"
                                            >
                                                <span className="material-icons-outlined text-sm">remove_circle_outline</span>
                                                Remove from Home
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Available Collections */}
                <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col h-full">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                        <h3 className="font-serif text-xl text-gray-700">Available Collections</h3>
                    </div>
                    <div className="p-6 flex-1 overflow-y-auto max-h-[600px] min-h-[300px]">
                        {availableCollections.length === 0 ? (
                            <div className="text-center text-gray-400 py-12">
                                All collections are currently featured!
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {availableCollections.map(collection => (
                                    <div key={collection.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-sm transition-all text-sm group">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="w-10 h-10 rounded bg-gray-200 overflow-hidden flex-shrink-0">
                                                {collection.image_url && <img src={`/${collection.image_url}`} alt="" className="w-full h-full object-cover" />}
                                            </div>
                                            <div className="truncate">
                                                <span className="font-medium text-gray-700 block truncate">{collection.name}</span>
                                                <span className="text-[10px] text-gray-400 block truncate">{collection.subtitle}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity mr-2">
                                                <button onClick={() => openModal(collection)} className="text-gray-400 hover:text-blue-500"><span className="material-icons-outlined text-sm">edit</span></button>
                                                <button onClick={() => handleDelete(collection.id)} className="text-gray-400 hover:text-red-500"><span className="material-icons-outlined text-sm">delete</span></button>
                                            </div>
                                            <button
                                                onClick={() => toggleFeatured(collection.id, false)}
                                                className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200 transition-colors text-xs font-bold uppercase tracking-wide whitespace-nowrap"
                                            >
                                                + Add
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-slide-up">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="font-serif text-xl text-gray-800">{editingId ? 'Edit Collection' : 'Create New Collection'}</h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                                <span className="material-icons-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Title</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="input-luxury"
                                    placeholder="e.g. Summer Brilliance"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Subtitle</label>
                                <input
                                    type="text"
                                    name="subtitle"
                                    value={formData.subtitle}
                                    onChange={handleInputChange}
                                    className="input-luxury"
                                    placeholder="e.g. Exclusive Radiant Cuts"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="input-luxury"
                                    placeholder="Collection description..."
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Cover Image</label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                                />
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={closeModal} className="btn-luxury-outline">Cancel</button>
                                <button type="submit" disabled={formLoading} className="btn-luxury">
                                    {formLoading ? 'Saving...' : (editingId ? 'Update' : 'Create & Feature')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeaturedCollections;
