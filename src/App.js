import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskDetails from "./components/TaskDetails";
import CreateTask from "./components/CreateTask";
import "./styles/CardStyles.css";

function App() {
    return (
        <Router>
            <div className="container">
                <Routes>
                    <Route path="/" element={<TaskList />} />
                    <Route path="/task/:id" element={<TaskDetails />} />
                    <Route path="/create" element={<CreateTask />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;