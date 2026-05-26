import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./all.css";

export default function LoginPage() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    // Validation
    function validateLogin() {

        let newErrors = {};

        if (!email.trim()) {
            newErrors.email = "Email is required";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    // Login Function
    async function userlogin(e) {

        e.preventDefault();

        // Validate
        if (!validateLogin()) return;

        try {

            const response = await axios.post(
                `${process.env.REACT_APP_API}/api/users/login`,
                {
                    email,
                    password,
                }
            );

            // Success
            if (response.status === 200) {

                localStorage.setItem(
                    "AuthToken",
                    response.data.AuthToken
                );

                localStorage.setItem(
                    "id",
                    response.data.user._id
                );

                localStorage.setItem(
                    "role",
                    response.data.user.status
                );

                setErrors({});

                // Navigate
                if (response.data.user.status === "approved") {
                    navigate("/home");
                } else {
                    navigate("/waiting");
                }
            }

        } catch (err) {

            console.log(err);

            setErrors({
                api: "Invalid email or password"
            });
        }
    }

    return (


        <div className='register-page'>

            <div className='register-container'>

                <div className='register-left'>

                    <h1>Welcome Back to TripNest</h1>

                    <p>
                        Login to continue managing your travel groups,
                        track shared expenses, monitor savings,
                        and plan trips with your friends easily.
                    </p>

                    <div className='register-features'>

                        <div>✔ Manage Group Trips</div>

                        <div>✔ Split Expenses Fairly</div>

                        <div>✔ Track Travel Savings</div>

                        <div>✔ Secure & Fast Access</div>

                    </div>

                </div>



                <form
                    className="register-form"
                    onSubmit={userlogin}
                >

                    <h2>Login</h2>

                    {/* API Error */}
                    {errors.api && (
                        <p style={{ color: "red" }}>
                            {errors.api}
                        </p>
                    )}

                    {/* Email */}
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {errors.email && (
                        <p style={{ color: "red" }}>
                            {errors.email}
                        </p>
                    )}

                    {/* Password */}
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {errors.password && (
                        <p style={{ color: "red" }}>
                            {errors.password}
                        </p>
                    )}

                    {/* Button */}
                    <button type="submit">
                        login

                    </button><h4>

                        dont have an account? <a href="/regi">Register here</a>
                    </h4>
                </form>

            </div>
        </div>

    );
}


///