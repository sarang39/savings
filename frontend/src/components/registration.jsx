// import "./registration.css";
// import { forwardRef, useContext } from "react";
// import { MyContext } from "./Mycontext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// export default function Registration() {
//     const Navigate = useNavigate()
//     const {
//         photo,
//         form,
//         setform,
//         setphoto,
//         userName,
//         setUserName,
//         role,
//         setRole,
//         email,
//         setEmail,
//         password,
//         setPassword,
//         phonenumber,
//         setPhoneNumber,
//         setOtp,
//         setProfileData
//     } = useContext(MyContext);
//     async function userlogin(e) {
//         e.preventDefault()
//         try {
//             const response = await axios.post("process.env.REACT_APP_API/api/users/login", {
//                 email: email,
//                 password: password
//             });
//             if (response.status === 400) {
//                 alert("Invalid credentials");
//             }
//             console.log(response.status)
//             if (response.status === 200) {
//                 setProfileData(response.data.user)
//                 console.log("Profile data:", response.data.user);
//                 alert("Login successful");
//                 localStorage.setItem("AuthToken", response.data.AuthToken);
//                 localStorage.setItem("id", response.data.user._id);
//                 Navigate("/home")
//             }
//         }
//         catch (err) {
//             console.log(err)
//         }
//     }
//     async function userregistration(e) {
//         e.preventDefault()
//         try {
//             const formData = new FormData();
//             formData.append("name", userName);
//             formData.append("email", email);
//             formData.append("password", password);
//             formData.append("phonenumber", phonenumber);
//             formData.append("photo", photo);
//             formData.append("role", role);
//             const response = await axios.post("process.env.REACT_APP_API/api/users/register", formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data"
//                 }
//             });
//             if (response.status === 201) {
//                 setUserName("");
//                 setPassword("");
//                 setPhoneNumber("");
//                 setRole("user")
//                 setform(0)
//                 alert("User registered successfully");
//             }
//             else {
//                 alert("Registration failed");
//             }
//         }
//         catch (err) {
//             console.log(err)
//         }
//     }
//     return (
//         <div className='main'>
//             <div className="first-container">
//                 <div className="second-container" >
//                     <div className="forform" style={{ width: "100%" }}>
//                         <h6>start for free</h6>
//                         {form ? <h1 style={{ paddingBottom: "6px", paddingTop: '3px' }}>Create new account</h1> :
//                             <h1>Sign in</h1>}


//                         {form ? <p>already a member ?<a href='' style={{ color: 'blue' }} onClick={(e) => { e.preventDefault(); setform(!form) }}> Login</a></p> :
//                             <p>Don't have an account<a href='' style={{ color: 'blue' }} onClick={(e) => { e.preventDefault(); setform(!form) }}> Register</a></p>
//                         }
//                         {form ?
//                             <form action="submit" style={{ border: 'none', outline: 'none', boxShadow: 'none', gap: '7px', display: 'flex', flexDirection: 'column', width: '100%', paddingTop: '25px' }} onSubmit={userregistration}>
//                                 <input type="text" name="name" id="name" placeholder='User Name' onChange={e => setUserName(e.target.value)} />
//                                 <input type="email" placeholder='Email' onChange={e => setEmail(e.target.value)} />
//                                 <input type="tel" name='phone number' placeholder='Phone Number' onChange={e => setPhoneNumber(e.target.value)} />
//                                 <input type="file" placeholder='profile picture' onChange={event => setphoto(event.target.files[0])} />
//                                 <input type="" name="" id="" placeholder='login as' onChange={e => setRole(e.target.value)} />
//                                 <input type="password" placeholder='Password' onChange={e => setPassword(e.target.value)} />
//                                 <input type="re-password" placeholder='Re-Password' onChange={e => setPassword(e.target.value)} />
//                                 <button type='submit'>Submit</button>
//                             </form>
//                             :
//                             <form action="submit" style={{ border: 'none', outline: 'none', boxShadow: 'none', gap: '7px', display: 'flex', flexDirection: 'column', width: '100%', paddingTop: '25px' }} onSubmit={userlogin}>
//                                 <input type="email" placeholder='Email' onChange={e => setEmail(e.target.value)} />
//                                 <input type="password" placeholder='Password' onChange={e => setPassword(e.target.value)} />
//                                 <button type='submit'>Submit</button>
//                             </form>}

//                     </div>


//                 </div>
//             </div>
//         </div >
//     )
// }
import "./registration.css";
import { forwardRef, useContext, useState } from "react";
import { MyContext } from "./Mycontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Registration() {
    const Navigate = useNavigate();

    // Extracted from Context
    const {
        photo, setphoto,
        form, setform,
        userName, setUserName,
        role, setRole,
        email, setEmail,
        password, setPassword,
        phonenumber, setPhoneNumber,
        setProfileData
    } = useContext(MyContext);

    // Local state for validation errors and confirm password
    const [errors, setErrors] = useState({});
    const [confirmPassword, setConfirmPassword] = useState("");

    // --- Validation Functions ---
    const validateLogin = () => {
        const newErrors = {};
        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email format (e.g., user@gmail.com)";
        }

        if (!password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };

    const validateRegistration = () => {
        const newErrors = {};

        if (!userName || userName.trim().length < 3) {
            newErrors.userName = "Username must be at least 3 characters long";
        }

        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email format";
        }

        if (!phonenumber || phonenumber.trim().length < 10) {
            newErrors.phonenumber = "Phone number must be at least 10 digits";
        }

        if (!role || role.trim() === "") {
            newErrors.role = "Role is required";
        }

        if (!photo) {
            newErrors.photo = "Profile picture is required";
        }

        if (!password || password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // --- Submit Handlers ---
    async function userlogin(e) {
        e.preventDefault();

        // Stop execution if validation fails
        if (!validateLogin()) return;

        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/api/users/login`, {
                email: email,
                password: password
            });

            if (response.status === 200) {
                setProfileData(response.data.user);
                localStorage.setItem("AuthToken", response.data.AuthToken);
                localStorage.setItem("id", response.data.user._id);
                localStorage.setItem("role", response.data.user.status);
                setErrors({}); // Clear any previous errors
                if (response.data.user.status === "approved") {
                    Navigate("/home");
                } else {
                    Navigate("/waiting");
                }
            }
        } catch (err) {
            if (err.response && err.response.status === 400) {
                setErrors({ api: "Invalid email or password" });
            } else {
                setErrors({ api: "Something went wrong. Please try again later." });
            }
            console.log(err);
        }
    }

    async function userregistration(e) {
        e.preventDefault();

        // Stop execution if validation fails
        if (!validateRegistration()) return;

        try {
            const formData = new FormData();
            formData.append("name", userName);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("phonenumber", phonenumber);
            formData.append("photo", photo);
            formData.append("role", role);

            const response = await axios.post(`${process.env.REACT_APP_API}/api/users/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (response.status === 201) {
                // Reset form fields
                setUserName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setPhoneNumber("");
                setRole("user");
                setErrors({});
                setform(0); // Switch to login view
            }
        } catch (err) {
            setErrors({ api: "Registration failed. Email might already exist." });
            console.log(err);
        }
    }

    // Helper to toggle between login and register and clear errors
    const toggleForm = (e) => {
        e.preventDefault();
        setErrors({});
        setform(!form);
    };

    // Inline style for error messages to keep it professional
    const errorStyle = { color: 'red', fontSize: '12px', margin: '-5px 0 5px 0', textAlign: 'left' };
    const inputErrorStyle = { borderColor: 'red' };

    return (
        <div className='main'>
            <div className="first-container">
                <div className="second-container">
                    <div className="forform" style={{ width: "100%" }}>
                        <h6>start for free</h6>
                        {form ? <h1 style={{ paddingBottom: "6px", paddingTop: '3px' }}>Create new account</h1> :
                            <h1>Sign in</h1>}

                        {form ? <p>Already a member? <a href='/' style={{ color: 'blue' }} onClick={toggleForm}>Login</a></p> :
                            <p>Don't have an account? <a href='/' style={{ color: 'blue' }} onClick={toggleForm}>Register</a></p>
                        }

                        {/* Top level API errors (e.g. Invalid credentials) */}
                        {errors.api && <p style={{ color: 'red', fontSize: '14px', textAlign: 'center', backgroundColor: '#ffe6e6', padding: '10px', borderRadius: '5px' }}>{errors.api}</p>}

                        {form ? (
                            /* REGISTRATION FORM */
                            <form style={{ border: 'none', outline: 'none', boxShadow: 'none', gap: '7px', display: 'flex', flexDirection: 'column', width: '100%', paddingTop: '15px' }} onSubmit={userregistration}>

                                <input type="text" placeholder='User Name' style={errors.userName ? inputErrorStyle : null} onChange={e => setUserName(e.target.value)} />
                                {errors.userName && <span style={errorStyle}>{errors.userName}</span>}

                                <input type="email" placeholder='Email' style={errors.email ? inputErrorStyle : null} onChange={e => setEmail(e.target.value)} />
                                {errors.email && <span style={errorStyle}>{errors.email}</span>}

                                <input type="tel" placeholder='Phone Number' style={errors.phonenumber ? inputErrorStyle : null} onChange={e => setPhoneNumber(e.target.value)} />
                                {errors.phonenumber && <span style={errorStyle}>{errors.phonenumber}</span>}

                                <input type="file" placeholder='Profile Picture' style={errors.photo ? inputErrorStyle : null} onChange={event => setphoto(event.target.files[0])} />
                                {errors.photo && <span style={errorStyle}>{errors.photo}</span>}

                                <input type="text" placeholder='Login as (e.g. user/admin)' style={errors.role ? inputErrorStyle : null} onChange={e => setRole(e.target.value)} />
                                {errors.role && <span style={errorStyle}>{errors.role}</span>}

                                <input type="password" placeholder='Password' style={errors.password ? inputErrorStyle : null} onChange={e => setPassword(e.target.value)} />
                                {errors.password && <span style={errorStyle}>{errors.password}</span>}

                                <input type="password" placeholder='Re-Password' style={errors.confirmPassword ? inputErrorStyle : null} onChange={e => setConfirmPassword(e.target.value)} />
                                {errors.confirmPassword && <span style={errorStyle}>{errors.confirmPassword}</span>}

                                <button type='submit' style={{ marginTop: '10px' }}>Submit</button>
                            </form>
                        ) : (
                            /* LOGIN FORM */
                            <form style={{ border: 'none', outline: 'none', boxShadow: 'none', gap: '7px', display: 'flex', flexDirection: 'column', width: '100%', paddingTop: '15px' }} onSubmit={userlogin}>

                                <input type="email" placeholder='Email' style={errors.email ? inputErrorStyle : null} onChange={e => setEmail(e.target.value)} />
                                {errors.email && <span style={errorStyle}>{errors.email}</span>}

                                <input type="password" placeholder='Password' style={errors.password ? inputErrorStyle : null} onChange={e => setPassword(e.target.value)} />
                                {errors.password && <span style={errorStyle}>{errors.password}</span>}

                                <button type='submit' style={{ marginTop: '10px' }}>Submit</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}