import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Landing from './components/auth/Landing';
import CodeEntry from './components/auth/CodeEntry';
import GovernmentDashboard from './components/dashboards/GovernmentDashboard';
import CitizenDashboard from './components/dashboards/CitizenDashboard';
import InstitutionDashboard from './components/dashboards/InstitutionDashboard';
import CollegeDashboard from './components/dashboards/CollegeDashboard';
import OtherDashboard from './components/dashboards/OtherDashboard';
import './styles/global.css';

function ProtectedRoute({ children, requiredRole }) {
    const { isAuthenticated, role } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (requiredRole && role !== requiredRole) {
        return <Navigate to={`/dashboard/${role}`} replace />;
    }

    return children;
}

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/code-entry" element={<CodeEntry />} />

            <Route
                path="/dashboard/government"
                element={
                    <ProtectedRoute requiredRole="government">
                        <GovernmentDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/dashboard/citizen"
                element={
                    <ProtectedRoute requiredRole="citizen">
                        <CitizenDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/dashboard/institution"
                element={
                    <ProtectedRoute requiredRole="institution">
                        <InstitutionDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/dashboard/college"
                element={
                    <ProtectedRoute requiredRole="college">
                        <CollegeDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/dashboard/other"
                element={
                    <ProtectedRoute requiredRole="other">
                        <OtherDashboard />
                    </ProtectedRoute>
                }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </AuthProvider>
    );
}
