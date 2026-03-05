import React from 'react';
import { CheckCircle, Circle, Trash2, Edit2, Calendar } from 'lucide-react';

const TaskItem = ({ task, onToggleStatus, onDelete, onEdit }) => {
    const isCompleted = task.status === 'Completed';

    return (
        <div className={`task-card ${isCompleted ? 'bg-primary-50/50' : 'bg-white'}`}>
            <div className="flex items-start gap-4">
                <button
                    onClick={() => onToggleStatus(task)}
                    className={`mt-1 transition-colors ${isCompleted ? 'text-primary-600' : 'text-secondary-400 hover:text-primary-500'}`}
                >
                    {isCompleted ? <CheckCircle size={24} /> : <Circle size={24} />}
                </button>

                <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-lg truncate ${isCompleted ? 'line-through text-secondary-400' : 'text-secondary-900'}`}>
                        {task.title}
                    </h3>
                    <p className="text-secondary-600 mt-1 line-clamp-2">{task.description}</p>

                    <div className="flex items-center gap-4 mt-4 text-xs text-secondary-400">
                        <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full font-medium ${isCompleted ? 'bg-primary-100 text-primary-700' : 'bg-secondary-100 text-secondary-700'
                            }`}>
                            {task.status}
                        </span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(task)}
                        className="p-2 text-secondary-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                        title="Edit Task"
                    >
                        <Edit2 size={18} />
                    </button>
                    <button
                        onClick={() => onDelete(task._id)}
                        className="p-2 text-secondary-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete Task"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
