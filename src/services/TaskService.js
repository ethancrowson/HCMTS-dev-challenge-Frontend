const BASE_URL = "http://localhost:8080/tasks";

export async function getTasks() {
    const response = await fetch(BASE_URL);
    return response.json();
}