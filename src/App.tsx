import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import LandingPage from "./app/LandingPage";
import Login from "./app/Login";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
    return (
        <AuthProvider>
        <Router>
            <Routes>
                {/* Login Sayfası */}
                <Route path="/login" element={<Login />} />

                {/* Landing Page */}
                <Route path="/landingpage" element={<LandingPage />} />

                {/* Herhangi başka bir route -> login'e yönlendir */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
        </AuthProvider>
    );
}

export default App;
