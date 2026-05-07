
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from './components/registration';
import Home from './components/home';
import Nav from './components/nav-bar';
import { MyContext } from './components/Mycontext';
import { useEffect, useState } from 'react';
import Profile from './components/profile';
import Payment from './components/payment';
import Success from './components/success';
import Cancel from './components/cancel';
import axios from 'axios';

function App() {
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState(null);
  const [phonenumber, setPhoneNumber] = useState(null);
  const [photo, setphoto] = useState(null)
  const [otp, setOtp] = useState(null);
  const [edit, setedit] = useState(0)
  // userData holds the currently authenticated user's profile information.
  // we start with an empty object rather than an array to match the shape
  // returned by the server and avoid .map() errors.
  const [userData, setUserData] = useState({})
  const [mapuser, setmapuser] = useState([])
  const [profileData, setProfileData] = useState({})
  const [form, setform] = useState(true)
  const [wallet, setwallet] = useState([])
  const [addpayment, setaddpayment] = useState(false);
  const [profit, setprofit] = useState()
  const [transactonData, settransactionData] = useState([])
  const [isAdmin, setIsAdmin] = useState(false);
  const token = localStorage.getItem("token");

  async function fetchUserData() {
    try {
      const response = await axios.get("https://savings-hndc.onrender.com/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
      setIsAdmin(response.data.role === "admin");
      console.log("Fetched user data:", response.data);
      console.log("User role:", response.data.role);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);


  const value = {
    isAdmin, setIsAdmin,
    addpayment, setaddpayment,
    profit, setprofit,
    wallet, setwallet,
    form, setform,
    edit, setedit,
    mapuser,
    profileData,
    setProfileData,
    setmapuser,
    userName,
    userData,
    setUserData,
    setUserName,
    setEmail,
    email,
    role,
    setRole,
    password,
    setPassword,
    phonenumber,
    setPhoneNumber,
    photo,
    setphoto,
    otp,
    setOtp,
    transactonData,
    settransactionData
  }
  return (
    < div style={{}}>
      <MyContext.Provider value={value}>
        <BrowserRouter>
          <Nav />
          <div style={{
          }}></div>
          < Routes >
            <Route path='/registration' element={<Registration />} />
            <Route path='/home' element={<Home />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='/login' element={<Registration />} />
            <Route path='/success/:id' element={<Success />} />
            <Route path='/cancel/:id' element={<Cancel />} />
            <Route path='/payment/:id' element={<Payment />} />
          </Routes>
        </BrowserRouter>
      </MyContext.Provider >
    </div>
  );
};
export default App;