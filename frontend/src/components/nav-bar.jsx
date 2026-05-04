
import "./nav-bar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { MyContext } from "./Mycontext";
export default function Nav() {
    const token = localStorage.getItem("AuthToken");
    const navigate = useNavigate();
    const { profileData, edit, setedit, setform, userData, } = useContext(MyContext)
    const [showMenu, setShowMenu] = useState(false);
    const id = localStorage.getItem("id");


    console.log("profile data in nav", profileData)

    function profile() {
        navigate(`/profile/${id}`)
    }
    function login() {
        setform(0)
        navigate('/registration')
    }
    function registration() {
        setform(1)
        navigate('/registration')
    }

    return (
        <div>
            <div className="navbar-container">
                <div className="top-bar">
                    <div style={{ display: 'flex', justifyContent: "space-between" }}>
                        <div style={{ width: "10vw" }} >
                            <button
                                className="settings-btn"
                                onClick={() => setShowMenu(!showMenu)}> ⚙️
                            </button>
                        </div>
                        <nav className="top">
                            <button onClick={() => navigate('/home')}>Home</button>

                            <button onClick={() => login()}>Login</button>
                            <button onClick={() => profile()} style={{ borderRadius: '100%', aspectRatio: '1/1', padding: "0%", border: '0%', margin: '0%' }}>
                                {userData && typeof userData === 'object' ?
                                    (

                                        <img className="ring"
                                            style={{ objectFit: "cover", width: "100%", height: '100%', borderRadius: '100%', aspectRatio: '1/1', padding: "3%", }}
                                            src={
                                                userData.photo
                                                    ? userData.photo
                                                    : "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-transparent-600nw-2463868847.jpg"
                                            }
                                            alt="profile" />

                                    ) : (
                                        <p>Loading...</p>
                                    )}</button>

                        </nav>
                    </div>

                </div>
                {showMenu && (
                    <nav className="top-menu">
                        <button onClick={() => navigate('/home')}>Home</button>
                        <button onClick={() => navigate('/registration')}>Registration</button>
                        <button onClick={() => navigate('/registration')}>Login</button>
                        <button onClick={() => { edit === 1 ? setedit(0) : setedit(1) }}>Edit profile</button>
                        <button onClick={() => navigate('/payment')}>Payment</button>
                        <button >contact</button>
                        <button >about</button>
                        <button onClick={() => profile()}>Profile</button>
                        <button onClick={() => registration()}>Registration</button>
                        <button onClick={() => login()}>{showMenu ? 'true' : 'false'}</button>
                        <button onClick={() => login()}>Login</button>
                        <button onClick={() => navigate('/home')}>Home</button>
                        <button onClick={() => navigate(`/payment/${id}`)}>Payment</button>
                        <button >contact</button>
                        <button >about</button>
                    </nav>
                )}
            </div>
            <button
                onClick={() => navigate(`/payment/${id}`)}
                style={{
                    position: "fixed",
                    bottom: "3%",
                    right: "3%",
                    zIndex: 100,
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",

                    border: "none",
                    cursor: "pointer",

                    fontSize: "2.1rem",
                    fontWeight: "600",
                    color: "white",

                    background: "linear-gradient(135deg, #22c55e, #16a34a)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    transition: "all 0.3s ease"
                }}

            >
                💳
            </button> </div>
    );
}