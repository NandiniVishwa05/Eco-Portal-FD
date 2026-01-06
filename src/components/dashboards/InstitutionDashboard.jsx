import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { institutionRewards, RewardsTable } from '../../data/rewards.jsx';
import { getAllActivities } from '../../data/activities';
import './Dashboard.css';

export default function InstitutionDashboard() {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const [activeTab, setActiveTab] = useState('inst_submissions');
    const [activities, setActivities] = useState(getAllActivities());

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleHome = () => {
        navigate('/');
    };

    const handleApprove = (activityId) => {
        setActivities(prevActivities =>
            prevActivities.map(a =>
                a.id === activityId ? { ...a, status: 'Approved' } : a
            )
        );
        alert(`Activity ${activityId} has been approved!`);
    };

    const institutionActivities = activities.filter(a => a.type === 'Institution').slice(0, 20);

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
                        <h2 style={{ margin: 0 }}>🏢 Institution Dashboard</h2>
                        <div className="small">Approve submissions · Reports · Rewards</div>
                    </div>
                </div>

                <div className="profile">
                    <div className="avatar">🏫</div>
                    <div className="meta">
                        <h3>{user?.name || 'DELL College'}</h3>
                        <p className="small">Admin: {user?.admin || 'Dr. A. Rao'} · Reg ID: {user?.reg || 'INST-00123'}</p>
                    </div>
                </div>

                <div className="top-tabs" style={{ marginTop: '12px' }}>
                    <div
                        className={`tab ${activeTab === 'inst_submissions' ? 'active' : ''}`}
                        onClick={() => setActiveTab('inst_submissions')}
                    >
                        Submissions
                    </div>
                    <div
                        className={`tab ${activeTab === 'inst_progress' ? 'active' : ''}`}
                        onClick={() => setActiveTab('inst_progress')}
                    >
                        Progress
                    </div>
                    <div
                        className={`tab ${activeTab === 'inst_map' ? 'active' : ''}`}
                        onClick={() => setActiveTab('inst_map')}
                    >
                        Heatmap
                    </div>
                    <div
                        className={`tab ${activeTab === 'inst_rewards' ? 'active' : ''}`}
                        onClick={() => setActiveTab('inst_rewards')}
                    >
                        Rewards
                    </div>
                </div>

                {/* SUBMISSIONS TAB */}
                {activeTab === 'inst_submissions' && (
                    <div className="tabpanel" style={{ marginTop: '12px' }}>
                        <h3>Student Submissions</h3>
                        <div className="kicker">
                            <strong>Examples:</strong> Campus collection drives, Dept-level reuse campaign, NSS plantation events.
                        </div>
                        <div className="card-table">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Student</th>
                                        <th>Category</th>
                                        <th>EP</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {institutionActivities.map((activity, index) => (
                                        <tr key={index}>
                                            <td>{activity.id}</td>
                                            <td>{activity.user}</td>
                                            <td>{activity.category}</td>
                                            <td>{activity.ep}</td>
                                            <td className={activity.status === 'Approved' ? 'status-approved' : ''}>
                                                {activity.status}
                                            </td>
                                            <td>{activity.date}</td>
                                            <td>
                                                {activity.status === 'Pending' ? (
                                                    <button className="btn" onClick={() => handleApprove(activity.id)}>
                                                        Approve
                                                    </button>
                                                ) : (
                                                    <button className="btn ghost">View</button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* PROGRESS TAB */}
                {activeTab === 'inst_progress' && (
                    <div className="tabpanel" style={{ marginTop: '12px' }}>
                        <h3>Progress</h3>
                        <div className="card-table chart" style={{ height: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            📊 Weekly EcoPoints progress chart coming soon
                        </div>
                    </div>
                )}

                {/* HEATMAP TAB */}
                {activeTab === 'inst_map' && (
                    <div className="tabpanel" style={{ marginTop: '12px' }}>
                        <h3>Institution Hotspots</h3>
                        <div className="card-table map" style={{ height: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            🗺️ Institution activity heatmap coming soon
                        </div>
                    </div>
                )}

                {/* REWARDS TAB */}
                {activeTab === 'inst_rewards' && (
                    <div className="tabpanel" style={{ marginTop: '12px' }}>
                        <RewardsTable rewards={institutionRewards} title="Rewards for Institutions" />
                    </div>
                )}

                {/* QR SCANNER SECTION */}
                <div style={{ marginTop: '12px' }}>
                    <div className="scanner">
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
            </article>
        </div>
    );
}
