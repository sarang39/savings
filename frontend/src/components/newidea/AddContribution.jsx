import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './all.css';

export default function AddContribution() {
    const { tripId } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("AuthToken");

    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('other');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const getPayload = () => ({
        trip: tripId,
        tripId: tripId,
        amount: parseFloat(amount),
        description: description || "Group Contribution Pool",
        category,
        notes,
        type: "contribution",
        receiptUrl: null
    });

    const handleStripeContribution = async (e) => {
        e.preventDefault();
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            setMessage({ type: 'error', text: 'Please enter a valid amount.' });
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API}/api/transactions/pay`,
                getPayload(),
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 200 && response.data.url) {
                window.location.href = response.data.url;
            }
        } catch (error) {
            console.error("Stripe Session Creation Error:", error);
            setMessage({ type: 'error', text: 'Gateway configuration setup failure.' });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitOffline = async (e) => {
        e.preventDefault();
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            setMessage({ type: 'error', text: 'Please enter a valid contribution amount.' });
            return;
        }

        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API}/api/transactions/createcontributiondirectdb/${tripId}`,
                getPayload(),
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 201) {
                setMessage({ type: 'success', text: 'Contribution added successfully!' });
                setAmount('');
                setDescription('');
                setCategory('other');
                setNotes('');
                navigate(-1)
            }
        } catch (error) {
            console.error("Contribution Error:", error);
            const errorMsg = error.response?.data?.message || "Something went wrong.";
            setMessage({ type: 'error', text: errorMsg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pro-page">
            <div className="pro-container">
                <div className="form-hero">
                    <div>
                        <h1>Add Contribution</h1>
                        <p>Manage member savings contributions and track funding progress.</p>
                    </div>
                    <button className="primary-btn" onClick={() => navigate(-1)}>
                        Back
                    </button>
                </div>

                <div className="expense-layout">
                    <form className="pro-card" onSubmit={(e) => e.preventDefault()}>
                        <h2 className="form-title">Contribution Form</h2>

                        {message.text && (
                            <div className={`alert-box ${message.type}`} style={{
                                padding: '10px', marginBottom: '15px', borderRadius: '4px',
                                backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
                                color: message.type === 'success' ? '#155724' : '#721c24'
                            }}>
                                {message.text}
                            </div>
                        )}

                        <div className="form-grid">
                            <div className="input-box">
                                <label>Amount (₹)</label>
                                <input
                                    type="number"
                                    placeholder="5000"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="input-box">
                                <label>Description / Reason</label>
                                <input
                                    type="text"
                                    placeholder="Initial pool payment"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="input-box">
                                <label>Category Type</label>
                                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="other">Other</option>
                                    <option value="travel">Travel</option>
                                    <option value="food">Food</option>
                                    <option value="hotel">Hotel</option>
                                </select>
                            </div>
                        </div>

                        <div className="input-box full-width" style={{ marginTop: '15px' }}>
                            <label>Notes</label>
                            <textarea
                                placeholder="Add optional details..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="button-group" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                            <button type="button" className="submit-btn" onClick={handleStripeContribution} disabled={loading} style={{ flex: 1 }}>
                                Pay Online via Stripe
                            </button>
                            <button type="button" className="submit-btn secondary" onClick={handleSubmitOffline} disabled={loading} style={{ flex: 1, backgroundColor: '#6c757d' }}>
                               ADD
                            </button>
                        </div>
                    </form>

                    <div className="right-sidebar">
                        <div className="pro-card">
                            <h2>Contribution Overview</h2>
                            <div className="summary-box">
                                <div className="summary-row">
                                    <span>Total Saved</span>
                                    <h4>₹45,000</h4>
                                </div>
                                <div className="summary-row">
                                    <span>Goal</span>
                                    <h4>₹60,000</h4>
                                </div>
                                <div className="summary-row">
                                    <span>Progress</span>
                                    <h4>75%</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}