import { useState, useEffect, useContext } from "react";
import { MyContext } from "./Mycontext"
import "./chatbot.css";
import axios from "axios";

export default function Chatbot() {
    const [open, setOpen] = useState(false);

    const { mapuser, setmapuser, transactonData } = useContext(MyContext)
    const requests = [
        {
            id: 1,
            name: "Rahul Creator",
            followers: "12K Followers",
            status: "Pending"
        },
        {
            id: 2,
            name: "Amina Vlogs",
            followers: "25K Followers",
            status: "Pending"
        },
        {
            id: 3,
            name: "Tech Malayalam",
            followers: "8K Followers",
            status: "Pending"
        }
    ];
    useEffect(() => {
        const handleScroll = () => {
            setOpen(false);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    async function approvalhandling(id) {

        try {
            const response = await axios.put(
                `https://savings-hndc.onrender.com/api/users/approve/${id}`
                ,
                {
                    status: "approved"
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            console.log(response.data);

        } catch (error) {
            console.error("Error approving user:", error);
        }
    }

    async function rejecthandling(id) {
        try {
            const response = await axios.put(
                `https://savings-hndc.onrender.com/api/users/approve/${id}`,
                {
                    status: "rejected"
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            console.log(response.data);

        } catch (error) {
            console.error("Error rejecting user:", error);
        }
    }


    return (
        <>
            {/* Chat Button */}
            <div
                className="chat-button"
                onClick={() => setOpen(!open)}
            >
                💬
            </div>

            {/* Chat Box */}
            <div className={`chat-container ${open ? "open" : ""}`}>
                <div className="chat-header">
                    <h3>Creator Requests</h3>
                </div>

                <div className="chat-body">
                    {mapuser.map((user) => (user.status === "pending" ?
                        <div className="request-card" key={user.id}>
                            <div>


                                <p>{user.name}</p>
                                <span>{user.status}</span>
                            </div>

                            <div className="btn-group">
                                <button className="approve-btn" onClick={() => approvalhandling(user._id)}  >
                                    Approve
                                </button>

                                <button className="reject-btn" onClick={() => rejecthandling(user._id)}>
                                    Reject
                                </button>
                            </div>
                        </div> : null
                    ))}
                </div>
            </div>
        </>
    );
}