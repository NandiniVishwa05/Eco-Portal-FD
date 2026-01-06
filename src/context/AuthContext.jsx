import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        // Check for existing session in localStorage
        const roles = ['government', 'citizen', 'institution', 'college', 'other'];
        for (const r of roles) {
            const session = localStorage.getItem(`eco_session_${r}`);
            if (session) {
                try {
                    const data = JSON.parse(session);
                    setRole(data.role);
                    setUser(data.name);
                    break;
                } catch (e) {
                    console.error('Failed to parse session', e);
                }
            }
        }
    }, []);

    const login = (roleType, userData) => {
        setRole(roleType);
        setUser(userData);
        localStorage.setItem(`eco_session_${roleType}`, JSON.stringify({ role: roleType, name: userData }));
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
        setRole(null);
    };

    const value = {
        user,
        role,
        login,
        logout,
        isAuthenticated: !!user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
