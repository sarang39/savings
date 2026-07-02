import React, { useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import "./all.css";

export default function JoinGroup() {
    const token = localStorage.getItem("AuthToken");
    const { tripId } = useParams();
    const [joinData, setJoinData] = useState({
        inviteCode: ""
    });

    async function handleJoinGroup(e) {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API}/api/trips/join/${tripId}`,
                {
                    inviteCode: joinData.inviteCode
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(response.data.message);

        } catch (err) {
            console.log(err);
            alert(err.response?.data?.message || "Failed to join trip");
        }
    }

    return (
        <div className="create-page">
            <div className="create-container">

                {/* LEFT SIDE */}
                <div className="create-left">
                    <span className="create-badge">
                        Join Travel Group
                    </span>

                    <h1>Join An Existing Trip</h1>

                    <p>
                        Enter the invite code shared by your trip leader and
                        become part of the adventure.
                    </p>

                    <div className="steps-container">

                        <div className="step-card">
                            <div className="step-number">1</div>
                            <div>
                                <h3>Get Invite Code</h3>
                                <p>
                                    Ask the trip leader for the trip invite
                                    code or join link.
                                </p>
                            </div>
                        </div>

                        <div className="step-card">
                            <div className="step-number">2</div>
                            <div>
                                <h3>Join Group</h3>
                                <p>
                                    Enter the code and send your join request.
                                </p>
                            </div>
                        </div>

                        <div className="step-card">
                            <div className="step-number">3</div>
                            <div>
                                <h3>Start Planning</h3>
                                <p>
                                    Track contributions, expenses, and trip
                                    updates with the group.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="create-right">
                    <form
                        className="create-form-card"
                        onSubmit={handleJoinGroup}
                    >
                        <h2>Join Trip Group</h2>

                        <p className="form-subtitle">
                            Enter your invitation code below
                        </p>

                        <div className="form-group">
                            <label>Invite Code</label>
                            <input
                                type="text"
                                placeholder="TRIP2026ABC"
                                value={joinData.inviteCode}
                                onChange={(e) =>
                                    setJoinData({
                                        ...joinData,
                                        inviteCode: e.target.value
                                    })
                                }
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="create-btn"
                        >
                            Join Group
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}