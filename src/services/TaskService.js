const BASE_URL = "http://localhost:8080/tasks";

export async function getTasks() {
    const response = await fetch(BASE_URL);
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