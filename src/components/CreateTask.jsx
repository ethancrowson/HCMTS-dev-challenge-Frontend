import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createTask } from '../services/TaskService';
import "../styles/CardStyles.css";

export default function CreateTask() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('PENDING');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleCreate = async (e) => {
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
        <div className="card">
            <h2>Create Task</h2>
            <div className="input-group">
                <label>Title:</label>
                <input value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="input-group">
                <label>Description:</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className="input-group">
                <label>Due Date:</label>
                <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
            </div>
            <button onClick={handleCreate}>Create</button>
        </div>
    );
}