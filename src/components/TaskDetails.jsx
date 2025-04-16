import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const BASE_URL = 'http://localhost:8080/tasks';

function TaskDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [newStatus, setNewStatus] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        fetch(`${BASE_URL}/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch task");
                }
                return response.json();
            })
            .then(data => {
                setTask(data);
                setNewStatus(data.status); // initialize dropdown value
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    const handleDelete = () => {
        fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to delete task");
                }
                setSuccessMessage("Task deleted successfully!");
                setTimeout(() => {
                    setSuccessMessage("");
                    navigate('/');  // Redirecting to the main task list page after a task is deleted
                }, 2000);
            })
            .catch(err => {
                console.error("Failed to delete task", err);
                setError("Failed to delete task. Please try again.");
            });
    };

    const handleUpdateStatus = () => {
        fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newStatus)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to update status");
                }
                return response.json();
            })
            .then(updatedTask => {
                setTask(updatedTask);
                setSuccessMessage("Status updated successfully!");
                setTimeout(() => setSuccessMessage(""), 2000);
            })
            .catch(err => {
                console.error("Failed to update task status", err);
            });
    };

    if (loading) return <p>Loading task...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!task) return <p>Task not found.</p>;

    return (
        <div>
            <h2>{task.title}</h2>
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Due Date:</strong> {task.dueDate}</p>

            <p><strong>Status:</strong>
                <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    style={{marginLeft: '10px'}}
                >
                    <option value="PENDING">PENDING</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="ON_HOLD">ON_HOLD</option>
                    <option value="CANCELLED">CANCELLED</option>
                </select>
            </p>

            <button onClick={handleDelete} style={{ marginRight: '10px' }}>Delete Task</button>
            <button onClick={handleUpdateStatus}>Update Status</button>

            {successMessage && (
                <p style={{ color: "green", marginTop: "10px" }}>{successMessage}</p>
            )}

            <div style={{ marginTop: '20px' }}>
                <Link to="/">← Back to Task List</Link>
            </div>
        </div>
    );
}

export default TaskDetails;
