import React, { useEffect, useState } from 'react';
import { getAllTasks } from '../services/TaskService';
import { Link } from 'react-router-dom';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchTasks() {
            try {
                const data = await getAllTasks();
                setTasks(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchTasks();
    }, []);

    if (loading) return <p>Loading tasks…</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Task List</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id} style={{ marginBottom: '1rem' }}>
                        <Link to={`/tasks/${task.id}`}>{task.title}</Link>
                        <p><strong>Description:</strong> {task.description || 'No description'}</p>
                        <p><strong>Status:</strong> {task.status}</p>
                        <p><strong>Due Date:</strong> {task.dueDate || 'None'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;