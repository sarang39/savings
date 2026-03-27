// import "./nav-bar.css";
// import { useNavigate } from "react-router-dom";

// export default function Nav() {
//     const navigate = useNavigate();

//     return (
//         <div className="navbar-container">
//             <input type="checkbox" id="menu-toggle" />
//             <label htmlFor="menu-toggle" className="menu-icon">&#9776;</label>

//             <nav className="sidebar">
//                 <h2 className="logo">MyApp</h2>
//                 <button onClick={() => navigate('/profile')}>Profile</button>
//                 <button onClick={() => navigate('/home')}>Home</button>
//                 <button onClick={() => navigate('/registration')}>Registration</button>
//             </nav>
//         </div>
//     );
// }
import "./nav-bar.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { MyContext } from "./Mycontext";

export default function Nav() {
    const token = localStorage.getItem("AuthToken");
    const navigate = useNavigate();
    const { profileData, edit, setedit, setform } = useContext(MyContext)
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
        <div className="navbar-container">
            <div className="top-bar">
                <h2 className="logo">MyApp</h2>
                <nav className="top">
                    <button onClick={() => profile()}>Profile</button>
                    <button onClick={() => navigate('/home')}>Home</button>
                    <button onClick={() => registration()}>Registration</button>
                    <button onClick={() => login()}>Login</button>
                    <button onClick={() => navigate(`/payment/${id}`)}>Payment</button>
                    <button onClick={() => navigate('/chart')}>Chart</button>
                    <button >contact</button>
                    <button >about</button>
                </nav>
                <button
                    className="settings-btn"
                    onClick={() => setShowMenu(!showMenu)}
                > ⚙️
                </button>
            </div>
            {showMenu && (
                <nav className="top-menu">
                    <button onClick={() => navigate('/home')}>Home</button>
                    <button onClick={() => navigate('/registration')}>Registration</button>
                    <button onClick={() => navigate('/registration')}>Login</button>
                    <button onClick={() => { edit === 1 ? setedit(0) : setedit(1) }}>Edit profile</button>
                    <button onClick={() => navigate('/payment')}>Payment</button>
                    <button onClick={() => navigate('/chart')}>Chart</button>
                    <button >contact</button>
                    <button >about</button>
                </nav>
            )}
        </div>
    );
}