// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//     Server, Shield, Archive, Database, Activity,
//     AlertTriangle, CheckCircle, Info, HardDrive, Key,
//     Car, Road, Bus, ChevronDown, ChevronUp, Receipt, PieChart, Wallet
// } from 'lucide-react';
// import './groupdetails.css';

// export default function GroupDetails() {
//     const [transactionHistory, setTransactionHistory] = useState([]);
//     const navigate = useNavigate();
//     const [token, setToken] = useState(localStorage.getItem("AuthToken"));
//     const [totalAmount, setTotalAmount] = useState(0);

//     const [dashbordItems, setdashborditems] = useState({
//         tripname: "Select a Trip",
//         year: "----",
//         Totalsavings: 0,
//         goalamount: 0,
//         members: 0,
//         remaining: 0,
//         Date: 'Loading...',
//         budgetoverview: 0
//     });

//     const [triplist, settriplist] = useState([]);
//     const [selectedId, setSelectedId] = useState(null);
//     const [isSheetOpen, setIsSheetOpen] = useState(false);
//     const [isMobile, setIsMobile] = useState(false);
//     const [members, setmembers] = useState([]);
//     const [showPopup, setShowPopup] = useState(false);
//     const [contributionAmount, setContributionAmount] = useState(0);
//     const [tripbalance, setTripBalance] = useState(0);
//     const [memberBalances, setMemberBalances] = useState([]);
//     const [graphamount, setgraphamount] = useState(0);

//     // Track which member's detailed layout is expanded
//     const [expandedMemberId, setExpandedMemberId] = useState(null);

//     const inviteLink = `${window.location.origin}/joingroup/${selectedId}`;

//     useEffect(() => {
//         setToken(localStorage.getItem("AuthToken"));
//         const checkViewport = () => {
//             const mobileView = window.innerWidth <= 768;
//             setIsMobile(mobileView);
//             if (!mobileView) setIsSheetOpen(false);
//         };

//         checkViewport();
//         window.addEventListener('resize', checkViewport);
//         return () => window.removeEventListener('resize', checkViewport);
//     }, []);

//     const handleItemClick = (id) => {
//         setSelectedId(id);
//         setExpandedMemberId(null); // Reset expanded details layout on menu change
//         if (isMobile) {
//             setIsSheetOpen(true);
//         }

//         const selectedTrip = triplist.find(item => item.id === id);
//         if (selectedTrip) {
//             setdashborditems({
//                 tripname: selectedTrip.tripname,

//                 year: selectedTrip.year,
//                 Totalsavings: selectedTrip.budget * 0.75,
//                 goalamount: selectedTrip.budget,
//                 members: selectedTrip.memberCount,
//                 totalmembers: selectedTrip.memberss,
//                 remaining: selectedTrip.remaining,
//                 Date: selectedTrip.formattedDate,
//                 budgetoverview: 75
//             });
//             setmembers(selectedTrip.memberss);
//         }
//     };

//     const activeDataset = triplist.find(item => item.id === selectedId);

//     useEffect(() => {
//         if (token) {
//             gettrips();
//         }
//     }, [token]);



//     const addmember = () => {
//         setShowPopup(true);
//     };

//     async function gettrips() {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_API}/api/trips/gettrips`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });

//             console.log("Trips data:", response.data);

//             if (response.data && Array.isArray(response.data.trips)) {
//                 const transformed = response.data.trips.map((trip) => {
//                     const tripDate = new Date(trip.date);
//                     const today = new Date();
//                     const timeDiff = tripDate - today;
//                     const daysRemaining = Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));

//                     let priority = "Standard";
//                     let badgeClass = "std-badge";
//                     let iconComponent = Bus;

//                     if (daysRemaining <= 5) {
//                         priority = "Critical";
//                         badgeClass = "crit-badge";
//                         iconComponent = Car;
//                     } else if (daysRemaining <= 15) {
//                         priority = "High";
//                         badgeClass = "high-badge";
//                         iconComponent = Road;
//                     }

//                     return {
//                         id: trip._id,
//                         tripname: trip.title,
//                         priority: priority,
//                         badgeClass: badgeClass,
//                         icon: iconComponent,
//                         remaining: daysRemaining,
//                         summary: trip.description || "No description provided.",
//                         budget: trip.budget || 0,
//                         memberCount: trip.members ? trip.members.length : 1,
//                         memberss: trip.members || [],
//                         year: tripDate.getFullYear() || "2026",
//                         formattedDate: tripDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
//                     };
//                 });

//                 settriplist(transformed);

//                 if (transformed.length > 0) {
//                     const firstTrip = transformed[0];
//                     setSelectedId(firstTrip.id);
//                     setdashborditems({
//                         tripname: firstTrip.tripname,
//                         year: firstTrip.year,
//                         Totalsavings: firstTrip.budget * 0.75,
//                         goalamount: firstTrip.budget,
//                         members: firstTrip.memberCount,
//                         remaining: firstTrip.remaining,
//                         Date: firstTrip.formattedDate,
//                         budgetoverview: 75
//                     });
//                     setmembers(firstTrip.memberss);
//                 }
//             }
//         } catch (err) {
//             console.log("Get Trips Error:", err);
//             alert("Server Error loading trips.");
//         }
//     }

//     function paymentpage() {
//         navigate(`/payment/${selectedId}`, { state: members });
//     }

//     function contribution() {
//         navigate(`/addcontribution/${selectedId}`, { state: members });
//     }

//     async function getTripTotalAmount(tripId) {
//         try {
//             const response = await axios.get(
//                 `${process.env.REACT_APP_API}/api/transactions/TripTotalExpenseAmount/${tripId}`,
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             console.log('result:::', response.data);

//             const serverContribution = response.data.contributionAmount || 0;

//             setTotalAmount(response.data.totalAmount);
//             setContributionAmount(serverContribution);
//             setTransactionHistory(response.data.transactionHistory || []);
//             setTripBalance(response.data.tripBalance);
//             setMemberBalances(response.data.memberBalances || []);

//             const matchedTrip = triplist.find(t => t.id === tripId);
//             const goal = matchedTrip ? matchedTrip.budget : dashbordItems.goalamount;

//             setgraphamount(goal > 0
//                 ? Math.min(100, Math.round((serverContribution / goal) * 100))
//                 : 0
//             );

//         } catch (err) {
//             console.log("Get Trip Total Error:", err);
//             setTotalAmount(0);
//             alert("Server Error loading trip total.");
//         }
//     }

//     useEffect(() => {
//         if (selectedId) {
//             getTripTotalAmount(selectedId);
//         }
//     }, [selectedId, triplist]);

//     const toggleMemberExpand = (userId) => {
//         setExpandedMemberId(expandedMemberId === userId ? null : userId);
//     };

//     return (
//         <div className="adaptive-app-wrapper">
//             {showPopup && (
//                 <div
//                     className='hero-content'
//                     style={{
//                         position: "fixed",
//                         top: 0,
//                         left: 0,
//                         width: "100%",
//                         height: "100%",
//                         background: "rgba(0,0,0,0.45)",
//                         display: "flex",
//                         justifyContent: "center",

//                         alignItems: "center",
//                         zIndex: 9999,
//                     }}
//                 >
//                     <div
//                         style={{
//                             width: "350px",
//                             background: "#ffffffb1",
//                             borderRadius: "12px",
//                             padding: "20px",
//                             boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
//                             position: "relative",
//                         }}
//                     >
//                         <button
//                             onClick={() => setShowPopup(false)}
//                             style={{
//                                 position: "absolute",
//                                 top: "10px",
//                                 right: "10px",
//                                 border: "none",
//                                 background: "transparent",
//                                 fontSize: "18px",
//                                 cursor: "pointer",
//                             }}
//                         >
//                             ✕
//                         </button>

//                         <h3 style={{ marginBottom: "15px" }}>Invite Member</h3>

//                         <input
//                             type="text"
//                             value={inviteLink}
//                             readOnly
//                             style={{
//                                 width: "100%",
//                                 padding: "10px",
//                                 border: "1px solid #ccc",
//                                 borderRadius: "6px",
//                                 marginBottom: "15px",
//                                 boxSizing: "border-box",
//                             }}
//                         />

//                         <div style={{ display: "flex", gap: "10px" }}>
//                             <button
//                                 onClick={() => {
//                                     navigator.clipboard.writeText(inviteLink);
//                                     alert("Link copied!");
//                                 }}
//                                 style={{
//                                     flex: 1,
//                                     padding: "10px",
//                                     border: "none",
//                                     borderRadius: "6px",
//                                     background: "#007bff",
//                                     color: "#fff",
//                                     cursor: "pointer",
//                                 }}
//                             >
//                                 Copy Link
//                             </button>

//                             <button
//                                 onClick={async () => {
//                                     if (navigator.share) {
//                                         try {
//                                             await navigator.share({
//                                                 title: "Join our Trip",
//                                                 text: "Click the link below to join our trip.",
//                                                 url: inviteLink,
//                                             });
//                                         } catch (err) {
//                                             console.log(err);
//                                         }
//                                     } else {
//                                         navigator.clipboard.writeText(inviteLink);
//                                         alert("Sharing isn't supported. Link copied!");
//                                     }
//                                 }}
//                                 style={{
//                                     flex: 1,
//                                     padding: "10px",
//                                     border: "none",
//                                     borderRadius: "6px",
//                                     background: "#28a745",
//                                     color: "#fff",
//                                     cursor: "pointer",
//                                 }}
//                             >
//                                 Share
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             <aside className="master-sidebar-pane">
//                 <header className="app-branding-bar">
//                     <div className="brand-text">
//                         <span className="sub-tag">.</span>
//                         <span className="sub-tag">Registered trip details</span>
//                         <h2>Trip list </h2>
//                     </div>
//                     <div className="profile-badge">SP</div>
//                 </header>

//                 <p className="pane-section-title">High-Priority Registries</p>

//                 <nav className="master-navigation-feed">
//                     {triplist.length === 0 ? (
//                         <p className="empty-message-text" style={{ padding: '20px', color: '#888' }}>No trips registered.</p>
//                     ) : (
//                         triplist.map((item, index) => {
//                             const isSelected = item.id === selectedId;
//                             const Icon = item.icon;
//                             return (
//                                 <button
//                                     key={item.id || index}
//                                     className={`master-feed-card ${isSelected ? 'selected' : ''}`}
//                                     onClick={() => handleItemClick(item.id)}
//                                 >
//                                     <div className="card-meta-row">
//                                         <span className={`priority-tag ${item.badgeClass}`}>{item.priority}</span>
//                                         <span className="counter-pill">{item.remaining}d </span>
//                                     </div>
//                                     <div className="card-title-row">
//                                         <Icon className="card-icon" size={20} />
//                                         <h3>{item.tripname}</h3>
//                                     </div>
//                                     <p>{item.summary}</p>
//                                     <span className="mobile-action-indicator">Inspect Nested Data →</span>
//                                 </button>
//                             );
//                         })
//                     )}
//                 </nav>
//             </aside>

//             <div className="pro-page">
//                 <div className="pro-container">
//                     <div className="group-hero">
//                         <div className="hero-overlay"></div>
//                         <div className="hero-content">
//                             <div>
//                                 <span className="hero-badge">Active Travel Group</span>
//                                 <h1>{dashbordItems.tripname} Vacation {dashbordItems.year}</h1>
//                                 <p>Manage group savings, expenses, trip planning, and financial transparency for your entire travel team.</p>
//                             </div>
//                             <button className="primary-btn" onClick={() => { contribution() }}>Add Contribution</button>
//                             <button className="primary-btn" onClick={() => { paymentpage() }}>Add Expense</button>
//                             <div className="hero-buttons">
//                                 <button className="secondary-btn" onClick={() => addmember()}>
//                                     + Add Member
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="stats-grid">
//                         <div className="pro-card stat-card">
//                             <p>Goal Amount</p>
//                             <h2>₹{dashbordItems.goalamount}</h2>
//                             <span>Target budget</span>
//                         </div>
//                         <div className="pro-card stat-card">
//                             <p>Current Contribution</p>
//                             <h2 style={{ color: tripbalance >= 0 ? '#28a745' : '#dc3545' }}>₹{contributionAmount}</h2>
//                             <span>Collected pool</span>
//                         </div>
//                         <div className="pro-card stat-card">
//                             <p>Trip Expenses</p>
//                             <h2 style={{ color: 0 - totalAmount >= 0 ? '#28a745' : '#dc3545' }}>₹{totalAmount}</h2>
//                             <span>Total spent</span>
//                         </div>
//                         <div className="pro-card stat-card">
//                             <p>Inhand </p>
//                             <h2>₹{tripbalance}</h2>
//                             <span>Remaining cash</span>
//                         </div>
//                         <div className="pro-card stat-card">
//                             <p>Total Members</p>
//                             <h2>{dashbordItems.members}</h2>
//                             <span>Active participants</span>
//                         </div>
//                         <div className="pro-card stat-card">
//                             <p>Days Remaining</p>
//                             <h2>{dashbordItems.remaining}</h2>
//                             <span>Trip countdown</span>
//                         </div>
//                     </div>

//                     <div className="main-grid">
//                         <div className="left-section">
//                             <div className="pro-card">
//                                 <div className="section-header">
//                                     <h2>Trip Information</h2>
//                                 </div>
//                                 <div className="details-grid">
//                                     <div className="detail-item">
//                                         <span>Destination</span>
//                                         <h4>{dashbordItems.tripname}, India</h4>
//                                     </div>
//                                     <div className="detail-item">
//                                         <span>Trip Date</span>
//                                         <h4>{dashbordItems.Date}</h4>
//                                     </div>
//                                     <div className="detail-item">
//                                         <span>Duration</span>
//                                         <h4>5 Days</h4>
//                                     </div>
//                                     <div className="detail-item">

//                                         <span>Group Type</span>
//                                         <h4>Friends Trip</h4>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="pro-card">
//                                 <div className="section-header">
//                                     <h2>Members & Settlement Details</h2>
//                                     <button className="small-btn">View All</button>
//                                 </div>
//                                 <div className="members-list">
//                                     {members && members.filter(m => m.status === 'approved').length === 0 ? (
//                                         <p style={{ color: '#888', padding: '10px 0' }}>No approved members yet.</p>
//                                     ) : (
//                                         members
//                                             .filter(member => member.status === 'approved')
//                                             .map((member, index) => {
//                                                 const memberId = member.user?._id;
//                                                 const memberName = member.user && member.user.name ? member.user.name : "Unknown Member";
//                                                 const initial = memberName.charAt(0).toUpperCase();
//                                                 const isLeader = activeDataset?.leader?.id === memberId || index === 0;
//                                                 const roleText = isLeader ? "Admin / Creator" : "Member";

//                                                 // Connect straight to enhanced aggregation arrays
//                                                 const balanceData = memberBalances.find(b => b.userId === memberId) || {
//                                                     netBalance: 0,
//                                                     contribution: 0,
//                                                     expensePaid: 0,
//                                                     splitAmount: 0,
//                                                     paidExpensesList: [],
//                                                     consumedSplitsList: []
//                                                 };

//                                                 const isExpanded = expandedMemberId === memberId;

//                                                 return (
//                                                     <div className="member-accordion-wrapper" key={member._id || index} style={{ marginBottom: '10px', borderBottom: '1px solid #f1f5f9' }}>
//                                                         <div
//                                                             className={`member-row ${isExpanded ? 'active' : ''}`}
//                                                             onClick={() => toggleMemberExpand(memberId)}
//                                                             style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'between' }}
//                                                         >
//                                                             <div className="member-left" style={{ flex: 1 }}>
//                                                                 <div className="avatar">{initial}</div>
//                                                                 <div>
//                                                                     <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                                                                         {memberName}
//                                                                         {isExpanded ? <ChevronUp size={14} color="#888" /> : <ChevronDown size={14} color="#888" />}
//                                                                     </h4>
//                                                                     <p style={{ color: isLeader ? '#007bff' : '#666' }}>{roleText}</p>
//                                                                 </div>
//                                                             </div>
//                                                             <div className="member-right" style={{ textAlign: 'right' }}>
//                                                                 <span style={{ fontSize: '12px', color: '#666', display: 'block' }}>Net Balance</span>
//                                                                 <h3 style={{ color: balanceData.netBalance >= 0 ? '#28a745' : '#dc3545', margin: 0 }}>
//                                                                     {balanceData.netBalance >= 0 ? '+' : ''}₹{Number(balanceData.netBalance).toFixed(2)}
//                                                                 </h3>
//                                                             </div>
//                                                         </div>

//                                                         {/* Collapsible Extended Datasets Container */}
//                                                         {isExpanded && (
//                                                             <div className="member-expanded-details" style={{ padding: '15px', background: '#f8fafc', borderRadius: '8px', marginTop: '5px', fontSize: '13px' }}>

//                                                                 {/* Summary Micro Cards */}
//                                                                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '15px' }}>
//                                                                     <div style={{ background: '#fff', padding: '8px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
//                                                                         <span style={{ color: '#666', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}><Wallet size={12} /> Paid Pool</span>
//                                                                         <strong style={{ color: '#28a745' }}>₹{balanceData.contribution}</strong>
//                                                                     </div>
//                                                                     <div style={{ background: '#fff', padding: '8px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
//                                                                         <span style={{ color: '#666', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}><Receipt size={12} /> Out-of-Pocket</span>
//                                                                         <strong style={{ color: '#007bff' }}>₹{balanceData.expensePaid}</strong>
//                                                                     </div>
//                                                                     <div style={{ background: '#fff', padding: '8px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
//                                                                         <span style={{ color: '#666', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}><PieChart size={12} /> Owed Shares</span>
//                                                                         <strong style={{ color: '#dc3545' }}>₹{balanceData.splitAmount}</strong>
//                                                                     </div>
//                                                                 </div>

//                                                                 {/* Itemized Lists */}
//                                                                 <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '15px' }}>

//                                                                     {/* Column 1: Out of pocket purchases */}
//                                                                     <div>
//                                                                         <h5 style={{ margin: '0 0 5px 0', color: '#334155' }}>Purchases Paid For ({balanceData.paidExpensesList.length})</h5>
//                                                                         {balanceData.paidExpensesList.length === 0 ? (
//                                                                             <p style={{ color: '#94a3b8', margin: 0, fontStyle: 'italic' }}>No out-of-pocket transactions.</p>
//                                                                         ) : (
//                                                                             <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
//                                                                                 {balanceData.paidExpensesList.map((item, idx) => (
//                                                                                     <li key={idx} style={{ background: '#fff', padding: '6px 8px', borderRadius: '4px', marginBottom: '4px', display: 'flex', justifyContent: 'space-between', border: '1px solid #f1f5f9' }}>
//                                                                                         <span style={{ color: '#475569' }}>{item.description}</span>
//                                                                                         <span style={{ fontWeight: '600', color: '#007bff' }}>₹{item.amount}</span>
//                                                                                     </li>
//                                                                                 ))}
//                                                                             </ul>
//                                                                         )}
//                                                                     </div>

//                                                                     {/* Column 2: Splits Consumed */}
//                                                                     <div>
//                                                                         <h5 style={{ margin: '0 0 5px 0', color: '#334155' }}>Your Share of Expenses ({balanceData.consumedSplitsList.length})</h5>
//                                                                         {balanceData.consumedSplitsList.length === 0 ? (
//                                                                             <p style={{ color: '#94a3b8', margin: 0, fontStyle: 'italic' }}>No split costs allocated.</p>
//                                                                         ) : (
//                                                                             <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
//                                                                                 {balanceData.consumedSplitsList.map((item, idx) => (
//                                                                                     <li key={idx} style={{ background: '#fff', padding: '6px 8px', borderRadius: '4px', marginBottom: '4px', display: 'flex', justifyContent: 'space-between', border: '1px solid #f1f5f9' }}>
//                                                                                         <span style={{ color: '#475569' }}>{item.description}</span>
//                                                                                         <span style={{ fontWeight: '600', color: '#dc3545' }}>₹{Number(item.share).toFixed(2)}</span>
//                                                                                     </li>
//                                                                                 ))}
//                                                                             </ul>
//                                                                         )}
//                                                                     </div>

//                                                                 </div>
//                                                             </div>
//                                                         )}
//                                                     </div>
//                                                 );
//                                             })
//                                     )}
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="right-section">
//                             <div className="pro-card">
//                                 <h2>Budget Overview</h2>
//                                 <div
//                                     className="budget-circle"
//                                     style={{
//                                         background: `conic-gradient(#28a745 ${graphamount}%, #e2e8f0 ${graphamount}% 100%)`,
//                                         borderRadius: '50%',
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         justifyContent: 'center',
//                                         position: 'relative'
//                                     }}
//                                 >
//                                     <div className="budget-inner">
//                                         <h2>{graphamount}%</h2>
//                                         <p>Goal Completed</p>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="pro-card">
//                                 <h2 className="timeline-title">Activity Timeline</h2>
//                                 <div className="timeline">
//                                     {transactionHistory.length > 0 ? (
//                                         transactionHistory.map((item) => (
//                                             <div className="timeline-item" key={item._id}>
//                                                 <div className="timeline-dot"></div>
//                                                 <div>
//                                                     <h4>
//                                                         {item.paidBy?.name || "Someone"}{" "}
//                                                         {item.type === "contribution"
//                                                             ? `added ₹${item.amount}`
//                                                             : `spent ₹${item.amount}`}
//                                                     </h4>
//                                                     <p>
//                                                         {item.description}
//                                                         {" • "}
//                                                         {new Date(item.createdAt).toLocaleString()}
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         ))
//                                     ) : (
//                                         <p>No activity yet.</p>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {isMobile && isSheetOpen && <div className="sheet-backdrop" onClick={() => setIsSheetOpen(false)} />}

//             <div className={`mobile-bottom-sheet ${isMobile && isSheetOpen ? 'sheet-open' : ''}`}>
//                 {isMobile && activeDataset && (
//                     <>
//                         <div className="sheet-grab-handle" onClick={() => setIsSheetOpen(false)}></div>
//                         <div className="sheet-header">
//                             <div>
//                                 <span className="sheet-pre-title">Deep-Dive Module</span>
//                                 <h1>{dashbordItems.tripname} Vacation</h1>
//                             </div>
//                             <button className="sheet-close-btn" onClick={() => setIsSheetOpen(false)}>×</button>
//                         </div>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
    ChevronDown, ChevronUp, Receipt, PieChart, Wallet,
    Car, Road, Bus, Calendar, Users, Target
} from 'lucide-react';
import './groupdetails.css';

export default function GroupDetails() {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("AuthToken"));

    // Core Aggregated Metrics
    const [totalAmount, setTotalAmount] = useState(0);
    const [contributionAmount, setContributionAmount] = useState(0);
    const [tripBalance, setTripBalance] = useState(0);
    const [memberBalances, setMemberBalances] = useState([]);
    const [transactionHistory, setTransactionHistory] = useState([]);
    const [graphamount, setgraphamount] = useState(0);

    // Navigation & Layout States
    const [triplist, settriplist] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [members, setmembers] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [expandedMemberId, setExpandedMemberId] = useState(null);

    const [dashboardItems, setDashboardItems] = useState({
        tripname: "Select a Trip",
        year: "----",
        goalamount: 0,
        membersCount: 0,
        remainingDays: 0,
        formattedDate: 'Loading...'
    });

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

    useEffect(() => {
        if (token) {
            gettrips();
        }
    }, [token]);

    useEffect(() => {
        if (selectedId && token) {
            getTripTotalAmount(selectedId);
        }
    }, [selectedId, token]);

    async function gettrips() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/trips/gettrips`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data && Array.isArray(response.data.trips)) {
                const transformed = response.data.trips.map((trip) => {
                    const tripDate = new Date(trip.date);
                    const today = new Date();
                    const daysRemaining = Math.max(0, Math.ceil((tripDate - today) / (1000 * 60 * 60 * 24)));

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
                        memberCount: trip.members ? trip.members.length : 0,
                        memberss: trip.members || [],
                        year: tripDate.getFullYear() || "2026",
                        formattedDate: tripDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
                    };
                });

                settriplist(transformed);

                if (transformed.length > 0 && !selectedId) {
                    const firstTrip = transformed[0];
                    setSelectedId(firstTrip.id);
                    updateDashboardState(firstTrip);
                }
            }
        } catch (err) {
            console.error("Get Trips Error:", err);
        }
    }

    const handleItemClick = (id) => {
        setSelectedId(id);
        setExpandedMemberId(null);
        if (isMobile) setIsSheetOpen(true);

        const selectedTrip = triplist.find(item => item.id === id);
        if (selectedTrip) {
            updateDashboardState(selectedTrip);
        }
    };

    const updateDashboardState = (trip) => {
        setDashboardItems({
            tripname: trip.tripname,
            year: trip.year,
            goalamount: trip.budget,
            membersCount: trip.memberCount,
            remainingDays: trip.remaining,
            formattedDate: trip.formattedDate
        });
        setmembers(trip.memberss);
    };

    async function getTripTotalAmount(tripId) {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API}/api/transactions/TripTotalExpenseAmount/${tripId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const serverContribution = response.data.contributionAmount || 0;
            setTotalAmount(response.data.totalAmount || 0);
            setContributionAmount(serverContribution);
            setTransactionHistory(response.data.transactionHistory || []);
            setTripBalance(response.data.tripBalance || 0);
            setMemberBalances(response.data.memberBalances || []);

            const matchedTrip = triplist.find(t => t.id === tripId);
            const goal = matchedTrip ? matchedTrip.budget : dashboardItems.goalamount;

            setgraphamount(goal > 0 ? Math.min(100, Math.round((serverContribution / goal) * 100)) : 0);
        } catch (err) {
            console.error("Get Trip Total Error:", err);
            setTotalAmount(0);
            setContributionAmount(0);
            setTripBalance(0);
            setMemberBalances([]);
        }
    }

    const toggleMemberExpand = (userId) => {
        setExpandedMemberId(expandedMemberId === userId ? null : userId);
    };
    function paymentpage() {
        navigate(`/payment/${selectedId}`, { state: members });
    }

    function contribution() {
        navigate(`/addcontribution/${selectedId}`, { state: members });
    }
    const addmember = () => {
        setShowPopup(true);
    };

    return (
        <div className="adaptive-app-wrapper" style={{
            paddingtop: '5%'
        }}>
            {/* {showPopup && (
                <div className='modal-backdrop' onClick={() => setShowPopup(false)}>
                    <div className='modal-container' onClick={e => e.stopPropagation()}>
                        <button className="close-modal-btn" onClick={() => setShowPopup(false)}>✕</button>
                        <h3>Invite Member</h3>
                        <input type="text" value={inviteLink} readOnly className="invite-input-field" />
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button className="action-btn copy-btn" onClick={() => { navigator.clipboard.writeText(inviteLink); alert("Link copied!"); }}>Copy Link</button>
                            <button className="action-btn share-btn" onClick={async () => {
                                if (navigator.share) {
                                    try { await navigator.share({ title: "Join our Trip", text: "Join our travel group pool.", url: inviteLink }); }
                                    catch (err) { console.log(err); }
                                } else { navigator.clipboard.writeText(inviteLink); alert("Copied!"); }
                            }}>Share</button>
                        </div>
                    </div>
                </div>
            )} */}
            {showPopup && (
                <div
                    className='modal-backdrop'
                    onClick={() => setShowPopup(false)}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        background: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 99999, // Ensures it sits above everything else
                    }}
                >
                    <div
                        className='modal-container'
                        onClick={e => e.stopPropagation()}
                        style={{
                            background: "#ffffff",
                            borderRadius: "12px",
                            padding: "24px",
                            width: "90%",
                            maxWidth: "400px",
                            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
                            color: "#1e293b" // Ensures text color is visible against a white card
                        }}
                    >
                        <button
                            className="close-modal-btn"
                            onClick={() => setShowPopup(false)}
                            style={{
                                float: "right",
                                background: "none",
                                border: "none",
                                fontSize: "18px",
                                cursor: "pointer",
                                color: "#64748b"
                            }}
                        >
                            ✕
                        </button>
                        <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: "600" }}>Invite Member</h3>

                        <input
                            type="text"
                            value={inviteLink}
                            readOnly
                            className="invite-input-field"
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #cbd5e1",
                                borderRadius: "6px",
                                marginBottom: "16px",
                                background: "#f8fafc",
                                color: "#334155",
                                boxSizing: "border-box"
                            }}
                        />

                        <div style={{ display: "flex", gap: "10px" }}>
                            <button
                                className="action-btn copy-btn"
                                onClick={() => { navigator.clipboard.writeText(inviteLink); alert("Link copied!"); }}
                                style={{ flex: 1, padding: "10px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500" }}
                            >
                                Copy Link
                            </button>
                            <button
                                className="action-btn share-btn"
                                onClick={async () => {
                                    if (navigator.share) {
                                        try { await navigator.share({ title: "Join our Trip", text: "Join our travel group pool.", url: inviteLink }); }
                                        catch (err) { console.log(err); }
                                    } else { navigator.clipboard.writeText(inviteLink); alert("Copied!"); }
                                }}
                                style={{ flex: 1, padding: "10px", background: "#10b981", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500" }}
                            >
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Sidebar Pane Layout */}
            <aside className="master-sidebar-pane">
                <header className="app-branding-bar">
                    <div className="brand-text">
                        <span className="sub-tag">Registered trip details</span>
                        <h2>Trip list</h2>
                    </div>
                    <div className="profile-badge">SP</div>
                </header>
                <p className="pane-section-title">High-Priority Registries</p>
                <nav className="master-navigation-feed">
                    {triplist.length === 0 ? (
                        <p className="empty-message-text">No trips registered.</p>
                    ) : (
                        triplist.map((item) => {
                            const isSelected = item.id === selectedId;
                            const Icon = item.icon;
                            return (
                                <button key={item.id} className={`master-feed-card ${isSelected ? 'selected' : ''}`} onClick={() => handleItemClick(item.id)}>
                                    <div className="card-meta-row">
                                        <span className={`priority-tag ${item.badgeClass}`}>{item.priority}</span>
                                        <span className="counter-pill">{item.remaining}d remaining</span>
                                    </div>
                                    <div className="card-title-row">
                                        <Icon className="card-icon" size={20} />
                                        <h3>{item.tripname}</h3>
                                    </div>
                                    <p>{item.summary}</p>
                                </button>
                            );
                        })
                    )}
                </nav>
            </aside>

            <div className="pro-page">
                <div className="pro-container">
                    <div className="group-hero">
                        <div className="hero-overlay"></div>
                        <div className="hero-content">
                            <div>
                                <span className="hero-badge">Active Travel Group</span>
                                <h1>
                                    {dashboardItems.tripname} Vacation {dashboardItems.year}</h1>
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



                    {/* Unified Metric Grid Cards */}
                    <div className="stats-grid">
                        <div className="pro-card stat-card"><p>Goal Amount</p><h2>₹{dashboardItems.goalamount}</h2><span>Target budget</span></div>
                        <div className="pro-card stat-card"><p>Current Contributions</p><h2 style={{ color: '#28a745' }}>₹{contributionAmount}</h2><span>Collected pool</span></div>
                        <div className="pro-card stat-card"><p>Trip Expenses</p><h2 style={{ color: '#dc3545' }}>₹{totalAmount}</h2><span>Total spent</span></div>
                        <div className="pro-card stat-card"><p>In-Hand Pool</p><h2 style={{ color: tripBalance >= 0 ? '#28a745' : '#dc3545' }}>₹{tripBalance >= 0 ? tripBalance : 0}</h2><span>Remaining cash</span></div>
                    </div>

                    <div className="main-grid">
                        <div className="left-section" style={{ width: '100%', marginBottom: '20px' }}>
                            <div className="pro-card" style={{ background: '#1e293b', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                                <div className="section-header" style={{ borderBottom: '1px solid #334155', paddingBottom: '12px', marginBottom: '16px' }}>
                                    <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#f8fafc', margin: 0 }}>Members Ledger & Balance Allocation</h2>
                                </div>
                                <div className="members-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {(!members || members.filter(m => m.status === 'approved').length === 0) ? (
                                        <p className="empty-state-text" style={{ color: '#94a3b8', textAlign: 'center', padding: '20px 0', margin: 0 }}>No active members found in this group.</p>
                                    ) : (
                                        members.filter(m => m.status === 'approved').map((member, index) => {
                                            const memberId = member.user?._id || member.user;
                                            const memberName = member.user?.name || "Group Member";
                                            const initial = memberName.charAt(0).toUpperCase();

                                            const balanceData = memberBalances.find(b => b.userId === memberId) || {
                                                netBalance: 0, contribution: 0, expensePaid: 0, splitAmount: 0,
                                                paidExpensesList: [], consumedSplitsList: []
                                            };

                                            const isExpanded = expandedMemberId === memberId;

                                            return (
                                                <div className="member-accordion-wrapper" key={memberId || index} style={{ background: '#0f172a', borderRadius: '8px', border: '1px solid #334155', overflow: 'hidden' }}>
                                                    {/* Header Accordion Row */}
                                                    <div className={`member-row ${isExpanded ? 'active' : ''}`} onClick={() => toggleMemberExpand(memberId)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', cursor: 'pointer', userSelect: 'none', transition: 'background 0.2s' }}>
                                                        <div className="member-left" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                            <div className="avatar" style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#3b82f6', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '14px' }}>{initial}</div>
                                                            <div>
                                                                <h4 className="member-name-title" style={{ color: '#f8fafc', fontSize: '15px', fontWeight: '500', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                    {memberName}
                                                                    <span style={{ color: '#94a3b8', display: 'inline-flex', alignItems: 'center' }}>
                                                                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                                                    </span>
                                                                </h4>
                                                                <p className="role-subtext" style={{ color: '#64748b', fontSize: '12px', margin: '2px 0 0 0' }}>{index === 0 ? "Admin / Manager" : "Participant"}</p>
                                                            </div>
                                                        </div>
                                                        <div className="member-right" style={{ textAlign: 'right' }}>
                                                            <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', tracking: '0.05em', display: 'block' }}>Net Status</span>
                                                            <h3 style={{ color: balanceData.netBalance >= 0 ? '#10b981' : '#ef4444', fontSize: '16px', fontWeight: '600', margin: '2px 0 0 0' }}>
                                                                {balanceData.netBalance >= 0 ? '+' : ''}₹{Number(balanceData.netBalance).toFixed(2)}
                                                            </h3>
                                                        </div>
                                                    </div>

                                                    {/* Collapsible Deep-Dive Details Pane */}
                                                    {isExpanded && (
                                                        <div className="member-expanded-details" style={{ padding: '16px', background: '#090d16', borderTop: '1px solid #334155' }}>
                                                            {/* Micro Financial Performance Cards */}
                                                            <div className="micro-cards-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                                                                <div className="micro-card" style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                                    <span className="green-txt" style={{ color: '#10b981', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}><Wallet size={12} /> Paid Pool</span>
                                                                    <strong style={{ color: '#f8fafc', fontSize: '14px', fontWeight: '600' }}>₹{balanceData.contribution}</strong>
                                                                </div>
                                                                <div className="micro-card" style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                                    <span className="blue-txt" style={{ color: '#3b82f6', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}><Receipt size={12} /> Paid Spent</span>
                                                                    <strong style={{ color: '#f8fafc', fontSize: '14px', fontWeight: '600' }}>₹{balanceData.expensePaid}</strong>
                                                                </div>
                                                                <div className="micro-card" style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                                    <span className="red-txt" style={{ color: '#ef4444', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}><PieChart size={12} /> Owed Share</span>
                                                                    <strong style={{ color: '#f8fafc', fontSize: '14px', fontWeight: '600' }}>₹{balanceData.splitAmount}</strong>
                                                                </div>
                                                            </div>

                                                            {/* Split Columns Grid System */}
                                                            <div className="itemized-breakdown-columns" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                                                {/* Column 1: Purchases Out-of-Pocket */}
                                                                <div className="ledger-column">
                                                                    <h5 style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '600', margin: '0 0 8px 0', borderBottom: '1px solid #1e293b', paddingBottom: '4px' }}>Purchases Advanced ({balanceData.paidExpensesList.length})</h5>
                                                                    {balanceData.paidExpensesList.length === 0 ? (
                                                                        <p className="no-item-fallback" style={{ color: '#475569', fontSize: '12px', fontStyle: 'italic', margin: 0 }}>No dynamic items advanced.</p>
                                                                    ) : (
                                                                        <ul className="itemized-list" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                                            {balanceData.paidExpensesList.map((item, idx) => (
                                                                                <li key={idx} className="itemized-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1e293b', padding: '6px 10px', borderRadius: '4px', fontSize: '12px' }}>
                                                                                    <span style={{ color: '#cbd5e1' }}>{item.description}</span>
                                                                                    <span className="blue-txt font-semibold" style={{ color: '#3b82f6', fontWeight: '600' }}>₹{item.amount}</span>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    )}
                                                                </div>

                                                                {/* Column 2: Account Split Liability Shares */}
                                                                <div className="ledger-column">
                                                                    <h5 style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '600', margin: '0 0 8px 0', borderBottom: '1px solid #1e293b', paddingBottom: '4px' }}>Allocated Liability ({balanceData.consumedSplitsList.length})</h5>
                                                                    {balanceData.consumedSplitsList.length === 0 ? (
                                                                        <p className="no-item-fallback" style={{ color: '#475569', fontSize: '12px', fontStyle: 'italic', margin: 0 }}>No allocations tracked.</p>
                                                                    ) : (
                                                                        <ul className="itemized-list" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                                            {balanceData.consumedSplitsList.map((item, idx) => (
                                                                                <li key={idx} className="itemized-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1e293b', padding: '6px 10px', borderRadius: '4px', fontSize: '12px' }}>
                                                                                    <span style={{ color: '#cbd5e1' }}>{item.description}</span>
                                                                                    <span className="red-txt font-semibold" style={{ color: '#ef4444', fontWeight: '600' }}>₹{Number(item.share).toFixed(2)}</span>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Visual Progress Widgets Side Column */}
                        <div className="right-section">
                            <div className="pro-card target-progress-alignment">
                                <h2>Budget Pool Progress</h2>
                                <div className="budget-circle" style={{ background: `conic-gradient(#28a745 ${graphamount}%, #e2e8f0 ${graphamount}% 100%)` }}>
                                    <div className="budget-inner">
                                        <h2>{graphamount}%</h2>
                                        <p>Goal Completed</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pro-card">
                                <h2 className="timeline-title">Live Account Audit Log</h2>
                                <div className="timeline">
                                    {transactionHistory.length > 0 ? (
                                        transactionHistory.map((item) => (
                                            <div className="timeline-item" key={item._id}>
                                                <div className="timeline-dot"></div>
                                                <div className="timeline-text-block">
                                                    <h4>
                                                        {item.paidBy?.name || "A member"}{" "}
                                                        {item.type === "contribution" ? `added ₹${item.amount}` : `spent ₹${item.amount}`}
                                                    </h4>
                                                    <p>{item.description} • {new Date(item.createdAt).toLocaleDateString('en-IN')}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="no-item-fallback">No logged transactions found for this trip.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}