import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import CreateTask from './components/CreateTask';  // Import the CreateTask component

function App() {
    return (
        <Router>
            <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
                <h1>Task Manager</h1>

                {/* Main Menu with Links */}
                <nav style={{ marginBottom: '20px' }}>
                    <Link to="/create" style={{ marginRight: '10px' }}>Create New Task</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<TaskList />} />
                    <Route path="/create" element={<CreateTask />} />
                    <Route path="/tasks/:id" element={<TaskDetails />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;