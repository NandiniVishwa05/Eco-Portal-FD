import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Landing.css';

const ROLE_DATA = {
    government: { name: 'State Green Dept', admin: 'S. Gupta' },
    citizen: { name: 'Chrish Cardoza', age: 21, aadhaar: 'XXXXXXXXXXXX' },
    institution: { name: 'DELL College', admin: 'Dr. A. Rao', reg: 'INST-00123' },
    college: { name: 'SHREE College', admin: 'Prof. S. Patel', reg: 'COL-00456' },
    other: { name: 'Neighborhood Green Collective', contact: 'contact@green.org' }
};

export default function Landing() {
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState(null);

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        navigate('/code-entry', { state: { role } });
    };

    return (
        <div className="wrap landing-centered">
            <section className="card fade landing-card">
                <div className="landing-header">
                    <div className="landing-brand">
                        <div className="landing-icon">🌱</div>
                        <div className="landing-text">
                            <h1 className="landing-title">EcoPortal</h1>
                            <div className="landing-subtitle">Track CO₂ savings, leaderboards, rewards & live hotspots</div>
                        </div>
                    </div>
                </div>

                <h2 className="role-heading">Select your role</h2>

                <div className="role-row">
                    {Object.keys(ROLE_DATA).map((role) => (
                        <div key={role} className="role" onClick={() => handleRoleSelect(role)}>
                            <div>
                                <div className="role-title">{role.charAt(0).toUpperCase() + role.slice(1)}</div>
                                <div className="role-caption">Click to continue</div>
                            </div>
                            <div className="role-arrow">→</div>
                        </div>
                    ))}
                </div>

                <div className="landing-tip">
                    Tip: Use Government → Analytics → Live Activity Map to see heatmap. Use 'Load real dataset' for sample hotspot data.
                </div>
            </section>
        </div>
    );
}
