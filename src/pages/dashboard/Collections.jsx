import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const Collections = () => {
    const [collections, setCollections] = useState([]);
    const [name, setName] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const { token, logout } = useAuth();
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false); // Collapsible Form

    useEffect(() => {
        fetchCollections();
    }, []);

    const fetchCollections = async () => {
        try {
            const res = await fetch('/api/collections');
            const data = await res.json();

            if (Array.isArray(data)) {
                setCollections(data);
            } else {
                console.error('Failed to fetch collections:', data);
                setCollections([]);
            }
        } catch (error) {
            console.error('Error fetching collections:', error);
            setCollections([]);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleEdit = (collection) => {
        setEditingId(collection.id);
        setName(collection.name);
        setSubtitle(collection.subtitle || '');
        setDescription(collection.description || '');
        setFile(null);
        setIsFormVisible(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setName('');
        setSubtitle('');
        setDescription('');
        setFile(null);
        if (document.getElementById('fileInput')) document.getElementById('fileInput').value = '';
        setIsFormVisible(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('subtitle', subtitle);
        formData.append('description', description);
        if (file) {
            formData.append('image', file);
        }

        try {
            const url = editingId ? `/api/collections/${editingId}` : '/api/collections';
            const method = editingId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (res.ok) {
                handleCancelEdit();
                fetchCollections();
            } else {
                if (res.status === 401 || res.status === 403) {
                    alert('Session expired. Logging you out...');
                    logout();
                    return;
                } else {
                    const errorText = await res.text();
                    try {
                        const errorJson = JSON.parse(errorText);
                        console.error(errorJson);
                        alert(errorJson.message || 'Failed to save collection.');
                    } catch (e) {
                        console.error('Server Response:', errorText);
                        alert('Server error: ' + (errorText || res.statusText));
                    }
                }
            }
        } catch (error) {
            console.error('Error saving collection:', error);
            if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
                alert('Network Error: Cannot reach backend server. Please ensure it is running on port 5000.');
            }
        } finally {
            setLoading(false);
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

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8 animate-slide-up">
                <div>
                    <h2 className="text-3xl font-serif text-gray-800">Collections</h2>
                    <p className="text-gray-500 mt-1">Manage your curated jewelry categories</p>
                </div>
                <button
                    onClick={() => { setIsFormVisible(!isFormVisible); if (editingId) handleCancelEdit(); }}
                    className={`btn-luxury ${isFormVisible && !editingId ? 'bg-gray-800' : ''}`}
                >
                    {isFormVisible && !editingId ? 'Close Form' : '+ Add Collection'}
                </button>
            </div>

            {/* Add/Edit Collection Form */}
            <div className={`transition-all duration-500 overflow-hidden ${isFormVisible ? 'max-h-[800px] opacity-100 mb-8' : 'max-h-0 opacity-0'}`}>
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-700">
                            {editingId ? 'Edit Collection' : 'Create New Collection'}
                        </h3>
                        {editingId && (
                            <button onClick={handleCancelEdit} className="text-sm text-gray-500 hover:text-gray-700 underline">
                                Cancel Edit
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Collection Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="input-luxury"
                                    placeholder="e.g. Royal Heritage"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Subtitle</label>
                                <input
                                    type="text"
                                    value={subtitle}
                                    onChange={(e) => setSubtitle(e.target.value)}
                                    className="input-luxury"
                                    placeholder="e.g. Inspired by Japanese Artistry"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="input-luxury"
                                rows="3"
                                placeholder="Describe the essence of this collection..."
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                {editingId ? 'Update Cover Image (Optional)' : 'Cover Image'}
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-amber-400 transition-colors bg-gray-50">
                                <div className="space-y-1 text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                        <label htmlFor="fileInput" className="relative cursor-pointer bg-white rounded-md font-medium text-amber-600 hover:text-amber-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-amber-500">
                                            <span>Upload a file</span>
                                            <input id="fileInput" type="file" onChange={handleFileChange} accept="image/*" className="sr-only" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">{file ? file.name : 'PNG, JPG, GIF up to 10MB'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="btn-luxury-outline"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-luxury"
                            >
                                {loading ? 'Saving...' : (editingId ? 'Update Collection' : 'Create Collection')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Collections Grid (More Visual than Table) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in delay-100">
                {collections.map((collection, index) => (
                    <div
                        key={collection.id}
                        className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="relative h-48 overflow-hidden bg-gray-100">
                            {collection.image_url ? (
                                <img
                                    src={`/${collection.image_url}`}
                                    alt={collection.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <button onClick={() => handleEdit(collection)} className="p-2 bg-white/90 rounded-full hover:bg-amber-500 hover:text-white transition-colors shadow-lg" title="Edit">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                </button>
                                <button onClick={() => handleDelete(collection.id)} className="p-2 bg-white/90 rounded-full hover:bg-red-500 hover:text-white transition-colors shadow-lg" title="Delete">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                            </div>
                        </div>

                        <div className="p-5 flex-1 flex flex-col">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors font-serif">{collection.name}</h3>
                            <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-3">{collection.subtitle}</p>
                            <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">{collection.description}</p>

                            <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                                <span>ID: #{collection.id}</span>
                                <span>{new Date().toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Empty State Add Button */}
                {collections.length === 0 && (
                    <button
                        onClick={() => setIsFormVisible(true)}
                        className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-gray-400 hover:border-amber-400 hover:text-amber-500 transition-all min-h-[300px]"
                    >
                        <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4v16m8-8H4"></path></svg>
                        <span className="font-medium">Create your first collection</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Collections;
