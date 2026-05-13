import { useState, useEffect, useContext } from "react";
import { MyContext } from "./Mycontext"
import "./chatbot.css";
import axios from "axios";

export default function Chatbot() {
    const token = localStorage.getItem('AuthToken');
    const [userstatus, setuserstatus] = useState('pending')
    const [open, setOpen] = useState(false);
    const [urid, seturid] = useState()

    const { mapuser, setmapuser, transactonData, profileData, setProfileData } = useContext(MyContext)

    useEffect(() => {
        const handleScroll = () => {
            setOpen(false);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);



    async function updateUserStatus(id, stat) {
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API}/api/users/approve`,
                { status: stat, userid: id }
            );

            console.log(response.data);
            setmapuser((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === id ? { ...user, status: stat } : user
                )
            );
        } catch (error) {
            console.error(`Error user:`, error);
        }
    }



    return (
        <>
            {token ? <>
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
                                    <button className="approve-btn" onClick={() => updateUserStatus(user._id, "approved")}  >
                                        Approve
                                    </button>

                                    <button className="reject-btn" onClick={() => updateUserStatus(user._id, "rejected")}>
                                        Reject
                                    </button>
                                </div>
                            </div> : null
                        ))}
                    </div>
                </div>
            </> : <div></div>
            }

        </>
    );
}