import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const TaskForm = ({ onSubmit, initialData, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'Pending'
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                description: initialData.description || '',
                status: initialData.status || 'Pending'
            });
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim()) {
            setError('Title is required');
            return;
        }
        onSubmit(formData);
        setFormData({ title: '', description: '', status: 'Pending' });
        setError('');
    };

    return (
        <div className="fixed inset-0 bg-secondary-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                <div className="px-6 py-4 border-b border-secondary-100 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-secondary-900">
                        {initialData ? 'Edit Task' : 'Add New Task'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-secondary-50 rounded-full text-secondary-400">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-secondary-700 mb-1">Title *</label>
                        <input
                            type="text"
                            className={`input-field ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
                            placeholder="What needs to be done?"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-secondary-700 mb-1">Description</label>
                        <textarea
                            className="input-field min-h-[100px] resize-none"
                            placeholder="Add some details..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-secondary-700 mb-1">Status</label>
                        <select
                            className="input-field"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button type="button" onClick={onClose} className="btn-secondary flex-1">
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary flex-1">
                            {initialData ? 'Update Task' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;
