const BASE_URL = "http://localhost:8080/tasks";

export async function getAllTasks() {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }
    return response.json();
}
export async function getTaskById(id) {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error(`Task with id ${id} not found`);
    }
    return response.json();
}
export async function createTask(task) {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    });
    return response.json();
}
export async function updateTaskStatus(id, status) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(status)
    });
    return response.json();
}
export async function deleteTask(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error(`Failed to delete task (status ${response.status})`);
    }
}