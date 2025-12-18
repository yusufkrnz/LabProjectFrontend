import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import LandingPage from "./app/LandingPage";
import Login from "./app/Login";
import Dashboard from "./app/Dashboard/Dashboard";
import Onboarding from "./app/Onboarding";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Discover from "./app/Discover/Discover";
import UserProfile from "./app/UserProfile/UserProfile";
import Inbox from "./app/Inbox/Inbox";
import Settings from "./app/Settings/Settings";

function App() {
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
                    <Route
                        path="/discover"
                        element={<Discover />}
                    />
                    <Route
                        path="/profile"
                        element={<UserProfile />}
                    />
                    <Route
                        path="/userprofile"
                        element={<UserProfile />}
                    />
                    <Route
                        path="/inbox"
                        element={<Inbox />}
                    />
                    <Route
                        path="/settings"
                        element={<Settings />}
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

                    {/* Root path -> dashboard'a yönlendir (ProtectedRoute kontrol edecek) */}
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />

                    {/* Herhangi başka bir route -> login'e yönlendir */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
