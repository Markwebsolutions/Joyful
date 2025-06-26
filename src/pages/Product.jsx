import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });
    const [editingId, setEditingId] = useState(null);
    const navigate = useNavigate();

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:8080/categories', {
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }

            const data = await response.json();
            setCategories(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(newCategory)
            });

            if (!response.ok) {
                throw new Error('Failed to add category');
            }

            const data = await response.json();
            setCategories([...categories, data]);
            setNewCategory({ name: '', description: '' });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdateCategory = async (id) => {
        try {
            const categoryToUpdate = categories.find(c => c.id === id);
            const response = await fetch(`http://localhost:8080/categories/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(categoryToUpdate)
            });

            if (!response.ok) {
                throw new Error('Failed to update category');
            }

            const data = await response.json();
            setCategories(categories.map(cat => cat.id === id ? data : cat));
            setEditingId(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/categories/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to delete category');
            }

            setCategories(categories.filter(cat => cat.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <div className="text-center py-4">Loading categories...</div>;
    }

    if (error) {
        return <div className="text-center py-4 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-4 max-w-4xl pt-60">
            <h1 className="text-2xl font-bold mb-6">Category Management</h1>

            {/* Add Category Form */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">
                    {editingId ? 'Edit Category' : 'Add New Category'}
                </h2>
                <form onSubmit={editingId ? (e) => { e.preventDefault(); handleUpdateCategory(editingId); } : handleAddCategory}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={editingId ? categories.find(c => c.id === editingId)?.name : newCategory.name}
                                onChange={(e) => editingId ?
                                    setCategories(categories.map(cat =>
                                        cat.id === editingId ? { ...cat, name: e.target.value } : cat
                                    )) :
                                    setNewCategory({ ...newCategory, name: e.target.value })
                                }
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={editingId ? categories.find(c => c.id === editingId)?.description : newCategory.description}
                                onChange={(e) => editingId ?
                                    setCategories(categories.map(cat =>
                                        cat.id === editingId ? { ...cat, description: e.target.value } : cat
                                    )) :
                                    setNewCategory({ ...newCategory, description: e.target.value })
                                }
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            {editingId ? 'Update' : 'Add'} Category
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                onClick={() => setEditingId(null)}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Categories Table */}
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-left">ID</th>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Description</th>
                            <th className="py-3 px-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <tr key={category.id} className="border-t hover:bg-gray-50">
                                    <td className="py-3 px-4">{category.id}</td>
                                    <td className="py-3 px-4">{category.name}</td>
                                    <td className="py-3 px-4">{category.description || '-'}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => setEditingId(category.id)}
                                                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteCategory(category.id)}
                                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="py-4 text-center text-gray-500">
                                    No categories found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Categories;