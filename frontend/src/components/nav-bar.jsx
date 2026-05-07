
import "./nav-bar.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { MyContext } from "./Mycontext";
export default function Nav() {
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

    useEffect(() => {
        const handleScroll = () => {
            setShowMenu(false);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

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
                                            style={{ objectFit: "cover", width: "100%", height: '100%', borderRadius: '100%', aspectRatio: '1/1', padding: "0%" }}
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
            </button>
            {/* {
                showMenu ?
                    <div className="menu-overlay"
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100vh",
                            background: "rgba(0,0,0,0.45)",
                            zIndex: 1000,
                            display: "flex",
                        }}
                    >
                    
                        <div className="sidebar-menu"
                            style={{
                                width: "280px",
                                height: "100%",
                                background: "#111827",
                                padding: "25px 20px",
                                boxSizing: "border-box",
                                borderRight: "1px solid rgba(255,255,255,0.08)",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                boxShadow: "4px 0 15px rgba(0,0,0,0.3)",
                            }}
                        >
                        
                            <div>
                                <h2
                                    style={{
                                        color: "#38bdf8",
                                        marginBottom: "30px",
                                        fontSize: "26px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Dashboard
                                </h2>

                                <nav
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "12px",
                                    }}
                                >
                                    {[
                                        { label: "Home", action: () => navigate("/home") },
                                        { label: "Registration", action: () => navigate("/registration") },
                                        { label: "Login", action: () => login() },
                                        {
                                            label: "Edit Profile",
                                            action: () => setedit(edit === 1 ? 0 : 1),
                                        },
                                        { label: "Payment", action: () => navigate(`/payment/${id}`) },
                                        { label: "Profile", action: () => profile() },
                                        { label: "Contact", action: () => navigate("/contact") },
                                        { label: "About", action: () => navigate("/about") },
                                    ].map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={item.action}
                                            style={{
                                                padding: "14px 16px",
                                                background: "#1e293b",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "12px",
                                                cursor: "pointer",
                                                fontSize: "15px",
                                                textAlign: "left",
                                                transition: "0.3s",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            <button
                                onClick={() => setShowMenu(false)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "8px",
                                    padding: "12px",
                                    background: "#38bdf8",
                                    color: "#111827",
                                    border: "none",
                                    borderRadius: "12px",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    fontWeight: "700",
                                }}
                            >
                                ← Close Menu
                            </button>
                        </div>

                        <div
                            onClick={() => setShowMenu(false)}
                            style={{
                                flex: 1,
                            }}
                        />
                    </div>
                    : <div></div>
            } */}
            {/* Always render the wrapper, but toggle the "open" class */}
            <div className={`menu-overlay ${showMenu ? "open" : ""}`}>

                {/* Sidebar */}
                <div className="sidebar-menu">
                    {/* Top Section */}
                    <div>
                        <h2
                            style={{
                                color: "#38bdf8",
                                marginBottom: "30px",
                                fontSize: "26px",
                                fontWeight: "bold",
                            }}
                        >
                            Dashboard
                        </h2>

                        <nav
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "12px",
                            }}
                        >
                            {[
                                { label: "Home", action: () => navigate("/home") },
                                { label: "Registration", action: () => navigate("/registration") },
                                { label: "Login", action: () => login() },
                                {
                                    label: "Edit Profile",
                                    action: () => setedit(edit === 1 ? 0 : 1),
                                },
                                { label: "Payment", action: () => navigate(`/payment/${id}`) },
                                { label: "Profile", action: () => profile() },
                                { label: "Contact", action: () => navigate("/contact") },
                                { label: "About", action: () => navigate("/about") },
                            ].map((item, index) => (
                                <button
                                    key={index}
                                    onClick={item.action}
                                    style={{
                                        padding: "14px 16px",
                                        background: "#1e293b",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "12px",
                                        cursor: "pointer",
                                        fontSize: "15px",
                                        textAlign: "left",
                                        transition: "0.3s",
                                        fontWeight: "500",
                                    }}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Back Button */}
                    <button
                        onClick={() => setShowMenu(false)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            padding: "12px",
                            background: "#38bdf8",
                            color: "#111827",
                            border: "none",
                            borderRadius: "12px",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: "700",
                        }}
                    >
                        ← Close Menu
                    </button>
                </div>

                {/* Right Overlay Area (Clicking here closes the menu) */}
                <div
                    onClick={() => setShowMenu(false)}
                    style={{ flex: 1 }}
                />
            </div>
        </div>
    );
}