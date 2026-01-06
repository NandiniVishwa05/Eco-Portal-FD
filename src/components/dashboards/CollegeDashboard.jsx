import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { collegeRewards, RewardsTable } from '../../data/rewards.jsx';
import './Dashboard.css';

export default function CollegeDashboard() {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const [activeTab, setActiveTab] = useState('col_overview');

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleHome = () => {
        navigate('/');
    };

    const departmentData = [
        { dept: 'Commerce', ep: 2350, co2: '0.6 t' },
        { dept: 'IT', ep: 1870, co2: '0.5 t' },
        { dept: 'Science', ep: 1650, co2: '0.4 t' },
        { dept: 'Arts', ep: 1420, co2: '0.3 t' },
        { dept: 'Management', ep: 980, co2: '0.2 t' }
    ];

    return (
        <div className="wrap">
            <div className="header fade">
                <div className="brand">
                    <div className="logo">🌱</div>
                    <div>
                        <div className="title">EcoPortal — Premium</div>
                        <div className="subtitle">Offline Scanner • Online Maps • Rewards</div>
                    </div>
                </div>
                <div className="top-actions">
                    <button className="btn ghost" onClick={handleHome}>Home</button>
                    <button className="btn logout" onClick={handleLogout}>Logout</button>
                </div>
            </div>

            <article className="card fade">
                <div className="panel-head">
                    <div>
                        <h2 style={{ margin: 0 }}>🏫 College Dashboard</h2>
                        <div className="small">College-level controls · NAAC exports · Rewards</div>
                    </div>
                </div>

                <div className="profile">
                    <div className="avatar">🎓</div>
                    <div className="meta">
                        <h3>{user?.name || 'SHREE College'}</h3>
                        <p className="small">Admin: {user?.admin || 'Prof. S. Patel'} · Reg ID: {user?.reg || 'COL-00456'}</p>
                    </div>
                </div>

                <div className="top-tabs" style={{ marginTop: '12px' }}>
                    <div
                        className={`tab ${activeTab === 'col_overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('col_overview')}
                    >
                        Overview
                    </div>
                    <div
                        className={`tab ${activeTab === 'col_approve' ? 'active' : ''}`}
                        onClick={() => setActiveTab('col_approve')}
                    >
                        Approve
                    </div>
                    <div
                        className={`tab ${activeTab === 'col_map' ? 'active' : ''}`}
                        onClick={() => setActiveTab('col_map')}
                    >
                        Heatmap
                    </div>
                    <div
                        className={`tab ${activeTab === 'col_rewards' ? 'active' : ''}`}
                        onClick={() => setActiveTab('col_rewards')}
                    >
                        Rewards
                    </div>
                </div>

                {/* OVERVIEW TAB */}
                {activeTab === 'col_overview' && (
                    <div className="tabpanel" style={{ marginTop: '12px' }}>
                        <h3>Top Departments</h3>
                        <div className="card-table">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Dept</th>
                                        <th>EP</th>
                                        <th>CO₂</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {departmentData.map((dept, index) => (
                                        <tr key={index}>
                                            <td>{dept.dept}</td>
                                            <td>{dept.ep}</td>
                                            <td>{dept.co2}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* APPROVE TAB */}
                {activeTab === 'col_approve' && (
                    <div className="tabpanel" style={{ marginTop: '12px' }}>
                        <h3>Approve Student Activities</h3>
                        <div className="small">Scanner to verify and approve student submissions.</div>
                        <div className="scanner" style={{ marginTop: '12px' }}>
                            <div className="small">Scanner not active</div>
                            <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                                <button className="btn">Open Scanner</button>
                                <button className="btn ghost">Stop</button>
                                <div className="small">Last: —</div>
                            </div>
                            <div style={{ marginTop: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <label className="btn ghost" style={{ cursor: 'pointer' }}>
                                    Upload QR image
                                    <input type="file" accept="image/*" style={{ display: 'none' }} />
                                </label>
                                <button className="btn ghost">Open Camera (capture)</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* HEATMAP TAB */}
                {activeTab === 'col_map' && (
                    <div className="tabpanel" style={{ marginTop: '12px' }}>
                        <h3>College Hotspots</h3>
                        <div className="card-table map" style={{ height: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            🗺️ College campus heatmap coming soon
                        </div>
                    </div>
                )}

                {/* REWARDS TAB */}
                {activeTab === 'col_rewards' && (
                    <div className="tabpanel" style={{ marginTop: '12px' }}>
                        <RewardsTable rewards={collegeRewards} title="Rewards for Colleges / Universities" />
                    </div>
                )}

                {/* QR SCANNER SECTION */}
                <div style={{ marginTop: '12px' }}>
                    <div className="scanner">
                        <div className="small">College verification scanner</div>
                        <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                            <button className="btn">Open Scanner</button>
                            <button className="btn ghost">Stop</button>
                            <div className="small">Last: —</div>
                        </div>
                        <div style={{ marginTop: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <label className="btn ghost" style={{ cursor: 'pointer' }}>
                                Upload QR image
                                <input type="file" accept="image/*" style={{ display: 'none' }} />
                            </label>
                            <button className="btn ghost">Open Camera (capture)</button>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}
