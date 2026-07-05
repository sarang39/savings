import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'react-router-dom';
import axiosInstance from 'axios'; // or use standard axios
import './all.css';

export default function AddContribution() {
    const { tripId } = useParams();
    const navigate = useNavigate();

    // Read the authorization token exactly like your working component does
    const token = localStorage.getItem("AuthToken");

    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('other');
    const [notes, setNotes] = useState('');

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            setMessage({ type: 'error', text: 'Please enter a valid contribution amount.' });
            return;
        }

        setLoading(true);
        setMessage({ type: '', text: '' });

        const payload = {
            trip: tripId,
            amount: parseFloat(amount),
            description: description || "Group Contribution Pool",
            category,
            notes,
            receiptUrl: null
        };

        try {
            // Using your dynamic REACT_APP_API string and appending your Auth Headers
            const response = await axiosInstance.post(
                `${process.env.REACT_APP_API}/api/transactions/createcontributiondirectdb/${tripId}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.status === 201) {
                setMessage({ type: 'success', text: 'Contribution added successfully!' });
                setAmount('');
                setDescription('');
                setCategory('other');
                setNotes('');

            }
        } catch (error) {
            console.error("Contribution Error:", error);
            const errorMsg = error.response?.data?.message || "Something went wrong while saving your contribution.";
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
                        Contribution History
                    </button>
                </div>

                <div className="expense-layout">
                    <form className="pro-card" onSubmit={handleSubmit}>
                        <h2 className="form-title">Contribution Form</h2>

                        {message.text && (
                            <div className={`alert-box ${message.type}`} style={{
                                padding: '10px',
                                marginBottom: '15px',
                                borderRadius: '4px',
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
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
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

                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={loading}
                            style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
                        >
                            {loading ? "Adding..." : "Add Contribution"}
                        </button>
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