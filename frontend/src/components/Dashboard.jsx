import React, { useState, useEffect } from 'react';
import * as api from '../api/taskApi';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { useAuth } from '../context/AuthContext';
import { Plus, Search, Loader2, ClipboardList, LogOut, User } from 'lucide-react';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const { user, logout } = useAuth();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const { data } = await api.getTasks();
            setTasks(data);
        } catch (err) {
            console.error('Failed to fetch tasks', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateOrUpdate = async (formData) => {
        try {
            if (editingTask) {
                await api.updateTask(editingTask._id, formData);
            } else {
                await api.createTask(formData);
            }
            fetchTasks();
            setShowForm(false);
            setEditingTask(null);
        } catch (err) {
            console.error('Operation failed', err);
        }
    };

    const handleToggleStatus = async (task) => {
        const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
        try {
            await api.updateTask(task._id, { ...task, status: newStatus });
            fetchTasks();
        } catch (err) {
            console.error('Update failed', err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await api.deleteTask(id);
                fetchTasks();
            } catch (err) {
                console.error('Delete failed', err);
            }
        }
    };

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-white">
            <header className="fixed top-0 left-0 right-0 bg-emerald-50 border-b border-emerald-100 z-50">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
                            <ClipboardList size={20} />
                        </div>
                        <span className="text-xl font-bold text-secondary-900 tracking-tight">TaskManager</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 px-3 py-1.5 bg-secondary-50 rounded-full border border-secondary-100">
                            <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm text-primary-600 border border-secondary-100">
                                <User size={16} />
                            </div>
                            <span className="text-sm font-semibold text-secondary-700">{user?.username}</span>
                        </div>
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 text-sm font-bold text-secondary-400 hover:text-red-500 transition-all group"
                        >
                            <span>Logout</span>
                            <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto pt-28 pb-12 px-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-secondary-900 tracking-tight">
                            My <span className="text-primary-600">Tasks</span>
                        </h1>
                        <p className="text-secondary-500 font-medium mt-1">Efficiently manage your daily workflow.</p>
                    </div>

                    <button
                        onClick={() => setShowForm(true)}
                        className="btn-primary flex items-center gap-2 shadow-lg shadow-primary-600/20 px-6 py-3"
                    >
                        <Plus size={20} />
                        <span>Add New Task</span>
                    </button>
                </div>

                <div className="relative mb-8 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search for tasks..."
                        className="input-field pl-12 py-4 bg-white shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-secondary-400">
                        <Loader2 className="animate-spin mb-4" size={40} />
                        <p className="font-medium">Loading your tasks...</p>
                    </div>
                ) : filteredTasks.length > 0 ? (
                    <div className="grid gap-4">
                        {filteredTasks.map(task => (
                            <TaskItem
                                key={task._id}
                                task={task}
                                onToggleStatus={handleToggleStatus}
                                onDelete={handleDelete}
                                onEdit={(t) => {
                                    setEditingTask(t);
                                    setShowForm(true);
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-secondary-50 rounded-2xl border-2 border-dashed border-secondary-200">
                        <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <ClipboardList className="text-secondary-300" size={32} />
                        </div>
                        <p className="text-secondary-500 font-medium">
                            {searchTerm ? "No tasks match your search." : "Your task list is empty. Start by adding one!"}
                        </p>
                    </div>
                )}

                {showForm && (
                    <TaskForm
                        onSubmit={handleCreateOrUpdate}
                        initialData={editingTask}
                        onClose={() => {
                            setShowForm(false);
                            setEditingTask(null);
                        }}
                    />
                )}
            </main>
        </div>
    );
};

export default Dashboard;
