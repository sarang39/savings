
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./all.css";

export default function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        photo: null,
    });

    const [error, setError] = useState("");

    // Handle input change
    function handleChange(e) {
        const { name, value, files } = e.target;

        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    }

    // Submit form
    async function handleSubmit(e) {
        e.preventDefault();

        setError("");

        // Simple validation
        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match");
        }

        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("password", formData.password);

            if (formData.photo) {
                data.append("photo", formData.photo);
            }

            const response = await axios.post(
                `${process.env.REACT_APP_API}/api/users/register`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 201) {
                alert("Registration successful");
                navigate("/logi");
            }
            if (response.status === 400)
                alert("user already exist");


        } catch (err) {
            console.log(err);

            setError("Registration failed");
        }
    }

    return (

        <div className='register-page'>

            <div className='register-container'>

                <div className='register-left'>
                    <h1>Join TripNest</h1>

                    <p>
                        Create your account and start managing
                        group travel savings, shared expenses,
                        and trip planning easily.
                    </p>

                    <div className='register-features'>
                        <div>✔ Expense Splitting</div>
                        <div>✔ Group Savings</div>
                        <div>✔ Travel Budget Tracking</div>
                        <div>✔ Analytics Dashboard</div>
                    </div>
                </div>


                <form className="register-form" onSubmit={handleSubmit}>

                    <h2>Create Account</h2>

                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="file"
                        name="photo"
                        onChange={handleChange}
                    />

                    <button type="submit">
                        Register
                    </button>

                </form>
            </div>
        </div>

    );
}