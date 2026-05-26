
import React from "react";
import "./test.css";

const memories = [
    {
        id: 1,
        place: "Goa Beach",
        image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    {
        id: 2,
        place: "Munnar",
        image:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    },
    {
        id: 3,
        place: "Wayanad",
        image:
            "https://images.unsplash.com/photo-1526772662000-3f88f10405ff",
    },
    {
        id: 4,
        place: "Vagamon",
        image:
            "https://images.unsplash.com/photo-1519046904884-53103b34b206",
    },
];

function Test() {
    return (
        <div className="profile-container">
            {/* TOP PROFILE SECTION */}
            <section className="profile-top">
                <div className="profile-card">
                    <div className="profile-image-section">
                        <img
                            src="https://i.pravatar.cc/300"
                            alt="profile"
                            className="profile-image"
                        />

                        <button>Edit Profile</button>
                    </div>

                    <div className="profile-details">
                        <h1>Rahul Krishnan</h1>
                        <p className="role">Travel Group Leader</p>

                        <p className="bio">
                            Passionate traveler who loves managing trips, group savings,
                            shared expenses, and collecting unforgettable memories with
                            friends.
                        </p>

                        <div className="stats-row">
                            <div className="stat-box">
                                <h2>12</h2>
                                <p>Trips</p>
                            </div>

                            <div className="stat-box">
                                <h2>₹1.2L</h2>
                                <p>Savings</p>
                            </div>

                            <div className="stat-box">
                                <h2>38</h2>
                                <p>Members</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ACCOUNT DETAILS */}
            <section className="account-section">
                <div className="section-title">
                    <h2>Account Information</h2>
                </div>

                <div className="account-grid">
                    <div className="account-card">
                        <span>Email</span>
                        <h3>rahul@gmail.com</h3>
                    </div>

                    <div className="account-card">
                        <span>Phone</span>
                        <h3>+91 9876543210</h3>
                    </div>

                    <div className="account-card">
                        <span>Location</span>
                        <h3>Kerala, India</h3>
                    </div>

                    <div className="account-card">
                        <span>Joined</span>
                        <h3>January 2025</h3>
                    </div>
                </div>
            </section>

            {/* MEMORY GALLERY */}
            <section className="gallery-section">
                <div className="section-title">
                    <h2>Travel Memories</h2>
                    <p>Best moments captured from your journeys.</p>
                </div>

                <div className="gallery-grid">
                    {memories.map((item) => (
                        <div className="gallery-card" key={item.id}>
                            <img src={item.image} alt={item.place} />

                            <div className="gallery-overlay">
                                <h3>{item.place}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ACTIVITY */}
            <section className="activity-section">
                <div className="section-title">
                    <h2>Recent Activity</h2>
                </div>

                <div className="activity-card">
                    <div className="activity-item">
                        <div className="dot"></div>
                        <p>Added ₹5,000 to Goa Group Savings</p>
                    </div>

                    <div className="activity-item">
                        <div className="dot"></div>
                        <p>Created a new trip group “Munnar Ride”</p>
                    </div>

                    <div className="activity-item">
                        <div className="dot"></div>
                        <p>Uploaded 12 new travel memories</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Test;
