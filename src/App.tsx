import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./app/Dashboard/Dashboard";
import Login from "./app/Login";

function App() {
    return (
        <Router>
            <Routes>
                {/* Login Sayfası */}
                <Route path="/login" element={<Login />} />

                {/* Dashboard Sayfası */}
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Herhangi başka bir route -> login'e yönlendir */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
