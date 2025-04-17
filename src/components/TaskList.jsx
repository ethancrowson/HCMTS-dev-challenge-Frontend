import React, { useEffect, useState } from 'react';
import { getAllTasks } from '../services/TaskService';
import { Link } from 'react-router-dom';
import StatusColour from './StatusColour';
import '../styles/CardStyles.css';

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
        <div className="container">
            <div className="header">
                <h1>Task List</h1>
                <Link to="/create">
                    <button>Create Task</button>
                </Link>
            </div>
            <div className="task-grid">
                {tasks.map(task => (
                    <div key={task.id} className="card">
                        <h2>{task.title}</h2>
                        <p>{task.description}</p>
                        <p>Due: {task.dueDate}</p>
                        <div className="status-space">
                            <StatusColour status={task.status}/>
                        </div>
                        <Link to={`/task/${task.id}`}>
                            <button>View Details</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TaskList;