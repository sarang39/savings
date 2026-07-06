// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './payment.css';

// export default function Payment() {
//     const { tripId } = useParams();
//     const [tripMembers, setTripMembers] = useState([]);
//     const navigate = useNavigate();
//     const token = localStorage.getItem("AuthToken");
//     const [amount, setAmount] = useState('');
//     const [description, setDescription] = useState('');
//     const [category, setCategory] = useState('other');
//     const [splitType, setSplitType] = useState('equal');
//     const [notes, setNotes] = useState('');

//     // Static testing array (Replace with dynamic database fetched array values where required)

//     const [selectedParticipants, setSelectedParticipants] = useState([]);


//     useEffect(() => {
//         const fetchTripMembers = async () => {
//             try {
//                 const response = await axios.get(
//                     `${process.env.REACT_APP_API}/api/trips/tripusers/${tripId}`,
//                     { headers: { Authorization: `Bearer ${token}` } }
//                 );
//                 setTripMembers(response.data.members);
//                 console.log("Fetched trip members:", response.data.members);
//             } catch (err) {
//                 console.error("Error fetching trip members:", err);
//             }
//         };

//         fetchTripMembers();
//     }, [tripId, token]);
//     const toggleParticipant = (id) => {
//         setSelectedParticipants(prev =>
//             prev.includes(id)
//                 ? prev.filter(pId => pId !== id)
//                 : [...prev, id]
//         );
//     };

//     // Handler 1: Save Directly to DB as Local Sandbox Mocking Data 
//     const handleAddExpenseOffline = async (e) => {
//         e.preventDefault();
//         if (!amount || !description || selectedParticipants.length === 0) {
//             alert("Please fill in all mandatory fields.");
//             return;
//         }

//         const payload = {
//             trip: tripId,
//             amount: parseFloat(amount),
//             description,
//             category,
//             participants: selectedParticipants,
//             splitType,
//             notes
//         };

//         console.log("Payload sent to createTransaction:", payload);

//         try {

//             const response = await axios.post(
//                 `${process.env.REACT_APP_API}/api/transactions/createTransaction/${tripId}`,
//                 payload,
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             if (response.status === 201) {
//                 alert("Sandbox Payment Logged successfully into database!");
//                 navigate(-1);
//             }
//         } catch (err) {
//             console.error(err);
//             alert(err.response?.data?.message || "Failed to log database mocking entry.");
//         }
//     };

//     // Handler 2: Checkout workflow redirection using correct API signature payload
//     const handleStripePayment = async (e) => {
//         e.preventDefault();
//         if (!amount || !description) return alert("Please fill amount and description context before paying online.");

//         try {
//             const stripePayload = {
//                 amount: Number(amount),
//                 tripId: tripId,
//                 description: description,
//                 category: category,
//                 participants: selectedParticipants
//             };

//             console.log("Passing payment data layer to session config:", stripePayload);

//             const response = await axios.post(
//                 `${process.env.REACT_APP_API}/api/transactions/pay`,
//                 stripePayload,
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             if (response.status === 200 && response.data.url) {
//                 window.location.href = response.data.url;
//             }
//         } catch (err) {
//             console.error(err);
//             alert("Payment gateway error setup failure.");
//         }
//     };
//     useEffect(() => {
//         if (tripMembers.length > 0) {
//             setSelectedParticipants(
//                 tripMembers.map(member => member.user._id)
//             );
//         }
//     }, [tripMembers]);
//     return (
//         <div className="payment-container">
//             <div className="payment-card">
//                 <div className="payment-header">
//                     <h2 className="payment-title">Log Trip Expense</h2>
//                     <p className="payment-subtitle">Record payments or split expenses instantly.</p>
//                 </div>

//                 <form className="payment-form" onSubmit={(e) => e.preventDefault()}>
//                     <div className="form-main-layout">
//                         {/* Left Column */}
//                         <div className="form-column">
//                             <div className="form-group">
//                                 <label>Amount (₹)</label>
//                                 <input
//                                     type="number"
//                                     value={amount}
//                                     onChange={(e) => setAmount(e.target.value)}
//                                     placeholder="0.00"
//                                     required
//                                 />
//                             </div>

//                             <div className="form-group">
//                                 <label>What was this for?</label>
//                                 <input
//                                     type="text"
//                                     value={description}
//                                     onChange={(e) => setDescription(e.target.value)}
//                                     placeholder="e.g., Petrol refill, Dinner"
//                                     required
//                                 />
//                             </div>

//                             <div className="form-row">
//                                 <div className="form-group half">
//                                     <label>Category</label>
//                                     <select value={category} onChange={(e) => setCategory(e.target.value)}>
//                                         <option value="other">Other</option>
//                                         <option value="fuel">Fuel/Petrol</option>
//                                         <option value="food">Food & Drinks</option>
//                                         <option value="hotel">Accommodation</option>
//                                         <option value="travel">Travel/Tickets</option>
//                                         <option value="shopping">Shopping</option>
//                                         <option value="activity">Activity/Tours</option>
//                                     </select>
//                                 </div>

//                                 <div className="form-group half">
//                                     <label>Split Type</label>
//                                     <select value={splitType} onChange={(e) => setSplitType(e.target.value)}>
//                                         <option value="equal">Split Equally</option>
//                                         <option value="custom" disabled>Custom</option>
//                                     </select>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Right Column */}
//                         <div className="form-column">
//                             <div className="form-group">
//                                 <label>Split Between Whom?</label>
//                                 <div className="participants-grid">
//                                     {tripMembers.map(member => (
//                                         <div
//                                             key={member.user._id}
//                                             className={`participant-chip ${selectedParticipants.includes(member.user._id) ? 'active' : ''}`}
//                                             onClick={() => toggleParticipant(member.user._id)}
//                                         >
//                                             {member.user.name}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                             <div className="form-group operational-notes">
//                                 <label>Notes (Optional)</label>
//                                 <textarea
//                                     value={notes}
//                                     onChange={(e) => setNotes(e.target.value)}
//                                     placeholder="Add additional remarks..."
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Action Footer Buttons */}
//                     <div className="button-group">
//                         <button type="button" className="btn-primary" onClick={handleStripePayment}>
//                             Pay Online via Stripe
//                         </button>
//                         <button type="button" className="btn-secondary" onClick={handleAddExpenseOffline}>
//                             Test Run (Direct DB Add)
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './payment.css';

export default function Payment() {
    const { tripId } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("AuthToken");

    const [tripMembers, setTripMembers] = useState([]);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('other');
    const [splitType, setSplitType] = useState('equal');
    const [notes, setNotes] = useState('');
    const [selectedParticipants, setSelectedParticipants] = useState([]);
    const [customShares, setCustomShares] = useState({}); // Stores user share amounts: { userId: shareAmount }

    useEffect(() => {
        const fetchTripMembers = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API}/api/trips/tripusers/${tripId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setTripMembers(response.data.members || []);
            } catch (err) {
                console.error("Error fetching trip members:", err);
            }
        };
        fetchTripMembers();
    }, [tripId, token]);

    useEffect(() => {
        if (tripMembers.length > 0) {
            setSelectedParticipants(tripMembers.map(m => m.user._id));
        }
    }, [tripMembers]);

    const toggleParticipant = (id) => {
        setSelectedParticipants(prev =>
            prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
        );
    };

    const handleShareChange = (userId, value) => {
        setCustomShares(prev => ({ ...prev, [userId]: value }));
    };

    const getFormContextPayload = () => {
        let customSplits = [];
        if (splitType === 'custom') {
            customSplits = selectedParticipants.map(userId => ({
                user: userId,
                share: parseFloat(customShares[userId] || 0)
            }));
        }

        return {
            trip: tripId,
            tripId: tripId,
            amount: parseFloat(amount),
            description,
            category,
            participants: selectedParticipants,
            splitType,
            customSplits,
            notes,
            type: "expense"
        };
    };

    const validateFormContext = () => {
        if (!amount || parseFloat(amount) <= 0 || !description) {
            alert("Please provide valid general metrics matching transaction specifications.");
            return false;
        }
        if (selectedParticipants.length === 0) {
            alert("Please designate at least one participant item allocation checkbox target.");
            return false;
        }
        if (splitType === 'custom') {
            const sumOfSplits = selectedParticipants.reduce((acc, uid) => acc + parseFloat(customShares[uid] || 0), 0);
            if (Math.abs(sumOfSplits - parseFloat(amount)) > 0.02) {
                alert(`The sum of custom breakdowns (₹${sumOfSplits}) must equal the entered statement total amount (₹${amount})`);
                return false;
            }
        }
        return true;
    };

    const handleAddExpenseOffline = async (e) => {
        e.preventDefault();
        if (!validateFormContext()) return;

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API}/api/transactions/createTransaction/${tripId}`,
                getFormContextPayload(),
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 201) {
                alert("Payment logged into database successfully!");
                navigate(-1);
            }
        } catch (err) {
            alert(err.response?.data?.message || "Failed to log entries dynamically.");
        }
    };

    const handleStripePayment = async (e) => {
        e.preventDefault();
        if (!validateFormContext()) return;

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API}/api/transactions/pay`,
                getFormContextPayload(),
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 200 && response.data.url) {
                window.location.href = response.data.url;
            }
        } catch (err) {
            alert("Payment gateway session initialization failure configuration error.");
        }
    };

    return (
        <div className="payment-container">
            <div className="payment-card">
                <div className="payment-header">
                    <h2 className="payment-title">Log Trip Expense</h2>
                    <p className="payment-subtitle">Record payments or split expenses instantly.</p>
                </div>

                <form className="payment-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-main-layout">
                        {/* Left Column */}
                        <div className="form-column">
                            <div className="form-group">
                                <label>Amount (₹)</label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.00"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>What was this for?</label>
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="e.g., Petrol refill, Dinner"
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group half">
                                    <label>Category</label>
                                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                        <option value="other">Other</option>
                                        <option value="fuel">Fuel/Petrol</option>
                                        <option value="food">Food & Drinks</option>
                                        <option value="hotel">Accommodation</option>
                                        <option value="travel">Travel/Tickets</option>
                                        <option value="shopping">Shopping</option>
                                        <option value="activity">Activity/Tours</option>
                                    </select>
                                </div>

                                <div className="form-group half">
                                    <label>Split Type</label>
                                    <select value={splitType} onChange={(e) => setSplitType(e.target.value)}>
                                        <option value="equal">Split Equally</option>
                                        <option value="custom">Custom Breakdown</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="form-column">
                            <div className="form-group">
                                <label>Participants Allocation</label>
                                <div className="participants-grid">
                                    {tripMembers.map(member => {
                                        const isChecked = selectedParticipants.includes(member.user._id);
                                        return (
                                            <div key={member.user._id} className="participant-split-row" style={{ marginBottom: '10px' }}>
                                                <div
                                                    className={`participant-chip ${isChecked ? 'active' : ''}`}
                                                    onClick={() => toggleParticipant(member.user._id)}
                                                    style={{ cursor: 'pointer', display: 'inline-block', marginRight: '10px' }}
                                                >
                                                    {member.user.name}
                                                </div>

                                                {splitType === "custom" && isChecked && (
                                                    <input
                                                        type="number"
                                                        placeholder="Individual Share (₹)"
                                                        value={customShares[member.user._id] || ''}
                                                        onChange={(e) => handleShareChange(member.user._id, e.target.value)}
                                                        style={{ width: '130px', display: 'inline-block', padding: '4px 8px' }}
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="form-group operational-notes">
                                <label>Notes (Optional)</label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Add additional remarks..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="button-group">
                        <button type="button" className="btn-primary" onClick={handleStripePayment}>
                            Pay Online via Stripe
                        </button>
                        <button type="button" className="btn-secondary" onClick={handleAddExpenseOffline}>
                            Test Run (Direct DB Add)
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}