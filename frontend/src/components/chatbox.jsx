import { useState, useEffect, useContext } from "react";
import { MyContext } from "./Mycontext"
import "./chatbot.css";
import axios from "axios";

export default function Chatbot() {
    const [open, setOpen] = useState(false);
    const [urid, seturid] = useState()

    const { mapuser, setmapuser, transactonData } = useContext(MyContext)

    useEffect(() => {
        const handleScroll = () => {
            setOpen(false);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const apiBaseUrl = "https://savings-hndc.onrender.com";

    async function updateUserStatus(id) {
        try {
            const response = await axios.put(
                `${apiBaseUrl}/api/users/approve`,
                { status: "approved", userid: id }
            );

            console.log(response.data);
            setmapuser((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === id ? { ...user, status: "approved" } : user
                )
            );
        } catch (error) {
            console.error(`Error user:`, error);
        }
    }




    return (
        <>
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
                        <div className="request-card" key={user._id}>
                            <div>


                                <p>{user.name}</p>
                                <span>{user.status}</span>
                            </div>

                            <div className="btn-group">
                                <button className="approve-btn" onClick={() => updateUserStatus(user._id)}  >
                                    Approve
                                </button>

                                <button className="reject-btn" onClick={() => updateUserStatus(user._id)}>
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