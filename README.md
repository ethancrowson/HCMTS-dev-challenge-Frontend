# Task Manager Frontend

This is the frontend part of the Task Manager application, built using React. It allows caseworkers to create, view, update, and delete tasks through a user-friendly interface. The frontend communicates with the backend API to manage tasks.

## 📚 Features

- View all tasks
- Create a new task
- Update task status
- Delete a task
- 
## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed

### Setup Instructions

1. Clone this repository:
```
git clone https://github.com/your-username/task-manager-frontend.git
cd task-manager-frontend
```

2. Install the dependencies:
```
npm install
```
3. Start the development server:
```
npm start
```
The application will be available at http://localhost:3000.

## API Integration
The frontend communicates with the backend API hosted at http://localhost:8080/api/tasks for all task-related operations (CRUD).

### API Documentation (for the frontend)
This section describes the tasks and operations available to the frontend application.

Task Operations
GET /tasks – Fetches a list of all tasks.

POST /tasks/create – Creates a new task.

GET /tasks/:id – Fetches a task by ID.

PUT /tasks/:id – Updates the status of a task.

DELETE /tasks/:id – Deletes a task.
