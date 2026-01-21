import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import SelectOrganizationType from "./pages/SelectOrganizationType/SelectOrganizationType";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import VerifyOtp from "./pages/Auth/VerifyOtp";
import SetPassword from "./pages/Auth/SetPassword";

// route guards
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

import NotFound from "./pages/NotFound/NotFound";
import DashboardRedirect from "./pages/Dashboard/DashboardRedirect";
import DashboardShell from "./pages/Dashboard/DashboardShell";

import ActivitiesTab from "./pages/Dashboard/tabs/Activities/ActivitiesTab";
import ProgressTab from "./pages/Dashboard/tabs/Progress/ProgressTab";
import HeatmapTab from "./pages/Dashboard/tabs/Heatmap/HeatmapTab";
import LeaderboardTab from "./pages/Dashboard/tabs/Leaderboard/LeaderboardTab";
import AnalyticsTab from "./pages/Dashboard/tabs/Analytics/AnalyticsTab";
import RewardsTab from "./pages/Dashboard/tabs/Rewards/RewardsTab";
import CertificatesTab from "./pages/Dashboard/tabs/Certificates/CertificatesTab";
import OverviewTab from "./pages/Dashboard/tabs/Overview/OverviewTab";
import QRScannerPage from "./pages/Scanner/QRScannerPage";
import ReportsTab from "./pages/Dashboard/tabs/Reports/ReportsTab";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import SettingsPage from "./pages/Dashboard/tabs/Settings/SettingsPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import api from './services/apiClient'
import { loginSuccess, logout } from "./features/auth/authSlice";
// temporary dashboard placeholder
const Dashboard = () => <h1>Dashboard</h1>;

export default function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const bootstrapAuth = async () => {
            try {
                const res = await api.get("/auth/user-info");
                dispatch(loginSuccess(res.data.data));
            } catch {
                dispatch(logout());
            }
        };

        bootstrapAuth();
    }, []);
    return (
        <BrowserRouter>
            <Routes>
                {/* AUTH ROUTES (blocked when logged in) */}
                <Route
                    path="/"
                    element={
                        <PublicRoute>
                            <LandingPage />
                        </PublicRoute>
                    } />
                <Route
                    path="/select-organization"
                    element={
                        <PublicRoute>
                            <SelectOrganizationType />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/auth/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/auth/signup"
                    element={
                        <PublicRoute>
                            <Signup />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/auth/forgot-password"
                    element={
                        <PublicRoute>
                            <ForgotPassword />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/auth/verify-otp"
                    element={
                        <PublicRoute>
                            <VerifyOtp />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/auth/set-password"
                    element={
                        <PublicRoute>
                            <SetPassword />
                        </PublicRoute>
                    }
                />

                {/* PROTECTED ROUTES */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardRedirect />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/product-details/:product_id"
                    element={
                        <ProductDetails />
                    }
                />
                {/* DASHBOARD PAGES (we’ll fill these next) */}
                <Route path="/scan/:product_id" element={
                    <ProtectedRoute>
                        <QRScannerPage />
                    </ProtectedRoute>
                } />
                <Route
                    path="/dashboard/:role/*"
                    element={
                        <ProtectedRoute>
                            <DashboardShell />
                        </ProtectedRoute>
                    }
                >
                    <Route path="activities" element={<ActivitiesTab />} />
                    <Route path="progress" element={<ProgressTab />} />
                    <Route path="heatmap" element={<HeatmapTab />} />
                    <Route path="leaderboard" element={<LeaderboardTab />} />
                    <Route path="analytics" element={<AnalyticsTab />} />
                    <Route path="rewards" element={<RewardsTab />} />
                    <Route path="certificates" element={<CertificatesTab />} />
                    <Route path="overview" element={<OverviewTab />} />
                    <Route path="reports" element={<ReportsTab />} />
                    <Route path="settings" element={<SettingsPage />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
