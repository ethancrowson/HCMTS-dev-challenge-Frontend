import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createTask } from '../services/TaskService';

export default function CreateTask() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('PENDING');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); setSuccess('');
        if (!title.trim()) {
            setError('Title is required');
            return;
        }

        try {
            const newTask = { title, description, dueDate, status };
            await createTask(newTask);
            setSuccess('Task created successfully!');
            // after a short delay go back to list
            setTimeout(() => navigate('/'), 1000);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Create New Task</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:<br/>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>Description:<br/>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>Due Date:<br/>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={e => setDueDate(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>Status:<br/>
                        <select
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                        >
                            <option value="PENDING">PENDING</option>
                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                            <option value="COMPLETED">COMPLETED</option>
                            <option value="ON_HOLD">ON_HOLD</option>
                            <option value="CANCELLED">CANCELLED</option>
                        </select>
                    </label>
                </div>
                <button type="submit" style={{ marginTop: '10px' }}>
                    Create Task
                </button>
            </form>
            <div style={{ marginTop: '20px' }}>
                <Link to="/">← Back to Task List</Link>
            </div>
        </div>
    );
}