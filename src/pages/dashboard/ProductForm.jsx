import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProductForm = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams(); // Get ID from URL
    const isEditMode = Boolean(id);

    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        collection_id: '',
        sku: '',
        product_type: '',
        set_name: '',
        name: '',
        metal_type: 'Gold',
        metal_purity: '18K',
        metal_color: 'Yellow',
        metal_weight: '',
        gem_stones: '',
        center_stone_weight: '',
        gem_stones_weight: '',
        total_stone_weight: '',
        total_diamond_weight: '',
        size: '',
        description: ''
    });

    const [files, setFiles] = useState([]);
    const [existingMedia, setExistingMedia] = useState([]);

    useEffect(() => {
        // Fetch Collections for dropdown
        const fetchCollections = async () => {
            try {
                const res = await fetch('/api/collections');
                const data = await res.json();
                if (Array.isArray(data)) setCollections(data);
            } catch (err) { console.error(err); }
        };
        fetchCollections();

        // If Edit Mode, Fetch Product Details
        if (isEditMode) {
            const fetchProduct = async () => {
                try {
                    const res = await fetch(`/api/products/${id}`);
                    if (!res.ok) throw new Error('Failed to fetch product');
                    const data = await res.json();

                    // Populate form
                    setFormData({
                        collection_id: data.collection_id || '',
                        sku: data.sku || '',
                        product_type: data.product_type || '',
                        set_name: data.set_name || '',
                        name: data.name || '',
                        metal_type: data.metal_type || 'Gold',
                        metal_purity: data.metal_purity || '18K',
                        metal_color: data.metal_color || 'Yellow',
                        metal_weight: data.metal_weight || '',
                        gem_stones: data.gem_stones || '',
                        center_stone_weight: data.center_stone_weight || '',
                        gem_stones_weight: data.gem_stones_weight || '',
                        total_stone_weight: data.total_stone_weight || '',
                        total_diamond_weight: data.total_diamond_weight || '',
                        size: data.size || '',
                        description: data.description || ''
                    });
                    if (data.media) setExistingMedia(data.media);
                } catch (error) {
                    console.error(error);
                    alert('Could not load product details');
                }
            };
            fetchProduct();
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (formData[key] !== null && formData[key] !== undefined) {
                data.append(key, formData[key]);
            }
        });

        for (let i = 0; i < files.length; i++) {
            data.append('media', files[i]);
        }

        try {
            const url = isEditMode ? `/api/products/${id}` : '/api/products';
            const method = isEditMode ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: data
            });

            if (res.ok) {
                navigate('/dashboard/products');
            } else {
                const errorData = await res.json();
                alert('Error: ' + (errorData.error || errorData.message));
            }
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto animate-fade-in pb-10">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <button onClick={() => navigate('/dashboard/products')} className="text-sm text-gray-500 hover:text-amber-600 mb-2 flex items-center">
                        ← Back to Products
                    </button>
                    <h2 className="text-3xl font-serif text-gray-800">{isEditMode ? 'Edit Product' : 'Add New Product'}</h2>
                    <p className="text-gray-500">Enter the details for your masterpiece.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Panel 1: Basic Info */}
                <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-6 border-b pb-2">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Collection</label>
                            <select name="collection_id" value={formData.collection_id} onChange={handleChange} className="input-luxury">
                                <option value="">Select Collection</option>
                                {collections.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Style No / SKU</label>
                            <input type="text" name="sku" value={formData.sku} onChange={handleChange} className="input-luxury" required />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Product Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-luxury text-lg" placeholder="e.g. The Royal Sapphire Ring" required />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Type (Ring, etc.)</label>
                            <input type="text" name="product_type" value={formData.product_type} onChange={handleChange} className="input-luxury" />
                        </div>
                    </div>
                </div>

                {/* Panel 2: Material Specifications */}
                <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-6 border-b pb-2">Material Specifications</h3>

                    {/* Metal */}
                    <div className="mb-6">
                        <h4 className="text-sm font-medium text-amber-600 mb-3 uppercase tracking-widest">Metal Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Metal Type</label>
                                <select name="metal_type" value={formData.metal_type} onChange={handleChange} className="input-luxury">
                                    <option value="Gold">Gold</option>
                                    <option value="Silver">Silver</option>
                                    <option value="Platinum">Platinum</option>
                                    <option value="Stainless Steel">Stainless Steel</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Purity</label>
                                <input type="text" name="metal_purity" value={formData.metal_purity} onChange={handleChange} placeholder="18K" className="input-luxury" />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Color</label>
                                <select name="metal_color" value={formData.metal_color} onChange={handleChange} className="input-luxury">
                                    <option value="Yellow">Yellow</option>
                                    <option value="White">White</option>
                                    <option value="Rose">Rose</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Weight (g)</label>
                                <input type="number" step="0.01" name="metal_weight" value={formData.metal_weight} onChange={handleChange} className="input-luxury" />
                            </div>
                        </div>
                    </div>

                    {/* Stones */}
                    <div>
                        <h4 className="text-sm font-medium text-amber-600 mb-3 uppercase tracking-widest">Stone Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="md:col-span-4">
                                <label className="block text-xs text-gray-500 mb-1">Gem Stones Description</label>
                                <input type="text" name="gem_stones" value={formData.gem_stones} onChange={handleChange} className="input-luxury" />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Center Stone (Cts)</label>
                                <input type="number" step="0.01" name="center_stone_weight" value={formData.center_stone_weight} onChange={handleChange} className="input-luxury" />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Total Stone (Cts)</label>
                                <input type="number" step="0.01" name="total_stone_weight" value={formData.total_stone_weight} onChange={handleChange} className="input-luxury" />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Total Diamond (Cts)</label>
                                <input type="number" step="0.01" name="total_diamond_weight" value={formData.total_diamond_weight} onChange={handleChange} className="input-luxury" />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Size / Dimensions</label>
                                <input type="text" name="size" value={formData.size} onChange={handleChange} placeholder="Ring size..." className="input-luxury" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Panel 3: Media & Description */}
                <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-6 border-b pb-2">Visuals & Story</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows="6" className="input-luxury" placeholder="Tell the story of this piece..."></textarea>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Gallery Upload</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-amber-400 transition-colors bg-gray-50">
                                <div className="space-y-1 text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                        <label htmlFor="mediaUpload" className="relative cursor-pointer bg-white rounded-md font-medium text-amber-600 hover:text-amber-500">
                                            <span>Upload files</span>
                                            <input id="mediaUpload" type="file" multiple onChange={handleFileChange} accept="image/*,video/*" className="sr-only" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">Video or Images (Multiple)</p>
                                </div>
                            </div>

                            {/* Existing Media Preview */}
                            {existingMedia.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-xs font-bold text-gray-500 uppercase mb-2">Existing Gallery</p>
                                    <div className="flex flex-wrap gap-2">
                                        {existingMedia.map(m => (
                                            <div key={m.id} className="relative w-16 h-16 border rounded-lg overflow-hidden shadow-sm hover:ring-2 hover:ring-amber-500 transition-all">
                                                {m.media_type === 'image' ? (
                                                    <img src={`/${m.url}`} alt="Product" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="bg-gray-100 w-full h-full flex items-center justify-center text-[8px] uppercase font-bold text-gray-400">Video</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 sticky bottom-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-2xl border border-gray-200">
                    <button type="button" onClick={() => navigate('/dashboard/products')} className="btn-luxury-outline">Cancel</button>
                    <button type="submit" disabled={loading} className="btn-luxury">
                        {loading ? 'Saving...' : (isEditMode ? 'Update Masterpiece' : 'Create Masterpiece')}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default ProductForm;
