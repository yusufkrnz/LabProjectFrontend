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
                    <Route
                        path="/marketplace"
                        element={<MarketPlace />}
                    />
                    <Route
                        path="/marketplace/:id/details"
                        element={<MarketplaceDetails />}
                    />
                    <Route
                        path="/manage-finance"
                        element={<ManageFinance />}
                    />
                    <Route
                        path="/messages"
                        element={<Messages />}
                    />
                    <Route
                        path="/project"
                        element={<Project />}
                    />
                    <Route
                        path="/my-projects"
                        element={<MyProjects />}
                    />
                    <Route
                        path="/project/:id"
                        element={<ProjectDetails />}
                    />
                    <Route
                        path="/listing"
                        element={<Listing />}
                    />
                    <Route
                        path="/join-project"
                        element={<JoinProject />}
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
