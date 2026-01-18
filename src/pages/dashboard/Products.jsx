import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Products = () => {
    const [products, setProducts] = useState([]);
    const { token } = useAuth();
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            if (Array.isArray(data)) {
                setProducts(data);
            } else {
                console.error('Failed to fetch products:', data);
                setProducts([]);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await fetch(`/api/products/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8 animate-slide-up">
                <div>
                    <h2 className="text-3xl font-serif text-gray-800">Products</h2>
                    <p className="text-gray-500 mt-1">Manage your jewelry inventory</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200 flex">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded ${viewMode === 'list' ? 'bg-amber-100 text-amber-600' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-amber-100 text-amber-600' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                        </button>
                    </div>
                    <Link to="/dashboard/products/new" className="btn-luxury flex items-center gap-2">
                        <span>+ Add Product</span>
                    </Link>
                </div>
            </div>

            {viewMode === 'list' ? (
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-fade-in delay-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Collection</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Specs</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 bg-white">
                                {products.map((product, index) => (
                                    <tr
                                        key={product.id}
                                        className="hover:bg-amber-50/30 transition-colors duration-200"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                                                    {product.main_image ? (
                                                        <img src={`/${product.main_image}`} alt={product.name} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <div className="h-full w-full flex items-center justify-center text-gray-300 text-xs">No Img</div>
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-semibold text-gray-900 font-serif">{product.name}</div>
                                                    <div className="text-xs text-gray-500 font-mono">{product.sku}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-50 text-blue-800">
                                                {product.collection_name || 'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {product.product_type}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-y-1">
                                            <div className="text-xs"><span className="font-semibold">Metal:</span> {product.metal_type} {product.metal_purity}</div>
                                            <div className="text-xs"><span className="font-semibold">W:</span> {product.metal_weight}g</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link to={`/dashboard/products/${product.id}`} className="text-amber-600 hover:text-amber-900 mr-4 font-semibold hover:underline">Edit</Link>
                                            <button onClick={() => handleDelete(product.id)} className="text-gray-400 hover:text-red-600 transition-colors">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in delay-100">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group">
                            <div className="relative h-48 bg-gray-100 overflow-hidden">
                                {product.main_image ? (
                                    <img src={`/${product.main_image}`} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>
                                )}
                                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link to={`/dashboard/products/${product.id}`} className="bg-white/90 p-2 rounded-full shadow-lg text-amber-600 hover:bg-amber-600 hover:text-white transition-all block mb-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                    </Link>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-serif font-bold text-gray-900 truncate">{product.name}</h3>
                                <p className="text-xs text-gray-500 font-mono mb-2">{product.sku}</p>
                                <div className="flex justify-between items-end mt-4">
                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{product.metal_type}</span>
                                    <button onClick={() => handleDelete(product.id)} className="text-xs text-red-400 hover:text-red-600">Remove</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;
