import React, { useState } from 'react'; // Fix 1: Imported useState
import axios from 'axios';
import './all.css';

export default function CreateGroup() {
    const token = localStorage.getItem("AuthToken");

    // Fix 2: Changed to camelCase 'tripDetails' to match your JSX usage
    const [tripDetails, setTripDetails] = useState({
        title: "",
        destination: "",
        date: "",
        budget: "",
        description: ""
    });

    async function handleCreateGroup(e) {
        e.preventDefault();

        if (!token) {
            alert("You must be logged in to create a trip.");
            return;
        }

        try {
            // Decode token to get userid
            const payload = JSON.parse(atob(token.split(".")[1]));
            const userid = payload.userId;

            const response = await axios.post(
                `${process.env.REACT_APP_API}/api/trips/createtrip`,
                {
                    title: tripDetails.title,
                    destination: tripDetails.destination,
                    date: tripDetails.date,
                    budget: tripDetails.budget,
                    description: tripDetails.description,
                    userId: userid // Passing userid if your backend requires it
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.status === 201 || response.status === 200) {
                alert("Trip created successfully!");
                setTripDetails({
                    title: "",
                    destination: "",
                    date: "",
                    budget: "",
                    description: ""
                });
                console.log(response.data);
            } else {
                alert("Failed to create trip");
            }
        } catch (err) {
            console.log("Create Trip Error:", err);
            alert("Server Error");
        }
    }

    return (
        <div className="create-page">
            <div className="create-container">
                {/* LEFT SIDE */}
                <div className="create-left">
                    <span className="create-badge">
                        Travel Planning Platform
                    </span>
                    <h1>Create Your Dream Trip Group</h1>
                    <p>
                        Start planning unforgettable journeys with your friends. Manage budgets, track expenses, and organize everything together in one place.
                    </p>

                    <div className="steps-container">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <div>
                                <h3>Create Group</h3>
                                <p>Start by creating a travel group and setting your destination, budget goal, and trip date.</p>
                            </div>
                        </div>

                        <div className="step-card">
                            <div className="step-number">2</div>
                            <div>
                                <h3>Invite Members</h3>
                                <p>Share your invite code with friends and collaborate together on travel savings and planning.</p>
                            </div>
                        </div>

                        <div className="step-card">
                            <div className="step-number">3</div>
                            <div>
                                <h3>Track Expenses</h3>
                                <p>Monitor contributions, split expenses fairly, and stay within your travel budget goals.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="create-right">
                    {/* Fix 3: Wrapped inputs inside a <form> tag to make handleCreateGroup execute */}
                    <form className="create-form-card" onSubmit={handleCreateGroup}>
                        <h2>Create New Trip</h2>
                        <p className="form-subtitle">Fill in the details to start your travel group</p>

                        <div className="form-group">
                            <label>Trip Name</label>
                            <input
                                type="text"
                                placeholder="Goa Vacation 2026"
                                value={tripDetails.title}
                                onChange={(e) => setTripDetails({ ...tripDetails, title: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Destination</label>
                            <input
                                type="text"
                                placeholder="Goa, India"
                                value={tripDetails.destination}
                                onChange={(e) => setTripDetails({ ...tripDetails, destination: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>Budget Goal</label>
                                <input
                                    type="number"
                                    placeholder="60000"
                                    value={tripDetails.budget}
                                    onChange={(e) => setTripDetails({ ...tripDetails, budget: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Trip Date</label>
                                <input
                                    type="date"
                                    value={tripDetails.date}
                                    onChange={(e) => setTripDetails({ ...tripDetails, date: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Invite Code</label>
                            <input
                                type="text"
                                placeholder="TRIP2026"
                                disabled
                                value="TRIP2026" // Auto-filled placeholder value
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                placeholder="Describe your trip..."
                                value={tripDetails.description}
                                onChange={(e) => setTripDetails({ ...tripDetails, description: e.target.value })}
                            ></textarea>
                        </div>

                        {/* Setting type="submit" fires the onSubmit handle on the form */}
                        <button type="submit" className="create-btn">
                            Create Group
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}