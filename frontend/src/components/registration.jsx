
import "./registration.css"
import { useContext } from "react";
import { MyContext } from "./Mycontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Registration() {
    const Navigate = useNavigate()

    const {
        photo,
        form,
        setform,
        setphoto,
        userName,
        setUserName,
        role,
        setRole,
        email,
        setEmail,
        password,
        setPassword,
        phonenumber,
        setPhoneNumber,
        setOtp,
        setProfileData
    } = useContext(MyContext);


    async function userlogin(e) {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:5000/api/users/login", {
                email: email,
                password: password
            });
            if (response.status === 400) {
                alert("Invalid credentials");
            }
            console.log(response.status)
            if (response.status === 200) {
                setProfileData(response.data.user)
                console.log("Profile data:", response.data.user);
                alert("Login successful");
                localStorage.setItem("AuthToken", response.data.AuthToken);
                localStorage.setItem("id", response.data.user._id);
                Navigate("/home")
            }
        }
        catch (err) {

            console.log(err)
        }
    }
    async function userregistration(e) {
        e.preventDefault()
        try {
            const formData = new FormData();
            formData.append("name", userName);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("phonenumber", phonenumber);
            formData.append("photo", photo);
            formData.append("role", role);
            const response = await axios.post("http://localhost:5000/api/users/register", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (response.status === 201) {
                alert("User registered successfully");
                setUserName("");
                setEmail("");
                setPassword("");
                setPhoneNumber("");
                setRole("user")
                setform(0)
            }
            else {
                alert("Registration failed");
            }

        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="parant">
            {form ?
                <div >
                    <form className="form" onSubmit={userregistration}>
                        <h1>REGISTRATION FORM</h1>
                        <label htmlFor="name">Name
                            <input type="text" placeholder="Name" onChange={e => setUserName(e.target.value)} />
                        </label>
                        <label htmlFor="Email">Email <input type="text" placeholder="email" onChange={e => setEmail(e.target.value)} /></label>
                        <label htmlFor="">phone number <input type="tel" placeholder="pho" onChange={e => setPhoneNumber(e.target.value)} /></label>
                        <label htmlFor="photo">
                            Photo <input type="file" onChange={event => setphoto(event.target.files[0])} />
                        </label>
                        <label htmlFor="otp">otp <input type="password" onChange={e => setOtp(e.target.value)} /></label>
                        <label >
                            Login as {role}
                            <input className="slider" type="checkbox" onClick={() => {
                                role === "user" ?
                                    setRole("admin")
                                    :
                                    setRole("user")
                            }} />

                        </label>
                        <label htmlFor="password">password  <input type="password" onChange={e => setPassword(e.target.value)} /></label>
                        <label htmlFor="re-password">re-password  <input type="re-password" /> </label>
                        <button type="submit">submit</button>
                        <p style={{ alignSelf: 'center' }}>Already have an account? <button onClick={() => setform(0)} style={{ border: "none", background: "none", color: "blue" }}>Log in</button></p>


                    </form>
                </div>
                :
                <div>
                    <form className="form">
                        <h1>LOGIN FORM</h1>
                        <label htmlFor="Email">Email <input type="email" placeholder="email" onChange={e => setEmail(e.target.value)} /></label>
                        <label htmlFor="password">password  <input type="password" onChange={e => setPassword(e.target.value)} /></label>
                        <button onClick={userlogin}>submit</button>
                        <p style={{ alignSelf: 'center' }}>don't have an account? <button onClick={() => setform(1)} style={{ border: "none", background: "none", color: "blue" }}>Register</button></p>
                    </form>
                </div>}
        </div>
    )
}