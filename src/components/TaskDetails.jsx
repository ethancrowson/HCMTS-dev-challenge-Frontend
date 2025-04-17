import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import StatusColour from "./StatusColour";
import "../styles/CardStyles.css";

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
        <div className="card">
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Due: {task.dueDate}</p>
            <div className="status-space">
                <StatusColour status={task.status}/>
            </div>
            <div className="input-group">
                <label>Update Status:</label>
                <select value={newStatus} onChange={e => setNewStatus(e.target.value)}>
                    <option value="">Select</option>
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="ON_HOLD">On Hold</option>
                    <option value="CANCELLED">Cancelled</option>
                </select>
            </div>
            <button onClick={handleUpdateStatus}>Update Status</button>
            <button onClick={handleDelete} style={{ backgroundColor: "#dc3545", color: "#fff" }}>Delete</button>
            <Link to="/"><button>Back</button></Link>
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
}

export default TaskDetails;
