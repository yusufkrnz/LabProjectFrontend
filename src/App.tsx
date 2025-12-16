import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import LandingPage from "./app/LandingPage";
import Login from "./app/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Discover from "./app/Discover/Discover";
import UserProfile from "./app/UserProfile/UserProfile";
import Settings from "./app/Settings/Settings";
import Dashboard from "./app/Dashboard/Dashboard";
import Onboarding from "./app/Onboarding/Onboarding";
import Marketplace from "./app/Marketplace";

function App() {
    console.log("DEBUG: App Component Rendered");
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Login Sayfası */}
                    <Route path="/login" element={<Login />} />

                    {/* Landing Page */}
                    <Route path="/landingpage" element={<LandingPage />} />

                    {/* Dashboard - Protected Route */}
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    {/* Discover Page */}
                    <Route
                        path="/discover"
                        element={<Discover />}
                    />

                    {/* User Profile Page */}
                    <Route
                        path="/userprofile"
                        element={<UserProfile />}
                    />

                    {/* Settings Page */}
                    <Route
                        path="/settings"
                        element={<Settings />}
                    />

                    {/* Marketplace Page */}
                    <Route
                        path="/marketplace"
                        element={<Marketplace />}
                    />

                    {/* Onboarding - Protected Route */}
                    <Route
                        path="/onboarding"
                        element={
                            <ProtectedRoute>
                                <Onboarding />
                            </ProtectedRoute>
                        }
                    />

                    {/* Root path -> dashboard'a yönlendir */}
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />

                    {/* Herhangi başka bir route -> login'e yönlendir */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
