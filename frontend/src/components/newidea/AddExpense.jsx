
import './all.css'

export default function AddExpense() {

    return (

        <div className="pro-page">

            <div className="pro-container">

                <div className="form-hero">

                    <div>

                        <h1>Add Expense</h1>

                        <p>
                            Track and split travel expenses
                            with complete transparency.
                        </p>

                    </div>

                    <button className="primary-btn">
                        View Expenses
                    </button>

                </div>

                <div className="expense-layout">

                    {/* LEFT */}

                    <div className="pro-card">

                        <h2 className="form-title">
                            Expense Details
                        </h2>

                        <div className="form-grid">

                            <div className="input-box">

                                <label>Expense Title</label>

                                <input
                                    type="text"
                                    placeholder="Hotel Booking"
                                />

                            </div>

                            <div className="input-box">

                                <label>Amount</label>

                                <input
                                    type="number"
                                    placeholder="₹3000"
                                />

                            </div>

                            <div className="input-box">

                                <label>Category</label>

                                <select>
                                    <option>Hotel</option>
                                    <option>Food</option>
                                    <option>Transport</option>
                                </select>

                            </div>

                            <div className="input-box">

                                <label>Paid By</label>

                                <input
                                    type="text"
                                    placeholder="Rahul"
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

                                <label>Date</label>

                                <input type="date" />

                            </div>

                        </div>

                        <div className="input-box full-width">

                            <label>Description</label>

                            <textarea
                                placeholder="Expense details..."
                            ></textarea>

                        </div>

                        <button className="submit-btn">
                            Add Expense
                        </button>

                    </div>

                    {/* RIGHT */}

                    <div className="right-sidebar">

                        <div className="pro-card">

                            <h2>
                                Expense Summary
                            </h2>

                            <div className="summary-box">

                                <div className="summary-row">
                                    <span>Total Budget</span>
                                    <h4>₹60,000</h4>
                                </div>

                                <div className="summary-row">
                                    <span>Total Expenses</span>
                                    <h4>₹12,500</h4>
                                </div>

                                <div className="summary-row">
                                    <span>Remaining</span>
                                    <h4>₹32,500</h4>
                                </div>

                            </div>

                        </div>

                        <div className="pro-card">

                            <h2>
                                Recent Expenses
                            </h2>

                            <div className="recent-expense">

                                <h4>Hotel Booking</h4>

                                <p>₹3000 • Arun</p>

                            </div>

                            <div className="recent-expense">

                                <h4>Food Expense</h4>

                                <p>₹1500 • Rahul</p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )
}