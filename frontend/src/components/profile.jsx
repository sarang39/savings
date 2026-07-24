// // // import axios from "axios";
// // // import "./profile.css";
// // // import { useContext, useEffect, useState } from "react";
// // // import { MyContext } from "./Mycontext";
// // // import { useNavigate } from "react-router-dom";
// // // import photo1 from "./images/Screenshot 2026-03-19 122942.png"
// // // import photo2 from "./images/Screenshot 2026-03-19 123007.png"
// // // import photo3 from "./images/Screenshot 2026-03-19 123023.png"
// // // import { useParams } from "react-router-dom";
// // // import { PieChart, Pie, Cell, Tooltip } from "recharts";

// // // export default function Profile() {
// // //     const COLORS = ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#6b7280"];
// // //     const navigate = useNavigate();
// // //     const [newname, setnewname] = useState()
// // //     const [payment, setpayment] = useState(50)
// // //     const [graphdata, setgraphdata] = useState([
// // //         { name: "Housing", value: 1450 },
// // //         { name: "Food", value: 850 },
// // //         { name: "Transport", value: 620 },
// // //         { name: "Entertainment", value: 480 },
// // //         { name: "Others", value: 830 }
// // //     ])
// // //     const token = localStorage.getItem("AuthToken");
// // //     const {
// // //         userData,
// // //         setUserData,
// // //         edit,
// // //         setedit,
// // //         wallet,
// // //         setwallet,
// // //         addpayment,
// // //         setaddpayment,
// // //         transactonData,
// // //         settransactionData
// // //     }
// // //         = useContext(MyContext)
// // //     const { id } = useParams()
// // //     const totalAmount = transactonData.reduce(
// // //         (sum, item) => sum + item.weeklypayment, 0
// // //     );
// // //     async function totaldetails() {
// // //         try {
// // //             const response = await axios.get(`${process.env.REACT_APP_API}/api/transactions/allcalculations`)
// // //             setwallet(response.data.wallet)
// // //             setgraphdata([
// // //                 { name: "weekly payment total:", value: response.data.weeklypaymenttotal },
// // //                 { name: "weekly payment fine total", value: response.data.weeklypaymentfine },
// // //                 { name: "wallet", value: response.data.wallet },

// // //             ])

// // //         }
// // //         catch (err) {
// // //             console.log(err)
// // //         }
// // //     }

// // //     async function usertrnsation() {
// // //         try {
// // //             const response = await axios.get(`${process.env.REACT_APP_API}/api/transactions/gettransaction/${id}`, {
// // //                 headers: { Authorization: `Bearer ${token}` }
// // //             });
// // //             settransactionData(response.data)
// // //             console.log("transaction response", response.message)
// // //         }
// // //         catch (err) {
// // //             console.error("error fetching transaction", err);
// // //         }
// // //     }

// // //     async function getProfilepermenet() {
// // //         try {
// // //             if (!token) {
// // //                 console.error("No token found in storage");
// // //                 return;
// // //             }
// // //             const response = await axios.get(`${process.env.REACT_APP_API}/api/users/profileper`, {
// // //                 headers: { Authorization: `Bearer ${token}` }
// // //             })
// // //             setUserData(response.data)
// // //             usertrnsation()
// // //             console.log("profile response:::", response.data);
// // //             if (typeof transactionData !== 'undefined') {
// // //                 console.log("Transaction Data::::", transactonData);
// // //             }
// // //         }
// // //         catch (err) {
// // //             console.error("error fetching profile:::", err);
// // //         }

// // //     }

// // //     async function Edituser() {
// // //         try {
// // //             const response = await axios.put(`${process.env.REACT_APP_API}/api/users/edituser/${id}`, { name: newname }, {
// // //                 headers: { Authorization: `Bearer ${token}` }
// // //             });
// // //             if (response.status === 200) {
// // //                 alert("successfully changed")
// // //                 setedit(0)

// // //             }
// // //         }
// // //         catch (err) {
// // //         }
// // //     }
// // //     //re-payment
// // //     async function RePay(id) {
// // //         try {
// // //             const response = await axios.put(`${process.env.REACT_APP_API}/api/transactions/editpayment/${id}`,
// // //                 {
// // //                     weeklypayment: payment,
// // //                     paymentid: id
// // //                 },
// // //                 {
// // //                     headers: { Authorization: `Bearer ${token}` }
// // //                 });
// // //             if (response.status === 200) {
// // //                 // getProfileANDtransactions();
// // //                 getProfilepermenet();
// // //                 alert("successfully changed");


// // //             }
// // //             if (response.status === 403) {
// // //                 alert("Your not admin");


// // //             }
// // //         }
// // //         catch (err) {
// // //             if (err.status === 403) {
// // //                 alert("Your not admin");


// // //             }
// // //         }
// // //     }
// // //     useEffect(() => {
// // //         // getProfileANDtransactions();

// // //         getProfilepermenet();
// // //         totaldetails()
// // //     }, [id]);
// // //     return (
// // //         <div style={{
// // //             paddingTop: '20px'
// // //         }} >
// // //             <div >
// // //             </div>
// // //             {edit === 0 ? (

// // //                 <div className="details">
// // //                     <div>
// // //                         <div className="left">
// // //                             <div className="profile-card">
// // //                                 {userData && typeof userData === 'object' ?
// // //                                     (
// // //                                         <div>
// // //                                             <div className="profile-image-wrapper">
// // //                                                 {console.log("photo path", userData.photo)}<img
// // //                                                     src={
// // //                                                         userData.photo
// // //                                                             ? userData.photo
// // //                                                             : "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-transparent-600nw-2463868847.jpg"
// // //                                                     }
// // //                                                     alt="profile" />
// // //                                             </div>
// // //                                             <div>
// // //                                                 <h2 className="profile-name">{userData.name}</h2>
// // //                                                 <p className="profile-role">{userData.email}</p>
// // //                                                 <p className="profile-phone">{userData.phonenumber}</p>
// // //                                                 <p className="profile-location">New York, NY</p>
// // //                                             </div>
// // //                                         </div>
// // //                                     ) : (
// // //                                         <p>Loading...</p>
// // //                                     )}
// // //                             </div>
// // //                         </div>

// // //                         <div style={{
// // //                             width: "350px",
// // //                             height: "auto",
// // //                             background: "#0f172a",
// // //                             borderRadius: "20px",
// // //                             padding: "20px",
// // //                             color: "white",
// // //                             marginTop: "20px"
// // //                         }}>
// // //                             <h3>Amount Overview</h3>

// // //                             <PieChart width={300} height={300}>
// // //                                 <Pie
// // //                                     data={graphdata}
// // //                                     cx="50%"
// // //                                     cy="50%"
// // //                                     innerRadius={70}   // makes it donut
// // //                                     outerRadius={100}
// // //                                     paddingAngle={3}
// // //                                     dataKey="value"
// // //                                 >
// // //                                     {graphdata.map((entry, index) => (
// // //                                         <Cell key={index} fill={COLORS[index]} />
// // //                                     ))}
// // //                                 </Pie>

// // //                                 <Tooltip />
// // //                             </PieChart>
// // //                             <div>
// // //                                 {graphdata.map((entry, index) => (
// // //                                     <div
// // //                                         key={index}
// // //                                         style={{
// // //                                             display: "flex",
// // //                                             alignItems: "center",
// // //                                             gap: "10px",
// // //                                             marginBottom: "8px",
// // //                                         }}
// // //                                     >
// // //                                         {/* Small color cube */}
// // //                                         <div
// // //                                             style={{
// // //                                                 width: "15px",
// // //                                                 height: "15px",
// // //                                                 backgroundColor: COLORS[index],
// // //                                                 borderRadius: "3px",
// // //                                             }}
// // //                                         ></div>

// // //                                         {/* Text */}
// // //                                         <span>
// // //                                             {entry.name}
// // //                                         </span>
// // //                                     </div>
// // //                                 ))}
// // //                             </div>
// // //                         </div>
// // //                     </div>
// // //                     <div className="right">
// // //                         <div className="amounts">
// // //                             <div style={{ background: "linear-gradient(130deg, #1f1a70, #000000)" }}>
// // //                                 <div>{wallet}</div>
// // //                                 <div>
// // //                                     <img src={photo1} alt="photo" />
// // //                                 </div>
// // //                             </div>
// // //                             <div style={{ background: "linear-gradient(130deg, #51b870, #000000)" }}>
// // //                                 <div>{totalAmount < wallet ? wallet - totalAmount : 0}</div>

// // //                                 <div>
// // //                                     <img src={photo2} alt="photo" />
// // //                                 </div>
// // //                             </div>
// // //                             <div style={{ background: 'linear-gradient(130deg, #780606,black)' }}>
// // //                                 <div>{totalAmount > wallet ? wallet - totalAmount : 0}</div>
// // //                                 <div>
// // //                                     <img src={photo3} alt="photo" />
// // //                                 </div>
// // //                             </div>
// // //                         </div>
// // //                         <div className="transaction-details">
// // //                             <p>transaction details</p>
// // //                             <table className="transaction-table">
// // //                                 <thead>
// // //                                     <tr>
// // //                                         <th>Date</th>
// // //                                         <th>Amount</th>
// // //                                         <th>Fine</th>
// // //                                         <th>Loan</th>
// // //                                         <th>
// // //                                             <button
// // //                                                 style={{ width: '50%', height: '100%', fontSize: "1rem" }}
// // //                                                 onClick={() => setaddpayment(true)}
// // //                                             >
// // //                                                 ⚙️
// // //                                             </button>
// // //                                         </th>
// // //                                     </tr>
// // //                                 </thead>
// // //                                 <tbody>
// // //                                     {transactonData.map((item) => (
// // //                                         <tr key={item._id}>
// // //                                             <td>{item.date.split('T')[0]}</td>
// // //                                             <td>{item.weeklypayment}</td>
// // //                                             <td>{item.weeklypaymentfine}</td>
// // //                                             <td>{item.loan}</td>
// // //                                             {addpayment && item.weeklypayment === 0 ? (
// // //                                                 <td style={{ display: "flex", gap: '10px' }}>
// // //                                                     <button style={{ width: '50%', height: '100%', fontSize: "1rem" }}>
// // //                                                         Delete
// // //                                                     </button>
// // //                                                     <button
// // //                                                         style={{ width: '50%', height: '100%', fontSize: "1rem" }}
// // //                                                         onClick={() => RePay(item._id)}
// // //                                                     >
// // //                                                         Re-pay
// // //                                                     </button>
// // //                                                 </td>
// // //                                             ) : (
// // //                                                 <td></td>
// // //                                             )}
// // //                                         </tr>
// // //                                     ))}
// // //                                 </tbody>
// // //                             </table>
// // //                         </div>
// // //                     </div>
// // //                 </div>) : (
// // //                 <div style={{
// // //                     width: "100%", height: "100vh", alignItems: 'center', justifyContent: 'center', display: ' flex'
// // //                 }}>
// // //                     <div style={{ width: "50vw" }}>
// // //                         {
// // //                             userData && typeof userData === 'object' ?
// // //                                 (
// // //                                     <div>
// // //                                         <div className="profile-image-wrapper">
// // //                                             <img
// // //                                                 src={
// // //                                                     userData.photo
// // //                                                         ? `${process.env.REACT_APP_API}${userData.photo}`
// // //                                                         : "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-transparent-600nw-2463868847.jpg"
// // //                                                 }
// // //                                                 alt="profile"
// // //                                             />
// // //                                         </div>
// // //                                         <div className="" style={{
// // //                                             alignItems: 'center', justifyContent: 'center', display: ' flex'
// // //                                         }} >
// // //                                             <form onSubmit={Edituser}>
// // //                                                 <h1 >EDIT</h1>
// // //                                                 <label htmlFor="Email">name <input type="name" placeholder="name" onChange={(e) => (setnewname(e.target.value))} /></label>
// // //                                                 <label htmlFor="tel">phone  <input type="tel" /></label>
// // //                                                 {console.log(userData)}
// // //                                                 <button type="submit" >SAVE</button>
// // //                                             </form>
// // //                                         </div>
// // //                                     </div>
// // //                                 ) : (
// // //                                     <p>Loading...</p>
// // //                                 )
// // //                         }
// // //                     </div>
// // //                 </div >)
// // //             }
// // //             <div> </div>

// // //         </div >
// // //     )
// // // }
// // import axios from "axios";
// // import "./profile.css";
// // import { useContext, useEffect, useState } from "react";
// // import { MyContext } from "./Mycontext";
// // import { useNavigate } from "react-router-dom";
// // import photo1 from "./images/Screenshot 2026-03-19 122942.png";
// // import photo2 from "./images/Screenshot 2026-03-19 123007.png";
// // import photo3 from "./images/Screenshot 2026-03-19 123023.png";
// // import { useParams } from "react-router-dom";
// // import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// // export default function Profile() {
// //     const COLORS = ["#6366F1", "#8B5CF6", "#06B6D4", "#F59E0B", "#10B981"];
// //     const navigate = useNavigate();
// //     const [newname, setnewname] = useState("");
// //     const [payment, setpayment] = useState(50);
// //     const [graphdata, setgraphdata] = useState([
// //         { name: "Housing", value: 1450 },
// //         { name: "Food", value: 850 },
// //         { name: "Transport", value: 620 },
// //         { name: "Entertainment", value: 480 },
// //         { name: "Others", value: 830 },
// //     ]);

// //     const token = localStorage.getItem("AuthToken");
// //     const {
// //         userData,
// //         setUserData,
// //         edit,
// //         setedit,
// //         wallet,
// //         setwallet,
// //         addpayment,
// //         setaddpayment,
// //         transactonData,
// //         settransactionData,
// //     } = useContext(MyContext);
// //     const { id } = useParams();

// //     const totalAmount = transactonData.reduce(
// //         (sum, item) => sum + item.weeklypayment,
// //         0
// //     );

// //     async function totaldetails() {
// //         try {
// //             const response = await axios.get(
// //                 `${process.env.REACT_APP_API}/api/transactions/allcalculations`
// //             );
// //             setwallet(response.data.wallet);
// //             setgraphdata([
// //                 { name: "Weekly Payment Total", value: response.data.weeklypaymenttotal },
// //                 { name: "Weekly Fine Total", value: response.data.weeklypaymentfine },
// //                 { name: "Wallet Balance", value: response.data.wallet },
// //             ]);
// //         } catch (err) {
// //             console.log(err);
// //         }
// //     }

// //     async function usertrnsation() {
// //         try {
// //             const response = await axios.get(
// //                 `${process.env.REACT_APP_API}/api/transactions/gettransaction/${id}`,
// //                 { headers: { Authorization: `Bearer ${token}` } }
// //             );
// //             settransactionData(response.data);
// //         } catch (err) {
// //             console.error("Error fetching transaction", err);
// //         }
// //     }

// //     async function getProfilepermenet() {
// //         try {
// //             if (!token) {
// //                 console.error("No token found in storage");
// //                 return;
// //             }
// //             const response = await axios.get(
// //                 `${process.env.REACT_APP_API}/api/users/profileper`,
// //                 { headers: { Authorization: `Bearer ${token}` } }
// //             );
// //             setUserData(response.data);
// //             usertrnsation();
// //         } catch (err) {
// //             console.error("Error fetching profile", err);
// //         }
// //     }

// //     async function Edituser() {
// //         try {
// //             const response = await axios.put(
// //                 `${process.env.REACT_APP_API}/api/users/edituser/${id}`,
// //                 { name: newname },
// //                 { headers: { Authorization: `Bearer ${token}` } }
// //             );
// //             if (response.status === 200) {
// //                 alert("Successfully updated profile");
// //                 setedit(0);
// //                 getProfilepermenet();
// //             }
// //         } catch (err) {
// //             console.error(err);
// //         }
// //     }

// //     async function RePay(id) {
// //         try {
// //             const response = await axios.put(
// //                 `${process.env.REACT_APP_API}/api/transactions/editpayment/${id}`,
// //                 { weeklypayment: payment, paymentid: id },
// //                 { headers: { Authorization: `Bearer ${token}` } }
// //             );
// //             if (response.status === 200) {
// //                 getProfilepermenet();
// //                 alert("Payment successful");
// //             }
// //         } catch (err) {
// //             if (err.response?.status === 403) {
// //                 alert("You are not an Admin");
// //             }
// //         }
// //     }

// //     useEffect(() => {
// //         getProfilepermenet();
// //         totaldetails();
// //     }, [id]);

// //     return (
// //         <div className="pro-page">
// //             <div className="pro-container">
// //                 {edit === 0 ? (
// //                     <div className="main-grid">
// //                         {/* LEFT SECTION */}
// //                         <div className="left-section">
// //                             {/* Profile Card */}
// //                             <div className="pro-card user-profile-card">
// //                                 {userData && typeof userData === "object" ? (
// //                                     <div className="profile-wrapper-layout">
// //                                         <div className="avatar-wrapper">
// //                                             <img
// //                                                 src={
// //                                                     userData.photo
// //                                                         ? userData.photo
// //                                                         : "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-transparent-600nw-2463868847.jpg"
// //                                                 }
// //                                                 alt="Profile avatar"
// //                                             />
// //                                         </div>
// //                                         <div className="profile-details-text">
// //                                             <h2>{userData.name}</h2>
// //                                             <p className="user-email">{userData.email}</p>
// //                                             <p className="user-phone">{userData.phonenumber}</p>
// //                                             <span className="user-badge">Active Member</span>
// //                                         </div>
// //                                         <button className="small-btn edit-toggle-btn" onClick={() => setedit(1)}>
// //                                             Edit Profile
// //                                         </button>
// //                                     </div>
// //                                 ) : (
// //                                     <p>Loading user details...</p>
// //                                 )}
// //                             </div>

// //                             {/* Chart Component Panel */}
// //                             <div className="pro-card chart-panel">
// //                                 <h3>Amount Overview</h3>
// //                                 <div className="chart-container-box">
// //                                     <ResponsiveContainer width="100%" height={220}>
// //                                         <PieChart>
// //                                             <Pie
// //                                                 data={graphdata}
// //                                                 cx="50%"
// //                                                 cy="50%"
// //                                                 innerRadius={65}
// //                                                 outerRadius={90}
// //                                                 paddingAngle={4}
// //                                                 dataKey="value"
// //                                             >
// //                                                 {graphdata.map((entry, index) => (
// //                                                     <Cell key={index} fill={COLORS[index % COLORS.length]} />
// //                                                 ))}
// //                                             </Pie>
// //                                             <Tooltip />
// //                                         </PieChart>
// //                                     </ResponsiveContainer>
// //                                 </div>
// //                                 <div className="chart-legend-list">
// //                                     {graphdata.map((entry, index) => (
// //                                         <div key={index} className="legend-item">
// //                                             <div
// //                                                 className="legend-cube"
// //                                                 style={{ backgroundColor: COLORS[index % COLORS.length] }}
// //                                             ></div>
// //                                             <span>{entry.name}</span>
// //                                         </div>
// //                                     ))}
// //                                 </div>
// //                             </div>
// //                         </div>

// //                         {/* RIGHT SECTION */}
// //                         <div className="right-section">
// //                             {/* Financial Balance Status Cards */}
// //                             <div className="stats-grid">
// //                                 <div className="stat-card balance-card-wallet">
// //                                     <p>Wallet Balance</p>
// //                                     <h2>₹{wallet}</h2>
// //                                     <img src={photo1} alt="Wallet Icon" />
// //                                 </div>
// //                                 <div className="stat-card balance-card-surplus">
// //                                     <p>Remaining Surplus</p>
// //                                     <h2>₹{totalAmount < wallet ? wallet - totalAmount : 0}</h2>
// //                                     <img src={photo2} alt="Surplus Icon" />
// //                                 </div>
// //                                 <div className="stat-card balance-card-deficit">
// //                                     <p>Deficit / Dues</p>
// //                                     <h2>₹{totalAmount > wallet ? wallet - totalAmount : 0}</h2>
// //                                     <img src={photo3} alt="Deficit Icon" />
// //                                 </div>
// //                             </div>

// //                             {/* Modernized Interactive Data Table */}
// //                             <div className="pro-card table-section">
// //                                 <div className="table-header">
// //                                     <h3>Transaction History</h3>
// //                                     <button
// //                                         className="small-btn config-btn"
// //                                         onClick={() => setaddpayment(!addpayment)}
// //                                     >
// //                                         ⚙️ Options
// //                                     </button>
// //                                 </div>
// //                                 <div className="table-wrapper">
// //                                     <table className="expense-table">
// //                                         <thead>
// //                                             <tr>
// //                                                 <th>Date</th>
// //                                                 <th>Amount</th>
// //                                                 <th>Fine</th>
// //                                                 <th>Loan Status</th>
// //                                                 {addpayment && <th>Actions</th>}
// //                                             </tr>
// //                                         </thead>
// //                                         <tbody>
// //                                             {transactonData.map((item) => (
// //                                                 <tr key={item._id}>
// //                                                     <td>{item.date?.split("T")[0]}</td>
// //                                                     <td>₹{item.weeklypayment}</td>
// //                                                     <td>₹{item.weeklypaymentfine}</td>
// //                                                     <td>
// //                                                         <span className={item.loan > 0 ? "loan-active" : "loan-none"}>
// //                                                             {item.loan > 0 ? `₹${item.loan}` : "No Loans"}
// //                                                         </span>
// //                                                     </td>
// //                                                     {addpayment && (
// //                                                         <td>
// //                                                             <div className="table-action-group">
// //                                                                 <button className="table-del-btn">Delete</button>
// //                                                                 {item.weeklypayment === 0 && (
// //                                                                     <button
// //                                                                         className="table-pay-btn"
// //                                                                         onClick={() => RePay(item._id)}
// //                                                                     >
// //                                                                         Re-pay
// //                                                                     </button>
// //                                                                 )}
// //                                                             </div>
// //                                                         </td>
// //                                                     )}
// //                                                 </tr>
// //                                             ))}
// //                                         </tbody>
// //                                     </table>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 ) : (
// //                     /* PROFILE EDIT VIEW MODE */
// //                     <div className="create-page" style={{ minHeight: "80vh", padding: 0 }}>
// //                         <div className="create-form-card" style={{ maxWidth: "600px", margin: "0 auto" }}>
// //                             <h2>Edit User Profile</h2>
// //                             <p className="form-subtitle">Update your profile identity records here.</p>
// //                             {userData && typeof userData === "object" ? (
// //                                 <form
// //                                     onSubmit={(e) => {
// //                                         e.preventDefault();
// //                                         Edituser();
// //                                     }}
// //                                 >
// //                                     <div className="avatar-wrapper edit-mode-avatar">
// //                                         <img
// //                                             src={
// //                                                 userData.photo
// //                                                     ? `${process.env.REACT_APP_API}${userData.photo}`
// //                                                     : "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-transparent-600nw-2463868847.jpg"
// //                                             }
// //                                             alt="Profile preview"
// //                                         />
// //                                     </div>
// //                                     <div className="form-group">
// //                                         <label>Full Name</label>
// //                                         <input
// //                                             type="text"
// //                                             placeholder="Enter new profile name"
// //                                             defaultValue={userData.name}
// //                                             onChange={(e) => setnewname(e.target.value)}
// //                                             required
// //                                         />
// //                                     </div>
// //                                     <div className="form-group">
// //                                         <label>Phone Number</label>
// //                                         <input
// //                                             type="tel"
// //                                             placeholder="Enter mobile phone string"
// //                                             defaultValue={userData.phonenumber}
// //                                             disabled
// //                                         />
// //                                     </div>
// //                                     <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
// //                                         <button type="submit" className="create-btn">
// //                                             Save Layout
// //                                         </button>
// //                                         <button
// //                                             type="button"
// //                                             className="secondary-btn"
// //                                             style={{ width: "100%", borderRadius: "18px" }}
// //                                             onClick={() => setedit(0)}
// //                                         >
// //                                             Cancel
// //                                         </button>
// //                                     </div>
// //                                 </form>
// //                             ) : (
// //                                 <p>Loading layout editor configurations...</p>
// //                             )}
// //                         </div>
// //                     </div>
// //                 )}
// //             </div>
// //         </div>
// //     );

// // }
// import axios from "axios";
// import "./profile.css";
// import { useContext, useEffect, useState } from "react";
// import { MyContext } from "./Mycontext";
// import { useParams, useNavigate } from "react-router-dom";
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
// import photo1 from "./images/Screenshot 2026-03-19 122942.png";
// import photo2 from "./images/Screenshot 2026-03-19 123007.png";
// import photo3 from "./images/Screenshot 2026-03-19 123023.png";

// export default function Profile() {
//     const COLORS = ["#8B5CF6", "#3B82F6", "#10B981", "#EF4444"];
//     const navigate = useNavigate();
//     const { id } = useParams(); // target user id
//     const token = localStorage.getItem("AuthToken");

//     const {
//         userData,
//         setUserData,
//         edit,
//         setedit,
//         transactonData,
//         settransactionData,
//     } = useContext(MyContext);

//     const [newName, setNewName] = useState("");

//     // Core Trip Metric States mapped from GroupDetails calculations
//     const [tripMetrics, setTripMetrics] = useState({
//         walletBalance: 0,
//         totalContribution: 0,
//         totalExpense: 0,
//         netBalance: 0,
//         surplus: 0,
//         deficit: 0
//     });

//     const [graphData, setGraphData] = useState([]);

//     async function fetchUserProfileAndTripData() {
//         try {
//             if (!token) return;

//             // 1. Fetch Basic Profile Details
//             const profileResponse = await axios.get(`${process.env.REACT_APP_API}/api/users/profileper`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setUserData(profileResponse.data);

//             // 2. Fetch specific transactional data for this user ID
//             const txResponse = await axios.get(`${process.env.REACT_APP_API}/api/transactions/gettransaction/${id}`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             settransactionData(txResponse.data);

//             // 3. Extract the active/relevant trip ID from the user context or transactions to get aggregate sums
//             // For dashboard calculation, we use the trip reference from the user's logged records if available
//             if (txResponse.data && txResponse.data.length > 0) {
//                 const activeTripId = txResponse.data[0].trip?._id || txResponse.data[0].trip;
//                 if (activeTripId) {
//                     calculateTripSummary(activeTripId, profileResponse.data._id);
//                 }
//             }
//         } catch (err) {
//             console.error("Error standardizing profile details collection:", err);
//         }
//     }

//     async function calculateTripSummary(tripId, systemUserId) {
//         try {
//             const response = await axios.get(
//                 `${process.env.REACT_APP_API}/api/transactions/TripTotalExpenseAmount/${tripId}`,
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             const { totalAmount, contributionAmount, memberBalances } = response.data;

//             // Find current user's computed allocations out of the collective team array
//             const currentUserAllocations = memberBalances.find(b => b.userId === systemUserId) || {
//                 contribution: 0,
//                 expensePaid: 0,
//                 splitAmount: 0,
//                 netBalance: 0
//             };

//             const userContribution = currentUserAllocations.contribution;
//             const userOwedExpenseShare = currentUserAllocations.splitAmount;
//             const userNetStatus = currentUserAllocations.netBalance;

//             setTripMetrics({
//                 walletBalance: userContribution,
//                 totalContribution: contributionAmount,
//                 totalExpense: totalAmount,
//                 netBalance: userOwedExpenseShare,
//                 surplus: userNetStatus > 0 ? userNetStatus : 0,
//                 deficit: userNetStatus < 0 ? Math.abs(userNetStatus) : 0
//             });

//             // Map data structure variables dynamically into the Recharts donut display
//             setGraphData([
//                 { name: "Your Pool Contribution", value: userContribution },
//                 { name: "Your Settled Expenses", value: currentUserAllocations.expensePaid },
//                 { name: "Your Owed Share Liability", value: userOwedExpenseShare }
//             ]);

//         } catch (err) {
//             console.error("Failed executing calculations dashboard mapping:", err);
//         }
//     }

//     async function handleEditProfileSubmit(e) {
//         e.preventDefault();
//         try {
//             const response = await axios.put(
//                 `${process.env.REACT_APP_API}/api/users/edituser/${id}`,
//                 { name: newName },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             if (response.status === 200) {
//                 alert("Identity layout successfully changed.");
//                 setedit(0);
//                 fetchUserProfileAndTripData();
//             }
//         } catch (err) {
//             console.error(err);
//         }
//     }

//     useEffect(() => {
//         fetchUserProfileAndTripData();
//     }, [id]);

//     return (
//         <div className="pro-page">
//             <div className="pro-container">
//                 {edit === 0 ? (
//                     <div className="main-grid">
//                         {/* LEFT MODULE - Profile Details & Donut Analytics */}
//                         <div className="left-section">
//                             <div className="pro-card user-profile-card">
//                                 {userData && typeof userData === "object" ? (
//                                     <div className="profile-wrapper-layout">
//                                         <div className="avatar-wrapper">
//                                             <img
//                                                 src={userData.photo || "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-transparent-600nw-2463868847.jpg"}
//                                                 alt="profile"
//                                             />
//                                         </div>
//                                         <div className="profile-details-text">
//                                             <h2>{userData.name}</h2>
//                                             <p className="user-email">{userData.email}</p>
//                                             <span className="user-badge">{userData.role || "Active Member"}</span>
//                                         </div>
//                                         <button className="small-btn edit-toggle-btn" onClick={() => setedit(1)}>
//                                             Edit Profile
//                                         </button>
//                                     </div>
//                                 ) : (
//                                     <p>Loading records...</p>
//                                 )}
//                             </div>

//                             <div className="pro-card chart-panel">
//                                 <h3>Personal Trip Share Allocation</h3>
//                                 <div className="chart-container-box">
//                                     <ResponsiveContainer width="100%" height={220}>
//                                         <PieChart>
//                                             <Pie
//                                                 data={graphData}
//                                                 cx="50%"
//                                                 cy="50%"
//                                                 innerRadius={65}
//                                                 outerRadius={90}
//                                                 paddingAngle={4}
//                                                 dataKey="value"
//                                             >
//                                                 {graphData.map((entry, index) => (
//                                                     <Cell key={index} fill={COLORS[index % COLORS.length]} />
//                                                 ))}
//                                             </Pie>
//                                             <Tooltip formatter={(value) => `₹${Number(value).toFixed(2)}`} />
//                                         </PieChart>
//                                     </ResponsiveContainer>
//                                 </div>
//                                 <div className="chart-legend-list">
//                                     {graphData.map((entry, index) => (
//                                         <div key={index} className="legend-item">
//                                             <div className="legend-cube" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
//                                             <span>{entry.name}: <strong>₹{entry.value.toFixed(2)}</strong></span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>

//                         {/* RIGHT MODULE - Calculated Data Summary Metrics */}
//                         <div className="right-section">
//                             <div className="stats-grid">
//                                 <div className="stat-card balance-card-wallet">
//                                     <p>Your Total Contribution Pool</p>
//                                     <h2>₹{tripMetrics.walletBalance.toFixed(2)}</h2>
//                                     <img src={photo1} alt="wallet" />
//                                 </div>
//                                 <div className="stat-card balance-card-surplus">
//                                     <p>Remaining Net Surplus</p>
//                                     <h2 style={{ color: '#10b981' }}>₹{tripMetrics.surplus.toFixed(2)}</h2>
//                                     <img src={photo2} alt="surplus" />
//                                 </div>
//                                 <div className="stat-card balance-card-deficit">
//                                     <p>Net Deficit / Dues Owed</p>
//                                     <h2 style={{ color: '#ef4444' }}>₹{tripMetrics.deficit.toFixed(2)}</h2>
//                                     <img src={photo3} alt="deficit" />
//                                 </div>
//                             </div>

//                             {/* User Specific Transaction History Log */}
//                             <div className="pro-card table-section">
//                                 <div className="table-header">
//                                     <h3>Your Transaction Records</h3>
//                                 </div>
//                                 <div className="table-wrapper">
//                                     <table className="expense-table">
//                                         <thead>
//                                             <tr>
//                                                 <th>Date</th>
//                                                 <th>Description</th>
//                                                 <th>Type</th>
//                                                 <th>Amount</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {transactonData && transactonData.length > 0 ? (
//                                                 transactonData.map((item) => (
//                                                     <tr key={item._id}>
//                                                         <td>{item.createdAt ? item.createdAt.split('T')[0] : 'N/A'}</td>
//                                                         <td>{item.description || "Shared Pool Adjustment"}</td>
//                                                         <td>
//                                                             <span className={`priority-tag ${item.type === 'expense' ? 'crit-badge' : 'std-badge'}`}>
//                                                                 {item.type}
//                                                             </span>
//                                                         </td>
//                                                         <td style={{ fontWeight: '600', color: item.type === 'expense' ? '#ef4444' : '#10b981' }}>
//                                                             ₹{item.amount}
//                                                         </td>
//                                                     </tr>
//                                                 ))
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="4" style={{ textAlign: 'center', color: '#64748b' }}>No personal records logged yet.</td>
//                                                 </tr>
//                                             )}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ) : (
//                     /* EDIT VIEW MODE SCREEN ENTRY */
//                     <div className="create-page" style={{ minHeight: "80vh" }}>
//                         <div className="create-form-card" style={{ maxWidth: "600px", margin: "0 auto" }}>
//                             <h2>Edit User Profile</h2>
//                             <form onSubmit={handleEditProfileSubmit}>
//                                 <div className="form-group">
//                                     <label>Full Name</label>
//                                     <input
//                                         type="text"
//                                         defaultValue={userData?.name}
//                                         onChange={(e) => setNewName(e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                                 <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
//                                     <button type="submit" className="create-btn">Save Layout</button>
//                                     <button type="button" className="secondary-btn" onClick={() => setedit(0)}>Cancel</button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// // }
// import axios from "axios";
// import "./profile.css";
// import { useContext, useEffect, useState } from "react";
// import { MyContext } from "./Mycontext";
// import { useParams, useNavigate } from "react-router-dom";
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
// import photo1 from "./images/Screenshot 2026-03-19 122942.png";
// import photo2 from "./images/Screenshot 2026-03-19 123007.png";
// import photo3 from "./images/Screenshot 2026-03-19 123023.png";

// export default function Profile() {
//     const COLORS = ["#8B5CF6", "#3B82F6", "#10B981", "#EF4444"];
//     const navigate = useNavigate();
//     const { id } = useParams(); // target user id
//     const token = localStorage.getItem("AuthToken");

//     const {
//         userData,
//         setUserData,
//         edit,
//         setedit,
//         transactonData,
//         settransactionData,
//     } = useContext(MyContext);

//     const [newName, setNewName] = useState("");

//     // Core Trip Metric States mapped from GroupDetails calculations
//     const [tripMetrics, setTripMetrics] = useState({
//         walletBalance: 0,
//         totalContribution: 0,
//         totalExpense: 0,
//         netBalance: 0,
//         surplus: 0,
//         deficit: 0
//     });

//     const [graphData, setGraphData] = useState([]);

//     async function fetchUserProfileAndTripData() {
//         try {
//             if (!token) return;

//             // 1. Fetch Basic Profile Details
//             const profileResponse = await axios.get(`${process.env.REACT_APP_API}/api/users/profileper`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setUserData(profileResponse.data);

//             // 2. Fetch specific transactional data for this user ID
//             const txResponse = await axios.get(`${process.env.REACT_APP_API}/api/transactions/gettransaction/${id}`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             settransactionData(txResponse.data);

//             // 3. Extract the active/relevant trip ID from the user context or transactions to get aggregate sums
//             if (txResponse.data && txResponse.data.length > 0) {
//                 const activeTripId = txResponse.data[0].trip?._id || txResponse.data[0].trip;
//                 if (activeTripId) {
//                     calculateTripSummary(activeTripId, profileResponse.data._id);
//                 }
//             } else if (profileResponse.data._id) {
//                 // Alternative context check if transaction logs are clean/empty
//                 calculateTripSummary("active", profileResponse.data._id);
//             }
//         } catch (err) {
//             console.error("Error standardizing profile details collection:", err);
//         }
//     }

//     async function calculateTripSummary(tripId, systemUserId) {
//         try {
//             // Using the getTripTotalExpenseAmount aggregation route from your controller
//             const response = await axios.get(
//                 `${process.env.REACT_APP_API}/api/transactions/TripTotalExpenseAmount/${tripId}`,
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             const { totalAmount, contributionAmount, memberBalances } = response.data;

//             // Find current user's computed allocations out of the collective team array
//             const currentUserAllocations = memberBalances.find(b => b.userId === systemUserId) || {
//                 contribution: 0,
//                 expensePaid: 0,
//                 splitAmount: 0,
//                 netBalance: 0
//             };

//             const userContribution = currentUserAllocations.contribution;
//             const userOwedExpenseShare = currentUserAllocations.splitAmount;
//             const userNetStatus = currentUserAllocations.netBalance;

//             setTripMetrics({
//                 walletBalance: userContribution, // Maps cleanly to 'Your Total Contribution Pool' card
//                 totalContribution: contributionAmount,
//                 totalExpense: totalAmount,
//                 netBalance: userNetStatus,
//                 surplus: userNetStatus > 0 ? userNetStatus : 0,
//                 deficit: userNetStatus < 0 ? Math.abs(userNetStatus) : 0
//             });

//             // Map variables dynamically into the Recharts display without mutating layout sizes
//             setGraphData([
//                 { name: "Your Pool Contribution", value: userContribution },
//                 { name: "Your Settled Expenses", value: currentUserAllocations.expensePaid },
//                 { name: "Your Owed Share Liability", value: userOwedExpenseShare }
//             ]);

//         } catch (err) {
//             console.error("Failed executing calculations dashboard mapping:", err);
//         }
//     }

//     async function handleEditProfileSubmit(e) {
//         e.preventDefault();
//         try {
//             const response = await axios.put(
//                 `${process.env.REACT_APP_API}/api/users/edituser/${id}`,
//                 { name: newName },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             if (response.status === 200) {
//                 alert("Identity layout successfully changed.");
//                 setedit(0);
//                 fetchUserProfileAndTripData();
//             }
//         } catch (err) {
//             console.error(err);
//         }
//     }

//     useEffect(() => {
//         fetchUserProfileAndTripData();
//     }, [id]);

//     return (
//         <div className="pro-page">
//             <div className="pro-container">
//                 {edit === 0 ? (
//                     <div className="main-grid">
//                         {/* LEFT MODULE - Profile Details & Donut Analytics */}
//                         <div className="left-section">
//                             <div className="pro-card user-profile-card">
//                                 {userData && typeof userData === "object" ? (
//                                     <div className="profile-wrapper-layout">
//                                         <div className="avatar-wrapper">
//                                             <img
//                                                 src={userData.photo || "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-transparent-600nw-2463868847.jpg"}
//                                                 alt="profile"
//                                             />
//                                         </div>
//                                         <div className="profile-details-text">
//                                             <h2>{userData.name}</h2>
//                                             <p className="user-email">{userData.email}</p>
//                                             <span className="user-badge">{userData.role || "Active Member"}</span>
//                                         </div>
//                                         <button className="small-btn edit-toggle-btn" onClick={() => setedit(1)}>
//                                             Edit Profile
//                                         </button>
//                                     </div>
//                                 ) : (
//                                     <p>Loading records...</p>
//                                 )}
//                             </div>

//                             <div className="pro-card chart-panel">
//                                 <h3>Personal Trip Share Allocation</h3>
//                                 <div className="chart-container-box">
//                                     <ResponsiveContainer width="100%" height={220}>
//                                         <PieChart>
//                                             <Pie
//                                                 data={graphData}
//                                                 cx="50%"
//                                                 cy="50%"
//                                                 innerRadius={65}
//                                                 outerRadius={90}
//                                                 paddingAngle={4}
//                                                 dataKey="value"
//                                             >
//                                                 {graphData.map((entry, index) => (
//                                                     <Cell key={index} fill={COLORS[index % COLORS.length]} />
//                                                 ))}
//                                             </Pie>
//                                             <Tooltip formatter={(value) => `₹${Number(value).toFixed(2)}`} />
//                                         </PieChart>
//                                     </ResponsiveContainer>
//                                 </div>
//                                 <div className="chart-legend-list">
//                                     {graphData.map((entry, index) => (
//                                         <div key={index} className="legend-item">
//                                             <div className="legend-cube" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
//                                             <span>{entry.name}: <strong>₹{entry.value.toFixed(2)}</strong></span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>

//                         {/* RIGHT MODULE - Calculated Data Summary Metrics */}
//                         <div className="right-section">
//                             <div className="stats-grid">
//                                 <div className="stat-card balance-card-wallet">
//                                     <p>Your Total Contribution Pool</p>
//                                     <h2>₹{tripMetrics.walletBalance.toFixed(2)}</h2>
//                                     <img src={photo1} alt="wallet" />
//                                 </div>
//                                 <div className="stat-card balance-card-surplus">
//                                     <p>Remaining Net Surplus</p>
//                                     <h2 style={{ color: '#10b981' }}>₹{tripMetrics.surplus.toFixed(2)}</h2>
//                                     <img src={photo2} alt="surplus" />
//                                 </div>
//                                 <div className="stat-card balance-card-deficit">
//                                     <p>Net Deficit / Dues Owed</p>
//                                     <h2 style={{ color: '#ef4444' }}>₹{tripMetrics.deficit.toFixed(2)}</h2>
//                                     <img src={photo3} alt="deficit" />
//                                 </div>
//                             </div>

//                             {/* User Specific Transaction History Log */}
//                             <div className="pro-card table-section">
//                                 <div className="table-header">
//                                     <h3>Your Transaction Records</h3>
//                                 </div>
//                                 <div className="table-wrapper">
//                                     <table className="expense-table">
//                                         <thead>
//                                             <tr>
//                                                 <th>Date</th>
//                                                 <th>Description</th>
//                                                 <th>Type</th>
//                                                 <th>Amount</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {transactonData && transactonData.length > 0 ? (
//                                                 transactonData.map((item) => (
//                                                     <tr key={item._id}>
//                                                         <td>{item.createdAt ? item.createdAt.split('T')[0] : 'N/A'}</td>
//                                                         <td>{item.description || "Shared Pool Adjustment"}</td>
//                                                         <td>
//                                                             <span className={`priority-tag ${item.type === 'expense' ? 'crit-badge' : 'std-badge'}`}>
//                                                                 {item.type}
//                                                             </span>
//                                                         </td>
//                                                         <td style={{ fontWeight: '600', color: item.type === 'expense' ? '#ef4444' : '#10b981' }}>
//                                                             ₹{Number(item.amount).toFixed(2)}
//                                                         </td>
//                                                     </tr>
//                                                 ))
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="4" style={{ textAlign: 'center', color: '#64748b' }}>No personal records logged yet.</td>
//                                                 </tr>
//                                             )}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ) : (
//                     /* EDIT VIEW MODE SCREEN ENTRY */
//                     <div className="create-page" style={{ minHeight: "80vh" }}>
//                         <div className="create-form-card" style={{ maxWidth: "600px", margin: "0 auto" }}>
//                             <h2>Edit User Profile</h2>
//                             <form onSubmit={handleEditProfileSubmit}>
//                                 <div className="form-group">
//                                     <label>Full Name</label>
//                                     <input
//                                         type="text"
//                                         defaultValue={userData?.name}
//                                         onChange={(e) => setNewName(e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                                 <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
//                                     <button type="submit" className="create-btn">Save Layout</button>
//                                     <button type="button" className="secondary-btn" onClick={() => setedit(0)}>Cancel</button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }
import axios from "axios";
import "./profile.css";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./Mycontext";
import { useParams, useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import photo1 from "./images/Screenshot 2026-03-19 122942.png";
import photo2 from "./images/Screenshot 2026-03-19 123007.png";
import photo3 from "./images/Screenshot 2026-03-19 123023.png";

export default function Profile() {
    const COLORS = ["#8B5CF6", "#3B82F6", "#10B981", "#EF4444"];
    const navigate = useNavigate();
    const { id } = useParams(); // target user id
    const token = localStorage.getItem("AuthToken");

    const {
        userData,
        setUserData,
        edit,
        setedit,
        transactonData,
        settransactionData,
    } = useContext(MyContext);

    const [newName, setNewName] = useState("");

    // Core Trip Metric States mapped from custom clean user metrics logic
    const [tripMetrics, setTripMetrics] = useState({
        walletBalance: 0,
        totalContribution: 0,
        totalExpense: 0,
        netBalance: 0,
        surplus: 0,
        deficit: 0
    });

    const [graphData, setGraphData] = useState([]);

    async function fetchUserProfileAndTripData() {
        try {
            if (!token) return;

            // 1. Fetch Basic Profile Details
            const profileResponse = await axios.get(`${process.env.REACT_APP_API}/api/users/profileper`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserData(profileResponse.data);

            // 2. Fetch Consolidated Dashboard Metrics & Personal Transaction Logs
            const targetId = id || profileResponse.data._id;
            const dashboardResponse = await axios.get(
                `${process.env.REACT_APP_API}/api/transactions/userdashboard/${targetId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const {
                walletBalance,
                expensePaid,
                splitAmount,
                netBalance,
                surplus,
                deficit,
                historyLogs
            } = dashboardResponse.data;

            // Set state array for transaction listing grid seamlessly
            settransactionData(historyLogs || []);

            // Set aggregate card parameters cleanly
            setTripMetrics({
                walletBalance: walletBalance, // Your Total Contribution Pool
                totalContribution: walletBalance,
                totalExpense: expensePaid,
                netBalance: netBalance,
                surplus: surplus,
                deficit: deficit
            });

            // Standardize Recharts matrix layout tracking structures
            setGraphData([
                { name: "Your Pool Contribution", value: walletBalance },
                { name: "Your Settled Expenses", value: expensePaid },
                { name: "Your Owed Share Liability", value: splitAmount }
            ]);

        } catch (err) {
            console.error("Error standardizing profile details collection:", err);
        }
    }

    async function handleEditProfileSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API}/api/users/edituser/${id}`,
                { name: newName },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 200) {
                alert("Identity layout successfully changed.");
                setedit(0);
                fetchUserProfileAndTripData();
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchUserProfileAndTripData();
    }, [id]);

    return (
        <div className="pro-page">
            <div className="pro-container">
                {edit === 0 ? (
                    <div className="main-grid">
                        {/* LEFT MODULE - Profile Details & Donut Analytics */}
                        <div className="left-section">
                            <div className="pro-card user-profile-card">
                                {userData && typeof userData === "object" ? (
                                    <div className="profile-wrapper-layout">
                                        <div className="avatar-wrapper">
                                            <img
                                                src={userData.photo || "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-transparent-600nw-2463868847.jpg"}
                                                alt="profile"
                                            />
                                        </div>
                                        <div className="profile-details-text">
                                            <h2>{userData.name}</h2>
                                            <p className="user-email">{userData.email}</p>
                                            <span className="user-badge">{userData.role || "Active Member"}</span>
                                        </div>
                                        <button className="small-btn edit-toggle-btn" onClick={() => setedit(1)}>
                                            Edit Profile
                                        </button>
                                    </div>
                                ) : (
                                    <p>Loading records...</p>
                                )}
                            </div>

                            <div className="pro-card chart-panel">
                                <h3>Personal Trip Share Allocation</h3>
                                <div className="chart-container-box">
                                    <ResponsiveContainer width="100%" height={220}>
                                        <PieChart>
                                            <Pie
                                                data={graphData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={65}
                                                outerRadius={90}
                                                paddingAngle={4}
                                                dataKey="value"
                                            >
                                                {graphData.map((entry, index) => (
                                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value) => `₹${Number(value).toFixed(2)}`} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="chart-legend-list">
                                    {graphData.map((entry, index) => (
                                        <div key={index} className="legend-item">
                                            <div className="legend-cube" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                            <span>{entry.name}: <strong>₹{entry.value.toFixed(2)}</strong></span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT MODULE - Calculated Data Summary Metrics */}
                        <div className="right-section">



                            {/* User Specific Transaction History Log */}
                            <div className="pro-card table-section">
                                <div className="table-header">
                                    <h3>Your Transaction Records</h3>
                                </div>
                                <div className="table-wrapper">
                                    <table className="expense-table">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Description</th>
                                                <th>Type</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {transactonData && transactonData.length > 0 ? (
                                                transactonData.map((item) => (
                                                    <tr key={item._id}>
                                                        <td>{item.createdAt ? item.createdAt.split('T')[0] : 'N/A'}</td>
                                                        <td>{item.description || "Shared Pool Adjustment"}</td>
                                                        <td>
                                                            <span className={`priority-tag ${item.type === 'expense' ? 'crit-badge' : 'std-badge'}`}>
                                                                {item.type}
                                                            </span>
                                                        </td>
                                                        <td style={{ fontWeight: '600', color: item.type === 'expense' ? '#ef4444' : '#10b981' }}>
                                                            ₹{Number(item.amount).toFixed(2)}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" style={{ textAlign: 'center', color: '#64748b' }}>No personal records logged yet.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* EDIT VIEW MODE SCREEN ENTRY */
                    <div className="create-page" style={{ minHeight: "80vh" }}>
                        <div className="create-form-card" style={{ maxWidth: "600px", margin: "0 auto" }}>
                            <h2>Edit User Profile</h2>
                            <form onSubmit={handleEditProfileSubmit}>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        defaultValue={userData?.name}
                                        onChange={(e) => setNewName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
                                    <button type="submit" className="create-btn">Save Layout</button>
                                    <button type="button" className="secondary-btn" onClick={() => setedit(0)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
}