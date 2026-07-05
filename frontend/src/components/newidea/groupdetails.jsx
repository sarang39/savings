import React, { useState, useEffect, use } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Server, Shield, Archive, Database, Activity,
    AlertTriangle, CheckCircle, Info, HardDrive, Key,
    Car, Road, Bus
} from 'lucide-react';
import './groupdetails.css';

export default function GroupDetails() {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("AuthToken"));
    const [totalAmount, setTotalAmount] = useState(0);
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
    const [tripId, settripId] = useState(null)
    const [members, setmembers] = useState([])
    const [showPopup, setShowPopup] = useState(false);
    const [contributionAmount, setContributionAmount] = useState(0);

    const inviteLink = `${window.location.origin}/joingroup/${selectedId}`;


    useEffect(() => {
        setToken(localStorage.getItem("AuthToken"));
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
                totalmembers: selectedTrip.memberss,
                remaining: selectedTrip.remaining,
                Date: selectedTrip.formattedDate,
                budgetoverview: 75 // Replace with dynamic budget calculations if needed
            });
            setmembers(selectedTrip.memberss)
        }
    };

    const activeDataset = triplist.find(item => item.id === selectedId);

    useEffect(() => {
        if (token) {
            gettrips();
        }
    }, [token]);
    const addmember = () => {
        setShowPopup(true);
    };
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
                        memberss: trip.members || [],
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
    function paymentpage() {
        navigate(`/payment/${selectedId}`, { state: members });
    }
    function contribution() {
        navigate(`/addcontribution/${selectedId}`, { state: members });
    }
    async function getTripTotalAmount(tripId) {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API}/api/transactions/TripTotalExpenseAmount/${tripId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(response.data);

            setTotalAmount(response.data.totalAmount);
            setContributionAmount(response.data.contributionAmount);

        } catch (err) {
            console.log("Get Trip Total Error:", err);
            setTotalAmount(0);
            alert("Server Error loading trip total.");
        }
    }

    // async function getTripContributionAmount(tripId) {
    //     console.log("Function called with:", tripId);

    //     try {
    //         const response = await axios.get(
    //             `${process.env.REACT_APP_API}/api/transactions/TripContributionAmount/${tripId}`,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                 }
    //             }
    //         );

    //         console.log("Contribution Amount:", response.data);
    //         setContributionAmount(response.data.totalAmount);
    //     } catch (err) {
    //         console.log("Error:", err);
    //     }
    // }
    useEffect(() => {
        if (selectedId) {
            getTripTotalAmount(selectedId);
        }
    }, [selectedId]);

    return (
        <div className="adaptive-app-wrapper">
            {showPopup && (
                <div
                    className='hero-content'
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.45)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999,
                    }}

                >
                    <div
                        style={{
                            width: "350px",
                            background: "#ffffffb1",
                            borderRadius: "12px",
                            padding: "20px",
                            boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                            position: "relative",
                        }}
                    >
                        <button
                            onClick={() => setShowPopup(false)}
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                border: "none",
                                background: "transparent",
                                fontSize: "18px",
                                cursor: "pointer",
                            }}
                        >
                            ✕
                        </button>

                        <h3 style={{ marginBottom: "15px" }}>Invite Member</h3>

                        <input
                            type="text"
                            value={inviteLink}
                            readOnly
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "6px",
                                marginBottom: "15px",
                                boxSizing: "border-box",
                            }}
                        />

                        <div
                            style={{
                                display: "flex",
                                gap: "10px",
                            }}
                        >
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(inviteLink);
                                    alert("Link copied!");
                                }}
                                style={{
                                    flex: 1,
                                    padding: "10px",
                                    border: "none",
                                    borderRadius: "6px",
                                    background: "#007bff",
                                    color: "#fff",
                                    cursor: "pointer",
                                }}
                            >
                                Copy Link
                            </button>

                            <button
                                onClick={async () => {
                                    if (navigator.share) {
                                        try {
                                            await navigator.share({
                                                title: "Join our Trip",
                                                text: "Click the link below to join our trip.",
                                                url: inviteLink,
                                            });
                                        } catch (err) {
                                            console.log(err);
                                        }
                                    } else {
                                        navigator.clipboard.writeText(inviteLink);
                                        alert("Sharing isn't supported. Link copied!");
                                    }
                                }}
                                style={{
                                    flex: 1,
                                    padding: "10px",
                                    border: "none",
                                    borderRadius: "6px",
                                    background: "#28a745",
                                    color: "#fff",
                                    cursor: "pointer",
                                }}
                            >
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            )}
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
                            <button className="primary-btn" onClick={() => { contribution() }}>Add Contribution</button>
                            <button className="primary-btn" onClick={() => { paymentpage() }}>Add Expense</button>
                            <div className="hero-buttons">
                                <button className="secondary-btn" onClick={() => addmember()}>
                                    + Add Member
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* STATS */}
                    <div className="stats-grid">
                        <div className="pro-card stat-card">
                            <p>Goal Amount</p>
                            <h2>₹{dashbordItems.goalamount}</h2>
                            <span>75% completed</span>
                        </div>
                        <div className="pro-card stat-card">
                            <p>Current Expense</p>
                            <h2>₹{totalAmount}</h2>
                            <span>5% completed</span>
                        </div>
                        <div className="pro-card stat-card">
                            <p>Current Contribution</p>
                            <h2>₹{contributionAmount}</h2>
                            <span>10% completed</span>
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
                                    {members && members.filter(m => m.status === 'approved').length === 0 ? (
                                        <p style={{ color: '#888', padding: '10px 0' }}>No approved members yet.</p>
                                    ) : (
                                        members
                                            // 1. Filter out any members whose status is not 'approved'
                                            .filter(member => member.status === 'approved')
                                            .map((member, index) => {
                                                const memberName = member.user && member.user.name ? member.user.name : "Unknown Member";
                                                const initial = memberName.charAt(0).toUpperCase();

                                                // 2. Determine if this member is the trip leader/admin
                                                // Checks against the activeDataset's leader property parsed from your gettrips function
                                                const isLeader = activeDataset?.leader?.id === member.user?._id || index === 0;
                                                const roleText = isLeader ? "Admin / Creator" : "Member";

                                                return (
                                                    <div className="member-row" key={member._id || index}>
                                                        <div className="member-left">
                                                            <div className="avatar">{initial}</div>
                                                            <div>
                                                                <h4>{memberName}</h4>
                                                                <p style={{ color: isLeader ? '#007bff' : '#666' }}>{roleText}</p>
                                                            </div>
                                                        </div>
                                                        <div className="member-right">
                                                            <h3>₹0</h3>
                                                            <div className="member-progress">
                                                                <div className="progress-fill" style={{ width: '100%' }}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                    )}
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