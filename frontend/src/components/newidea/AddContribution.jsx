import './all.css'

export default function AddContribution() {

    return (

        <div className="pro-page">

            <div className="pro-container">

                <div className="form-hero">

                    <div>

                        <h1>Add Contribution</h1>

                        <p>
                            Manage member savings contributions
                            and track funding progress.
                        </p>

                    </div>

                    <button className="primary-btn">
                        Contribution History
                    </button>

                </div>

                <div className="expense-layout">

                    {/* LEFT */}

                    <div className="pro-card">

                        <h2 className="form-title">
                            Contribution Form
                        </h2>

                        <div className="form-grid">

                            <div className="input-box">

                                <label>Member Name</label>

                                <input
                                    type="text"
                                    placeholder="Rahul"
                                />

                            </div>

                            <div className="input-box">

                                <label>Amount</label>

                                <input
                                    type="number"
                                    placeholder="₹5000"
                                />

                            </div>

                            <div className="input-box">

                                <label>Payment Method</label>

                                <select>
                                    <option>UPI</option>
                                    <option>Cash</option>
                                    <option>Bank</option>
                                </select>

                            </div>

                            <div className="input-box">

                                <label>Transaction ID</label>

                                <input
                                    type="text"
                                    placeholder="TRX12345"
                                />

                            </div>

                            <div className="input-box">

                                <label>Contribution Date</label>

                                <input type="date" />

                            </div>

                            <div className="input-box">

                                <label>Status</label>

                                <select>
                                    <option>Completed</option>
                                    <option>Pending</option>
                                </select>

                            </div>

                        </div>

                        <div className="input-box full-width">

                            <label>Notes</label>

                            <textarea
                                placeholder="Add contribution note..."
                            ></textarea>

                        </div>

                        <button className="submit-btn">
                            Add Contribution
                        </button>

                    </div>

                    {/* RIGHT */}

                    <div className="right-sidebar">

                        <div className="pro-card">

                            <h2>
                                Contribution Overview
                            </h2>

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

                        <div className="pro-card">

                            <h2>
                                Top Contributors
                            </h2>

                            <div className="recent-expense">

                                <h4>Rahul</h4>

                                <p>₹15,000 Added</p>

                            </div>

                            <div className="recent-expense">

                                <h4>Arun</h4>

                                <p>₹11,500 Added</p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )
}