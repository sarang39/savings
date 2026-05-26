import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Server, Shield, Archive, Database, Activity,
    AlertTriangle, CheckCircle, Info, HardDrive, Key,
    Car, Road, Bus
} from 'lucide-react';
import './groupdetails.css';

export default function GroupDetails() {
    const token = localStorage.getItem("AuthToken");

    // 1. Initialized dashboard items with reasonable default/fallback empty values
    const [dashbordItems, setdashborditems] = useState({
        tripname: "Select a Trip",
        year: "----",
        Totalsavings: 0,
        goalamount: 0,
        members: 0,
        remaining: 0,
        Date: 'Loading...',
        budgetoverview: 0
    });

    // 2. Emptied out the hardcoded mock data array
    const [triplist, settriplist] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkViewport = () => {
            const mobileView = window.innerWidth <= 768;
            setIsMobile(mobileView);
            if (!mobileView) setIsSheetOpen(false);
        };

        checkViewport();
        window.addEventListener('resize', checkViewport);
        return () => window.removeEventListener('resize', checkViewport);
    }, []);

    // 3. Updated click handler to read values dynamically from the selected item
    const handleItemClick = (id) => {
        setSelectedId(id);
        if (isMobile) {
            setIsSheetOpen(true);
        }

        const selectedTrip = triplist.find(item => item.id === id);
        if (selectedTrip) {
            setdashborditems({
                tripname: selectedTrip.tripname,
                year: selectedTrip.year,
                Totalsavings: selectedTrip.budget * 0.75, // Replace with dynamic backend logic/field if available
                goalamount: selectedTrip.budget,
                members: selectedTrip.memberCount,
                remaining: selectedTrip.remaining,
                Date: selectedTrip.formattedDate,
                budgetoverview: 75 // Replace with dynamic budget calculations if needed
            });
        }
    };

    const activeDataset = triplist.find(item => item.id === selectedId);

    useEffect(() => {
        if (token) {
            gettrips();
        }
    }, [token]);

    // 4. Injected response handling to capture database records into state
    async function gettrips() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/trips/gettrips`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log("Trips data:", response.data);

            if (response.data && Array.isArray(response.data.trips)) {
                const transformed = response.data.trips.map((trip) => {
                    // Extract dynamic target values from backend schema properties
                    const tripDate = new Date(trip.date);
                    const today = new Date();
                    const timeDiff = tripDate - today;
                    const daysRemaining = Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));

                    // Determine layout iconography and styling classes based on timeframe context
                    let priority = "Standard";
                    let badgeClass = "std-badge";
                    let iconComponent = Bus;

                    if (daysRemaining <= 5) {
                        priority = "Critical";
                        badgeClass = "crit-badge";
                        iconComponent = Car;
                    } else if (daysRemaining <= 15) {
                        priority = "High";
                        badgeClass = "high-badge";
                        iconComponent = Road;
                    }

                    return {
                        id: trip._id,
                        tripname: trip.title,
                        priority: priority,
                        badgeClass: badgeClass,
                        icon: iconComponent,
                        remaining: daysRemaining,
                        summary: trip.description || "No description provided.",
                        budget: trip.budget || 0,
                        memberCount: trip.members ? trip.members.length : 1,
                        year: tripDate.getFullYear() || "2026",
                        formattedDate: tripDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
                    };
                });

                settriplist(transformed);

                // Auto-select first trip available to seed dashboard presentation
                if (transformed.length > 0) {
                    const firstTrip = transformed[0];
                    setSelectedId(firstTrip.id);
                    setdashborditems({
                        tripname: firstTrip.tripname,
                        year: firstTrip.year,
                        Totalsavings: firstTrip.budget * 0.75,
                        goalamount: firstTrip.budget,
                        members: firstTrip.memberCount,
                        remaining: firstTrip.remaining,
                        Date: firstTrip.formattedDate,
                        budgetoverview: 75
                    });
                }
            }
        } catch (err) {
            console.log("Get Trips Error:", err);
            alert("Server Error loading trips.");
        }
    }

    return (
        <div className="adaptive-app-wrapper">
            {/* ================= MASTER SIDEBAR ================= */}
            <aside className="master-sidebar-pane">
                <header className="app-branding-bar">
                    <div className="brand-text">
                        <span className="sub-tag">System Registry</span>
                        <h2>Console v3</h2>
                    </div>
                    <div className="profile-badge">SP</div>
                </header>

                <p className="pane-section-title">High-Priority Registries</p>

                <nav className="master-navigation-feed">
                    {triplist.length === 0 ? (
                        <p className="empty-message-text" style={{ padding: '20px', color: '#888' }}>No trips registered.</p>
                    ) : (
                        triplist.map((item, index) => {
                            const isSelected = item.id === selectedId;
                            const Icon = item.icon;

                            return (
                                <button
                                    key={item.id || index}
                                    className={`master-feed-card ${isSelected ? 'selected' : ''}`}
                                    onClick={() => handleItemClick(item.id)}
                                >
                                    <div className="card-meta-row">
                                        <span className={`priority-tag ${item.badgeClass}`}>{item.priority}</span>
                                        <span className="counter-pill">{item.remaining}d </span>
                                    </div>
                                    <div className="card-title-row">
                                        <Icon className="card-icon" size={20} />
                                        <h3>{item.tripname}</h3>
                                    </div>
                                    <p>{item.summary}</p>
                                    <span className="mobile-action-indicator">Inspect Nested Data →</span>
                                </button>
                            );
                        })
                    )}
                </nav>
            </aside>

            {/* ================= DESKTOP DETAILS WORKSPACE ================= */}
            <div className="pro-page">
                <div className="pro-container">
                    {/* HERO */}
                    <div className="group-hero">
                        <div className="hero-overlay"></div>
                        <div className="hero-content">
                            <div>
                                <span className="hero-badge">Active Travel Group</span>
                                <h1>{dashbordItems.tripname} Vacation {dashbordItems.year}</h1>
                                <p>Manage group savings, expenses, trip planning, and financial transparency for your entire travel team.</p>
                            </div>
                            <div className="hero-buttons">
                                <button className="primary-btn">+ Add Member</button>
                                <button className="secondary-btn">Edit Group</button>
                            </div>
                        </div>
                    </div>

                    {/* STATS */}
                    <div className="stats-grid">
                        <div className="pro-card stat-card">
                            <p>Total Savings</p>
                            <h2>₹{dashbordItems.Totalsavings}</h2>
                            <span>+12% this month</span>
                        </div>
                        <div className="pro-card stat-card">
                            <p>Goal Amount</p>
                            <h2>₹{dashbordItems.goalamount}</h2>
                            <span>75% completed</span>
                        </div>
                        <div className="pro-card stat-card">
                            <p>Total Members</p>
                            <h2>{dashbordItems.members}</h2>
                            <span>2 admins active</span>
                        </div>
                        <div className="pro-card stat-card">
                            <p>Days Remaining</p>
                            <h2>{dashbordItems.remaining}</h2>
                            <span>Trip countdown</span>
                        </div>
                    </div>

                    {/* MAIN GRID */}
                    <div className="main-grid">
                        {/* LEFT */}
                        <div className="left-section">
                            <div className="pro-card">
                                <div className="section-header">
                                    <h2>Trip Information</h2>
                                </div>
                                <div className="details-grid">
                                    <div className="detail-item">
                                        <span>Destination</span>
                                        <h4>{dashbordItems.tripname}, India</h4>
                                    </div>
                                    <div className="detail-item">
                                        <span>Trip Date</span>
                                        <h4>{dashbordItems.Date}</h4>
                                    </div>
                                    <div className="detail-item">
                                        <span>Duration</span>
                                        <h4>5 Days</h4>
                                    </div>
                                    <div className="detail-item">
                                        <span>Group Type</span>
                                        <h4>Friends Trip</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="pro-card">
                                <div className="section-header">
                                    <h2>Members</h2>
                                    <button className="small-btn">View All</button>
                                </div>
                                <div className="members-list">
                                    <div className="member-row">
                                        <div className="member-left">
                                            <div className="avatar">R</div>
                                            <div>
                                                <h4>Rahul</h4>
                                                <p>Group Admin</p>
                                            </div>
                                        </div>
                                        <div className="member-right">
                                            <h3>₹15,000</h3>
                                            <div className="member-progress">
                                                <div className="progress-fill" style={{ width: '75%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="right-section">
                            <div className="pro-card">
                                <h2 className="timeline-title">Activity Timeline</h2>
                                <div className="timeline">
                                    <div className="timeline-item">
                                        <div className="timeline-dot"></div>
                                        <div>
                                            <h4>Rahul added ₹5000</h4>
                                            <p>Contribution added successfully</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pro-card">
                                <h2>Budget Overview</h2>
                                <div className="budget-circle">
                                    <div className="budget-inner">
                                        <h2>{dashbordItems.budgetoverview}%</h2>
                                        <p>Goal Completed</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= MOBILE BOTTOM SHEET DRILL DOWN ================= */}
            {isMobile && isSheetOpen && <div className="sheet-backdrop" onClick={() => setIsSheetOpen(false)} />}

            <div className={`mobile-bottom-sheet ${isMobile && isSheetOpen ? 'sheet-open' : ''}`}>
                {isMobile && activeDataset && (
                    <>
                        <div className="sheet-grab-handle" onClick={() => setIsSheetOpen(false)}></div>
                        <div className="sheet-header">
                            <div>
                                <span className="sheet-pre-title">Deep-Dive Module</span>
                                <h1>{dashbordItems.tripname} Vacation</h1>
                            </div>
                            <button className="sheet-close-btn" onClick={() => setIsSheetOpen(false)}>×</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}