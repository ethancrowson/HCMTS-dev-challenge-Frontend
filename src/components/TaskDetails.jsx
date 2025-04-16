import React, { useEffect, useState } from 'react';
import { getTaskById } from '../services/taskService';

function TaskDetails({ taskId }) {
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchTask() {
            try {
                const data = await getTaskById(taskId);
                setTask(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchTask();
    }, [taskId]);

    if (loading) return <p>Loading task details…</p>;
    if (error) return <p>Error: {error}</p>;
    if (!task) return <p>No task found.</p>;

    return (
        <div>
            <h2>Task Details</h2>
            <p><strong>Title:</strong> {task.title}</p>
            <p><strong>Description:</strong> {task.description || 'No description'}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <p><strong>Due Date:</strong> {task.dueDate || 'None'}</p>
        </div>
    );
}

export default TaskDetails;