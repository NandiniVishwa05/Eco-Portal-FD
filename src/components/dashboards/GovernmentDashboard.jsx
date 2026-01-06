import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { citizenRewards, institutionRewards, collegeRewards, otherRewards, RewardsTable } from '../../data/rewards.jsx';
import { getAllActivities } from '../../data/activities';
import './Dashboard.css';

export default function GovernmentDashboard() {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const [activeTab, setActiveTab] = useState('gov_overview');
    const [activities] = useState(getAllActivities());

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleHome = () => {
        navigate('/');
    };

    const exportCSV = () => {
        const rows = [['Id', 'User', 'Type', 'Category', 'EcoPoints', 'CO2', 'Status', 'Date']];
        activities.forEach(a => rows.push([a.id, a.user, a.type, a.category, a.ep, a.co2, a.status, a.date]));
        const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'eco_activities.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    // Calculate leaderboard
    const leaderboard = {};
    activities.forEach(a => {
        const name = a.user || a.type;
        if (!leaderboard[name]) leaderboard[name] = { points: 0, co2: 0 };
        leaderboard[name].points += a.ep || 0;
        leaderboard[name].co2 += Number(a.co2) || 0;
    });
    const leaderboardArray = Object.keys(leaderboard)
        .map(k => ({ name: k, points: leaderboard[k].points, co2: leaderboard[k].co2 }))
        .sort((a, b) => b.points - a.points)
        .slice(0, 10);

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
                        <h2 style={{ margin: 0 }}>🏛 Government Dashboard</h2>
                        <div className="small">Analytics · Activities · Leaderboards · Hotspots · Rewards</div>
                    </div>
                </div>

                <div className="profile">
                    <div className="avatar">🏛</div>
                    <div className="meta">
                        <h3>{user?.name || 'State Green Dept'}</h3>
                        <p className="small">Logged in as: StateGreenAdmin · Role: Verifier</p>
                    </div>
                </div>

                <div className="metrics">
                    <div className="metric">
                        <div className="label">Total CO₂ Saved</div>
                        <div className="value">12,480 kg</div>
                    </div>
                    <div className="metric">
                        <div className="label">Participants</div>
                        <div className="value">5,820</div>
                    </div>
                    <div className="metric">
                        <div className="label">Registered Institutions</div>
                        <div className="value">112</div>
                    </div>
                </div>

                <div className="top-tabs" style={{ marginTop: '12px' }}>
                    {[
                        { key: 'gov_overview', label: 'Overview' },
                        { key: 'gov_activities', label: 'Activities' },
                        { key: 'gov_leaderboard', label: 'Leaderboard' },
                        { key: 'gov_analytics', label: 'Analytics' },
                        { key: 'gov_heatmap', label: 'Heatmap' },
                        { key: 'gov_rewards', label: 'Rewards' }
                    ].map(tab => (
                        <div
                            key={tab.key}
                            className={`tab ${activeTab === tab.key ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.key)}
                        >
                            {tab.label}
                        </div>
                    ))}
                </div>

                {/* OVERVIEW TAB */}
                {activeTab === 'gov_overview' && (
                    <div className="tabpanel" style={{ marginTop: '12px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '12px' }}>
                            <div>
                                <h4>Category Trends</h4>
                                <div className="card-table chart" style={{ height: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    📊 Category trends chart coming soon
                                </div>
                                <div className="kicker">Colors correspond to activity categories — clearer legend in activities.</div>
                            </div>
                            <div>
                                <h4>Hotspot Snapshot</h4>
                                <div className="card-table map" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    🗺️ Map visualization coming soon
                                </div>
                                <div className="legend small" style={{ marginTop: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <div style={{ width: '18px', height: '12px', borderRadius: '4px', background: '#bff0d6', border: '1px solid rgba(6,40,30,0.06)' }}></div>
                                    <div className="small">Low</div>
                                    <div style={{ width: '18px', height: '12px', borderRadius: '4px', background: '#f39c12', border: '1px solid rgba(6,40,30,0.06)' }}></div>
                                    <div className="small">Medium</div>
                                    <div style={{ width: '18px', height: '12px', borderRadius: '4px', background: '#c0392b', border: '1px solid rgba(6,40,30,0.06)' }}></div>
                                    <div className="small">High</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ACTIVITIES TAB */}
                {activeTab === 'gov_activities' && (
                    <div className="tabpanel" style={{ marginTop: '12px' }}>
                        <div className="panel-head">
                            <h3>Submitted Activities</h3>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button className="btn" onClick={exportCSV}>Export CSV</button>
                                <button className="btn ghost">Print</button>
                            </div>
                        </div>
                        <div className="card-table" style={{ marginTop: '8px' }}>
                            <div className="kicker">
                                <strong>Examples:</strong> Paper collection drives, Campus tree plantation (group), Energy-saving LED swap program, Reuse workshops.
                            </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>User</th>
                                        <th>Type</th>
                                        <th>Category</th>
                                        <th>EcoPoints</th>
                                        <th>CO₂</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activities.slice(0, 20).map((activity, index) => (
                                        <tr key={index}>
                                            <td>{activity.id}</td>
                                            <td>{activity.user}</td>
                                            <td>{activity.type}</td>
                                            <td>{activity.category}</td>
                                            <td>{activity.ep}</td>
                                            <td>{activity.co2} kg</td>
                                            <td className={activity.status === 'Approved' ? 'status-approved' : ''}>
                                                {activity.status}
                                            </td>
                                            <td>{activity.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* LEADERBOARD TAB */}
                {activeTab === 'gov_leaderboard' && (
                    <div className="tabpanel" style={{ marginTop: '12px' }}>
                        <h3>Leaderboard</h3>
                        <div className="card-table">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>EcoPoints</th>
                                        <th>CO₂ Saved</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaderboardArray.map((entry, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{entry.name}</td>
                                            <td>{entry.name.includes('College') ? 'Institution' : 'Community'}</td>
                                            <td>{entry.points}</td>
                                            <td>{entry.co2.toFixed(1)} kg</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* ANALYTICS TAB */}
                {activeTab === 'gov_analytics' && (
                    <div className="tabpanel" style={{ marginTop: '12px' }}>
                        <h3>Analytics</h3>
                        <div className="card-table chart" style={{ height: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            📈 Weekly CO₂ trends chart coming soon
                        </div>
                    </div>
                )}

                {/* HEATMAP TAB */}
                {activeTab === 'gov_heatmap' && (
                    <div className="tabpanel" style={{ marginTop: '12px' }}>
                        <h3>Live Heatmap</h3>
                        <div className="card-table map" style={{ height: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            🔥 Live activity heatmap coming soon
                        </div>
                        <div className="kicker">Zoom into wards or institutions with highest activity density.</div>
                    </div>
                )}

                {/* REWARDS TAB */}
                {activeTab === 'gov_rewards' && (
                    <div className="tabpanel" style={{ marginTop: '12px' }}>
                        <h3>All Rewards (Combined)</h3>
                        <div className="kicker">
                            This panel includes Rewards for Retailers (Small Stores), Citizens, Institutions, Colleges and Others — combined for government oversight.
                        </div>

                        <RewardsTable rewards={citizenRewards} title="Citizen Rewards" />
                        <RewardsTable rewards={institutionRewards} title="Institution Rewards (Corporates, NGOs, Private Firms)" />
                        <RewardsTable rewards={collegeRewards} title="College / University Rewards" />
                        <RewardsTable rewards={otherRewards} title='Rewards for "Others" (Municipalities, Communities, NGOs, Local Groups)' />
                    </div>
                )}
            </article>
        </div>
    );
}
