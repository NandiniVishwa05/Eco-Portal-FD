import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { otherRewards, RewardsTable } from '../../data/rewards.jsx';
import './Dashboard.css';

export default function OtherDashboard() {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const [activeTab, setActiveTab] = useState('oth_overview');

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleHome = () => {
        navigate('/');
    };

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
                        <h2 style={{ margin: 0 }}>🔎 Other Dashboard</h2>
                        <div className="small">NGO / Community group · Rewards</div>
                    </div>
                </div>

                <div className="profile">
                    <div className="avatar">🌐</div>
                    <div className="meta">
                        <h3>{user?.name || 'Neighborhood Green Collective'}</h3>
                        <p className="small">Contact: {user?.contact || 'contact@green.org'} · City: Mumbai</p>
                    </div>
                </div>

                <div className="top-tabs" style={{ marginTop: '12px' }}>
                    <div
                        className={`tab ${activeTab === 'oth_overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('oth_overview')}
                    >
                        Overview
                    </div>
                    <div
                        className={`tab ${activeTab === 'oth_map' ? 'active' : ''}`}
                        onClick={() => setActiveTab('oth_map')}
                    >
                        Hotspots
                    </div>
                    <div
                        className={`tab ${activeTab === 'oth_rewards' ? 'active' : ''}`}
                        onClick={() => setActiveTab('oth_rewards')}
                    >
                        Rewards
                    </div>
                </div>

                {/* OVERVIEW TAB */}
                {activeTab === 'oth_overview' && (
                    <div className="tabpanel" style={{ marginTop: '8px' }}>
                        <h3>Community Overview</h3>
                        <div className="card-table">
                            <div className="small">
                                <p><strong>Organization Type:</strong> NGO / Community Group</p>
                                <p><strong>Focus Areas:</strong> Local sustainability, community engagement, awareness campaigns</p>
                                <p><strong>Active Projects:</strong></p>
                                <ul>
                                    <li>Neighborhood composting initiative</li>
                                    <li>Community solar panel installation</li>
                                    <li>Plastic-free market days</li>
                                    <li>Tree plantation drives</li>
                                </ul>
                                <p><strong>Contact Information:</strong></p>
                                <ul>
                                    <li>Email: contact@green.org</li>
                                    <li>Location: Mumbai, Maharashtra</li>
                                    <li>Members: 450+ active volunteers</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* HOTSPOTS TAB */}
                {activeTab === 'oth_map' && (
                    <div className="tabpanel" style={{ marginTop: '12px' }}>
                        <h3>Community Hotspots</h3>
                        <div className="card-table map" style={{ height: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            🗺️ Community activity heatmap coming soon
                        </div>
                        <div className="kicker" style={{ marginTop: '8px' }}>
                            Track community-driven sustainability activities across neighborhoods
                        </div>
                    </div>
                )}

                {/* REWARDS TAB */}
                {activeTab === 'oth_rewards' && (
                    <div className="tabpanel" style={{ marginTop: '12px' }}>
                        <RewardsTable
                            rewards={otherRewards}
                            title='Rewards for "Others" (Municipalities, Communities, NGOs, Local Groups)'
                        />
                    </div>
                )}

                {/* QR SCANNER SECTION */}
                <div style={{ marginTop: '12px' }}>
                    <div className="scanner">
                        <div className="small">Community verification scanner</div>
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
