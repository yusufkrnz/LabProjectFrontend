import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import LandingPage from "./app/LandingPage";
import Login from "./app/Login";
import Dashboard from "./app/Dashboard/Dashboard";
import Onboarding from "./app/Onboarding";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Discover from "./app/Discover/Discover";
import Feed from "./app/Feed/Feed";
import UserProfile from "./app/UserProfile/UserProfile";
import Inbox from "./app/Inbox/Inbox";
import Settings from "./app/Settings/Settings";
import MarketPlace from "./app/MarketPlace/MarketPlace";
import MarketplaceDetails from "./app/MarketPlace/MarketplaceDetails/MarketplaceDetails";
import ManageFinance from "./app/ManageFinance/ManageFinance";
import Messages from "./app/Messages/Messages";
import Project from "./app/Project/Project";
import MyProjects from "./app/MyProjects/MyProject";
import ProjectDetails from "./app/MyProjects/components/ProjectDetails";
import Listing from "./app/Listings/Listing";
import JoinProject from "./app/JoinProject/JoinProject";


function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Login Sayfası */}
                    <Route path="/login" element={<Login />} />



                    {/* Dashboard - Protected Routes */}
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/discover" element={<ProtectedRoute><Discover /></ProtectedRoute>} />
                    <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
                    <Route path="/inbox" element={<ProtectedRoute><Inbox /></ProtectedRoute>} />
                    <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                    <Route path="/marketplace" element={<ProtectedRoute><MarketPlace /></ProtectedRoute>} />
                    <Route path="/marketplace/:id/details" element={<ProtectedRoute><MarketplaceDetails /></ProtectedRoute>} />
                    <Route path="/manage-finance" element={<ProtectedRoute><ManageFinance /></ProtectedRoute>} />
                    <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
                    <Route path="/project" element={<ProtectedRoute><Project /></ProtectedRoute>} />
                    <Route path="/my-projects" element={<ProtectedRoute><MyProjects /></ProtectedRoute>} />
                    <Route path="/project/:id" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
                    <Route path="/listing" element={<ProtectedRoute><Listing /></ProtectedRoute>} />
                    <Route path="/join-project" element={<ProtectedRoute><JoinProject /></ProtectedRoute>} />

                    <Route
                        path="/onboarding"
                        element={
                            <ProtectedRoute>
                                <Onboarding />
                            </ProtectedRoute>
                        }
                    />

                    {/* Landing Page as Default Root */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/landingpage" element={<Navigate to="/" replace />} />

                    {/* Catch-all redirects to Landing Page instead of Login */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
