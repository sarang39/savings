
import React from "react";
import "./newhome.css";
import { useNavigate } from "react-router-dom";

const memories = [
    {
        id: 1,
        title: "Goa Beach Trip",
        date: "March 2026",
        amount: "₹12,500 Saved",
        image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    {
        id: 2,
        title: "Munnar Hills Ride",
        date: "January 2026",
        amount: "₹7,200 Shared",
        image:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    },
    {
        id: 3,
        title: "College Tour",
        date: "December 2025",
        amount: "₹18,000 Managed",
        image:
            "https://images.unsplash.com/photo-1526772662000-3f88f10405ff",
    },
];

function NewHomePage() {
    const navigate = useNavigate();
    const navigateToCreateGroup = () => {
        navigate("/creategroup");
    }
    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-left">
                    <p className="tag">Smart Group Savings</p>

                    <h1>
                        Save Together,
                        <br />
                        Travel Better.
                    </h1>

                    <p className="hero-text">
                        Manage group travel savings, shared expenses, trip memories,
                        and contributions in one beautiful place.
                    </p>

                    <div className="hero-buttons">
                        <button className="primary-btn" onClick={navigateToCreateGroup}>
                            Create Group
                        </button>
                        <button className="secondary-btn" onClick={() => navigate("/groupdetail")}>
                            Explore Trips
                        </button>
                    </div>
                </div>

                <div className="hero-right">
                    <div className="glass-card">
                        <h3>Total Savings</h3>
                        <h1>₹1,24,500</h1>
                        <div className="card-row">
                            <div>
                                <p>Members</p>
                                <h4>24</h4>
                            </div>

                            <div>
                                <p>Trips</p>
                                <h4>8</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Memory Section */}
            <section className="memory-section">
                <div className="section-header">
                    <h2>Travel Memories</h2>
                    <p>Your unforgettable moments with your team.</p>
                </div>

                <div className="memory-grid">
                    {memories.map((item) => (
                        <div className="memory-card" key={item.id}>
                            <img src={item.image} alt={item.title} />

                            <div className="memory-content">
                                <span>{item.date}</span>
                                <h3>{item.title}</h3>
                                <p>{item.amount}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section className="feature-section">
                <div className="feature-card">
                    <h3>Expense Tracking</h3>
                    <p>
                        Track every contribution and shared expense with real-time updates.
                    </p>
                </div>

                <div className="feature-card">
                    <h3>Group Wallet</h3>
                    <p>
                        Create separate wallets for every travel group without confusion.
                    </p>
                </div>

                <div className="feature-card">
                    <h3>Trip Memories</h3>
                    <p>
                        Save beautiful travel moments and keep them forever inside the app.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <h2>TripNest</h2>
                <p>Built for friends, families, and unforgettable journeys.</p>
            </footer>
        </div>
    );
}

export default NewHomePage;