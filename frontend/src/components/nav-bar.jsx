
import "./nav-bar.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, use } from "react";
import { useContext } from "react";
import { MyContext } from "./Mycontext";
import axios from "axios";
export default function Nav() {
    useEffect(() => {
        if (token) {
            fetchProfile();
        }
    }, []);

    const navigate = useNavigate();
    const { profileData, edit, setedit, setform, userData, setProfileData, } = useContext(MyContext)
    const [showMenu, setShowMenu] = useState(false);
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("AuthToken");

    async function fetchProfile() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/users/profileper`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setProfileData(response.data);
            console.log("profile status", response.data.status);

        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    }

    console.log("profile data in nav", profileData)

    function profile() {
        navigate(`/profile/${profileData._id}`)
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
            {
                token ?
                    <div>

                        < div className="navbar-container" >
                            <div className="top-bar">
                                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                                    <div style={{ width: "10vw" }} >
                                        <button
                                            className="settings-btn"
                                            onClick={() => setShowMenu(!showMenu)}> ⚙️
                                        </button>
                                    </div>
                                    <nav className="top">

                                        {/* <button onClick={() => profile()} style={{
                                            borderRadius: '100%',
                                            aspectRatio: '1/1',
                                            padding: "0%",
                                            border: '0%',
                                            margin: '0.5%'
                                        }}>
                                            {profileData && typeof profileData === 'object' ?
                                                (

                                                    <img className="ring"
                                                        style={{ objectFit: "cover", width: "90%", height: '90%', borderRadius: '100%', aspectRatio: '1/1', padding: "0%" }}
                                                        src={
                                                            profileData.photo
                                                                ? profileData.photo
                                                                : "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-transparent-600nw-2463868847.jpg"
                                                        }
                                                        alt="profile" />

                                                ) : (
                                                    <p>Loading...</p>
                                                )}</button> */}

                                    </nav>
                                </div>
                            </div>
                        </div >


                        {/* MENU OVERLAY */}

                        <div
                            className={`menu-overlay ${showMenu ? "open" : ""}`}
                            style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100vh",
                                background: showMenu
                                    ? "rgba(15, 23, 42, 0.65)"
                                    : "transparent",

                                backdropFilter: showMenu ? "blur(8px)" : "blur(0px)",

                                display: "flex",

                                zIndex: 9999,

                                opacity: showMenu ? 1 : 0,

                                pointerEvents: showMenu ? "all" : "none",

                                transition: "0.4s ease",
                            }}
                        >

                            {/* SIDEBAR */}

                            <div
                                className="sidebar-menu"
                                style={{
                                    width: "320px",
                                    height: "100vh",

                                    background:
                                        "linear-gradient(180deg,#0F172A,#111827,#1E293B)",

                                    borderRight:
                                        "1px solid rgba(255,255,255,0.08)",

                                    padding: "28px 22px",

                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",

                                    transform: showMenu
                                        ? "translateX(0)"
                                        : "translateX(-100%)",

                                    transition: "0.4s ease",

                                    boxShadow:
                                        "0 20px 60px rgba(0,0,0,0.45)",

                                    overflowY: "auto",
                                }}
                            >

                                {/* TOP SECTION */}

                                <div>

                                    {/* LOGO */}

                                    <div
                                        style={{
                                            marginBottom: "35px",
                                        }}
                                    >

                                        <h1
                                            style={{
                                                fontSize: "34px",
                                                fontWeight: "800",

                                                background:
                                                    "linear-gradient(90deg,#6366F1,#8B5CF6,#06B6D4)",

                                                WebkitBackgroundClip: "text",

                                                WebkitTextFillColor: "transparent",

                                                marginBottom: "10px",
                                            }}
                                        >
                                            TripNest
                                        </h1>

                                        <p
                                            style={{
                                                color: "#94A3B8",
                                                lineHeight: "1.7",
                                                fontSize: "14px",
                                            }}
                                        >
                                            Manage trips, group savings,
                                            expenses, contributions,
                                            and travel planning.
                                        </p>

                                    </div>

                                    {/* USER CARD */}

                                    <div
                                        onClick={() => profile()}
                                        style={{
                                            background: "rgba(255,255,255,0.05)",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            borderRadius: "22px",
                                            padding: "18px",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "14px",
                                            marginBottom: "30px",
                                            backdropFilter: "blur(14px)",
                                            cursor: "pointer",
                                            transition: "0.3s ease"
                                        }}
                                    >

                                        <img
                                            src={
                                                profileData?.photo
                                                    ? profileData.photo
                                                    : "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-transparent-600nw-2463868847.jpg"
                                            }
                                            alt="Profile"
                                            style={{
                                                width: "58px",
                                                height: "58px",
                                                borderRadius: "50%",
                                                objectFit: "cover",
                                                border: "3px solid #6366F1",
                                                boxShadow: "0 0 15px rgba(99,102,241,.35)"
                                            }}
                                        />

                                        <div
                                            onClick={() => profile()}
                                            style={{
                                                overflow: "hidden",
                                                flex: 1
                                            }}
                                        >
                                            <h3
                                                style={{
                                                    color: "white",
                                                    margin: 0,
                                                    fontSize: "18px",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis"
                                                }}
                                            >
                                                {profileData?.name || "User"}
                                            </h3>

                                            <p
                                                style={{
                                                    color: "#94A3B8",
                                                    fontSize: "14px",
                                                    marginTop: "5px",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis"
                                                }}
                                            >
                                                {profileData?.email || "No Email"}
                                            </p>
                                        </div>

                                    </div>
                                    {/* NAVIGATION */}

                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "12px",
                                        }}
                                    >

                                        {[{
                                            label: "Home",
                                            action: () => navigate("/newhome"),
                                        },
                                        {
                                            label: "👥 Trip Details",
                                            action: () => navigate("/groupdetail"),
                                        },
                                        {
                                            label: "✈️ Create Trip",
                                            action: () => navigate("/creategroup"),
                                        },

                                        {
                                            label: "👤 Profile",
                                            action: () => profile(),
                                        },


                                        {
                                            label: "📞 Contact",
                                            action: () => navigate("/contact"),
                                        },
                                        {
                                            label: "ℹ️ About",
                                            action: () => navigate("/about"),
                                        },
                                        ].map((item, index) => (
                                            <button
                                                key={index}
                                                onClick={item.action}
                                                style={{
                                                    padding: "16px 18px",
                                                    background:
                                                        "rgba(255,255,255,0.05)",
                                                    border:
                                                        "1px solid rgba(255,255,255,0.06)",
                                                    color: "#E2E8F0",
                                                    borderRadius: "18px",
                                                    cursor: "pointer",
                                                    fontSize: "15px",
                                                    fontWeight: "600",
                                                    textAlign: "left",
                                                    transition: "0.3s",
                                                    backdropFilter: "blur(12px)",
                                                    boxShadow:
                                                        "0 6px 20px rgba(0,0,0,0.15)",
                                                }}

                                                onMouseEnter={(e) => {
                                                    e.target.style.transform =
                                                        "translateX(6px)"

                                                    e.target.style.background =
                                                        "linear-gradient(90deg,#6366F1,#8B5CF6)"

                                                    e.target.style.color = "white"
                                                }}

                                                onMouseLeave={(e) => {
                                                    e.target.style.transform =
                                                        "translateX(0px)"

                                                    e.target.style.background =
                                                        "rgba(255,255,255,0.05)"

                                                    e.target.style.color =
                                                        "#E2E8F0"
                                                }}
                                            >
                                                {item.label}
                                            </button>

                                        ))}

                                    </div>

                                </div>

                                {/* BOTTOM SECTION */}

                                <div>

                                    <button
                                        onClick={() => setShowMenu(false)}

                                        style={{
                                            width: "100%",

                                            padding: "16px",

                                            border: "none",

                                            borderRadius: "18px",

                                            background:
                                                "linear-gradient(90deg,#06B6D4,#6366F1)",

                                            color: "white",

                                            fontWeight: "700",

                                            cursor: "pointer",

                                            fontSize: "16px",

                                            transition: "0.3s",

                                            boxShadow:
                                                "0 10px 25px rgba(99,102,241,0.35)",
                                        }}
                                    >
                                        ← Close Menu
                                    </button>

                                </div>

                            </div>

                            {/* RIGHT SIDE OVERLAY */}

                            <div
                                onClick={() => setShowMenu(false)}

                                style={{
                                    flex: 1,
                                }}
                            />

                        </div>


                    </div >
                    : <div></div>
            }
        </div>
    );
}