import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const JournalForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        author: '',
        category: '',
        read_time: '',
        content: []
    });
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditMode) {
            fetchJournal();
        }
    }, [id]);

    const fetchJournal = async () => {
        try {
            const res = await fetch(`/api/journals/${id}`);
            if (!res.ok) throw new Error('Failed to fetch journal');
            const data = await res.json();

            // Parse content if it's a string, otherwise use as is
            let parsedContent = [];
            if (typeof data.content === 'string') {
                try {
                    parsedContent = JSON.parse(data.content);
                } catch (e) {
                    console.error('Error parsing content JSON:', e);
                    parsedContent = [];
                }
            } else {
                parsedContent = data.content || [];
            }

            setFormData({
                title: data.title,
                excerpt: data.excerpt,
                author: data.author,
                category: data.category,
                read_time: data.read_time,
                content: parsedContent
            });
            if (data.image_url) {
                setPreviewImage(`/${data.image_url}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    // Block Editor Logic
    const addBlock = (type) => {
        setFormData(prev => ({
            ...prev,
            content: [...prev.content, { type, text: '', url: '', caption: '' }]
        }));
    };

    const updateBlock = (index, field, value) => {
        const newContent = [...formData.content];
        newContent[index][field] = value;
        setFormData(prev => ({ ...prev, content: newContent }));
    };

    const removeBlock = (index) => {
        setFormData(prev => ({
            ...prev,
            content: prev.content.filter((_, i) => i !== index)
        }));
    };

    const moveBlock = (index, direction) => {
        const newContent = [...formData.content];
        if (direction === 'up' && index > 0) {
            [newContent[index], newContent[index - 1]] = [newContent[index - 1], newContent[index]];
        } else if (direction === 'down' && index < newContent.length - 1) {
            [newContent[index], newContent[index + 1]] = [newContent[index + 1], newContent[index]];
        }
        setFormData(prev => ({ ...prev, content: newContent }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('excerpt', formData.excerpt);
            data.append('author', formData.author);
            data.append('category', formData.category);
            data.append('read_time', formData.read_time);
            data.append('content', JSON.stringify(formData.content));

            if (imageFile) {
                data.append('image', imageFile);
            }

            const url = isEditMode ? `/api/journals/${id}` : '/api/journals';
            const method = isEditMode ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: data
            });

            if (!res.ok) throw new Error('Failed to saving journal');

            navigate('/dashboard/journals');
        } catch (error) {
            console.error('Error saving journal:', error);
            alert('Failed to save journal');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto pb-20">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-serif text-gray-800">{isEditMode ? 'Edit Journal' : 'New Journal'}</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
                {/* Meta Information */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt (Short Summary)</label>
                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                        >
                            <option value="">Select Category</option>
                            <option value="Style Guide">Style Guide</option>
                            <option value="Craftsmanship">Craftsmanship</option>
                            <option value="Care Guide">Care Guide</option>
                            <option value="Trends">Trends</option>
                            <option value="News">News</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Read Time</label>
                        <input
                            type="text"
                            name="read_time"
                            placeholder="e.g. 5 min read"
                            value={formData.read_time}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                        />
                        {previewImage && (
                            <div className="mt-2 h-32 w-full bg-gray-100 rounded overflow-hidden">
                                <img src={previewImage} alt="Preview" className="h-full w-full object-cover" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Editor */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-800">Content Editor</h3>
                        <div className="flex gap-2">
                            <button type="button" onClick={() => addBlock('paragraph')} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-xs rounded">+ Paragraph</button>
                            <button type="button" onClick={() => addBlock('heading')} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-xs rounded">+ Heading</button>
                            <button type="button" onClick={() => addBlock('quote')} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-xs rounded">+ Quote</button>
                            <button type="button" onClick={() => addBlock('image')} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-xs rounded">+ Image URL</button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {formData.content.length === 0 && (
                            <p className="text-center text-gray-400 py-8 border-2 border-dashed border-gray-100 rounded-lg">
                                Empty content. Add blocks to start writing.
                            </p>
                        )}
                        {formData.content.map((block, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 group relative">
                                <div className="absolute right-2 top-2 flex gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <button type="button" onClick={() => moveBlock(index, 'up')} disabled={index === 0} className="p-1 hover:text-amber-600 disabled:opacity-30">↑</button>
                                    <button type="button" onClick={() => moveBlock(index, 'down')} disabled={index === formData.content.length - 1} className="p-1 hover:text-amber-600 disabled:opacity-30">↓</button>
                                    <button type="button" onClick={() => removeBlock(index)} className="p-1 hover:text-red-600 ml-2">×</button>
                                </div>
                                <div className="pr-16">
                                    <span className="text-xs font-mono uppercase text-gray-400 mb-1 block">{block.type}</span>

                                    {block.type === 'paragraph' && (
                                        <textarea
                                            value={block.text}
                                            onChange={(e) => updateBlock(index, 'text', e.target.value)}
                                            rows="3"
                                            className="w-full bg-white px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-amber-500"
                                            placeholder="Write paragraph text..."
                                        />
                                    )}
                                    {block.type === 'heading' && (
                                        <input
                                            type="text"
                                            value={block.text}
                                            onChange={(e) => updateBlock(index, 'text', e.target.value)}
                                            className="w-full bg-white px-3 py-2 border border-gray-300 rounded font-bold text-lg focus:ring-1 focus:ring-amber-500"
                                            placeholder="Heading Text"
                                        />
                                    )}
                                    {block.type === 'quote' && (
                                        <textarea
                                            value={block.text}
                                            onChange={(e) => updateBlock(index, 'text', e.target.value)}
                                            rows="2"
                                            className="w-full bg-white px-3 py-2 border border-gray-300 rounded italic focus:ring-1 focus:ring-amber-500 border-l-4 border-amber-500"
                                            placeholder="Quote text..."
                                        />
                                    )}
                                    {block.type === 'image' && (
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                value={block.url}
                                                onChange={(e) => updateBlock(index, 'url', e.target.value)}
                                                className="w-full bg-white px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-amber-500"
                                                placeholder="Image URL"
                                            />
                                            <input
                                                type="text"
                                                value={block.caption}
                                                onChange={(e) => updateBlock(index, 'caption', e.target.value)}
                                                className="w-full bg-white px-3 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-amber-500"
                                                placeholder="Image Caption (optional)"
                                            />
                                            {block.url && (
                                                <img src={block.url} alt="Preview" className="h-32 object-cover rounded bg-gray-200" />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/dashboard/journals')}
                        className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-luxury disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Saving...' : (isEditMode ? 'Update Journal' : 'Publish Journal')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default JournalForm;
