import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { citizenRewards, RewardsTable } from '../../data/rewards.jsx';
import { getAllActivities } from '../../data/activities';
import './Dashboard.css';

export default function CitizenDashboard() {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const [activeTab, setActiveTab] = useState('cit_submit');
    const [activities] = useState(getAllActivities());

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleHome = () => {
        navigate('/');
    };

    const handleAddActivity = () => {
        const category = document.getElementById('citCategory')?.value || 'Paper';
        const desc = document.getElementById('citDesc')?.value || 'Manual entry';
        const points = parseInt(document.getElementById('citPoints')?.value) || 10;
        const co2 = (points * 0.03).toFixed(2);

        alert(`Activity added!\nCategory: ${category}\nDescription: ${desc}\nEcoPoints: ${points}\nCO₂: ${co2} kg\n\n(This will appear in your history after verification)`);
    };

    const citizenActivities = activities.filter(a => a.type === 'Citizen').slice(0, 20);

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
                        <h2 style={{ margin: 0 }}>👤 Citizen Dashboard</h2>
                        <div className="small">Submit activities, QR verify & rewards</div>
                    </div>
                </div>

                <div className="profile">
                    <div className="avatar">👤</div>
                    <div className="meta">
                        <h3>{user?.name || 'Chrish Cardoza'}</h3>
                        <p className="small">Age: {user?.age || 21} · Aadhaar: {user?.aadhaar || 'XXXXXXXXXXXX'}</p>
                        <div style={{ marginTop: '6px' }}>
                            <span className="badge">Citizen</span>
                        </div>
                    </div>
                </div>

                <div className="metrics">
                    <div className="metric">
                        <div className="label">Your CO₂ Saved</div>
                        <div className="value">34 kg</div>
                    </div>
                    <div className="metric">
                        <div className="label">EcoPoints</div>
                        <div className="value">420 EP</div>
                    </div>
                </div>

                <div className="top-tabs" style={{ marginTop: '12px' }}>
                    <div
                        className={`tab ${activeTab === 'cit_submit' ? 'active' : ''}`}
                        onClick={() => setActiveTab('cit_submit')}
                    >
                        Submit
                    </div>
                    <div
                        className={`tab ${activeTab === 'cit_history' ? 'active' : ''}`}
                        onClick={() => setActiveTab('cit_history')}
                    >
                        History
                    </div>
                    <div
                        className={`tab ${activeTab === 'cit_rewards' ? 'active' : ''}`}
                        onClick={() => setActiveTab('cit_rewards')}
                    >
                        Rewards
                    </div>
                    <div
                        className={`tab ${activeTab === 'cit_map' ? 'active' : ''}`}
                        onClick={() => setActiveTab('cit_map')}
                    >
                        Map
                    </div>
                </div>

                {/* SUBMIT TAB */}
                {activeTab === 'cit_submit' && (
                    <div className="tabpanel" style={{ marginTop: '12px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '12px' }}>
                            <div>
                                <h4>QR Scanner (Citizen)</h4>
                                <div className="scanner card-table">
                                    <div className="small">Scanner not active. Click Open Scanner to start or Upload QR image.</div>
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
                            <div>
                                <div className="card-table">
                                    <label className="small">Manual Add Activity</label>
                                    <div style={{ marginTop: '8px' }}>
                                        <select id="citCategory" style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid rgba(6,40,30,0.05)' }}>
                                            <option>Paper</option>
                                            <option>Metal</option>
                                            <option>Plastic</option>
                                            <option>Energy Saving</option>
                                            <option>Plantation</option>
                                        </select>
                                        <div style={{ marginTop: '8px' }}>
                                            <input
                                                id="citDesc"
                                                placeholder="Description"
                                                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid rgba(6,40,30,0.05)' }}
                                            />
                                        </div>
                                        <div style={{ marginTop: '8px' }}>
                                            <input
                                                id="citPoints"
                                                placeholder="EcoPoints"
                                                type="number"
                                                style={{ width: '100px', padding: '8px', borderRadius: '8px', border: '1px solid rgba(6,40,30,0.05)' }}
                                            />
                                        </div>
                                        <div style={{ marginTop: '8px' }}>
                                            <button className="btn" onClick={handleAddActivity}>Add Activity</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* HISTORY TAB */}
                {activeTab === 'cit_history' && (
                    <div className="tabpanel" style={{ marginTop: '12px' }}>
                        <h3>Your Activity History</h3>
                        <div className="card-table">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Activity</th>
                                        <th>EP</th>
                                        <th>CO₂</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {citizenActivities.map((activity, index) => (
                                        <tr key={index}>
                                            <td>{activity.id}</td>
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

                {/* REWARDS TAB */}
                {activeTab === 'cit_rewards' && (
                    <div className="tabpanel" style={{ marginTop: '12px' }}>
                        <RewardsTable rewards={citizenRewards} title="Citizen Rewards" />
                    </div>
                )}

                {/* MAP TAB */}
                {activeTab === 'cit_map' && (
                    <div className="tabpanel" style={{ marginTop: '12px' }}>
                        <h3>Your Local Hotspots</h3>
                        <div className="card-table map">
                            <div id="citMap" style={{ width: '100%', height: '360px', background: 'linear-gradient(90deg,#fff,#f6fffb)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div className="small">
                                    📍 Map visualization coming soon<br />
                                    Will show local eco-activity hotspots
                                </div>
                            </div>
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
                )}
            </article>
        </div>
    );
}
