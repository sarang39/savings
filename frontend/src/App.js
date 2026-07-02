import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from './components/registration';
import Home from './components/home';
import Nav from './components/nav-bar';
import { MyContext } from './components/Mycontext';
import { useState } from 'react';
import Profile from './components/profile';
import Payment from './components/payment';
import Success from './components/success';
import Cancel from './components/cancel';
import axios from 'axios';
import Chatbot from './components/chatbox';
import WaitingApproval from './components/waitingforapproval'
import TripNestLandingPage from './components/newidea/landingpage';
import Register from './components/newidea/newregistration';
import TripNestDashboard from './components/newidea/dashbord';
import GroupDetails from './components/newidea/groupdetails'
import AddContribution from './components/newidea/AddContribution';
import AddExpense from './components/newidea/AddExpense';
import CreateGroup from './components/newidea/CreateGroup';
import LoginPage from './components/newidea/logi';
import Test from './components/newidea/test';
import NewHomePage from './components/newidea/newhome';

import { LandPlotIcon } from 'lucide-react';
import JoinGroup from './components/newidea/joiningpage';
function App() {
  const token = localStorage.getItem('AuthToken');
  const userstatus = localStorage.getItem("status");
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState(null);
  const [phonenumber, setPhoneNumber] = useState(null);
  const [photo, setphoto] = useState(null)
  const [otp, setOtp] = useState(null);
  const [edit, setedit] = useState(0)
  const [userData, setUserData] = useState({})
  const [mapuser, setmapuser] = useState([])
  const [profileData, setProfileData] = useState({})
  const [form, setform] = useState(true)
  const [wallet, setwallet] = useState([])
  const [addpayment, setaddpayment] = useState(false);
  const [profit, setprofit] = useState()
  const [transactonData, settransactionData] = useState([])
  const value = {
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
    settransactionData,
    token
  }
  return (
    <div>
      <MyContext.Provider value={value}>
        <BrowserRouter>
          <Nav />
          <Chatbot />
          <Routes>
            {
              token ?
                <>
                  <Route path='/' element={<TripNestLandingPage />} />
                  <Route path='/joingroup/:tripId' element={<JoinGroup />} />
                  <Route path='/test' element={<Test />} />
                  <Route path='/landing' element={<TripNestLandingPage />} />
                  <Route path='/regi' element={<Register />} />
                  <Route path='/newhome' element={<NewHomePage />} />
                  <Route path='/dashboard' element={<TripNestDashboard />} />
                  <Route path='/groupdetail' element={<GroupDetails />} />
                  <Route path='/addcontribution' element={<AddContribution />} />
                  <Route path='/addexpense' element={<AddExpense />} />
                  <Route path='/creategroup' element={<CreateGroup />} />
                  <Route path='logi' element={<LoginPage />} />
                  <Route path='/registration' element={<Registration />} />
                  <Route path='/login' element={<Registration />} />
                  <Route path='/home' element={<Home />} />
                  <Route path='/profile/:id' element={<Profile />} />
                  <Route path='/success/:id' element={<Success />} />
                  <Route path='/cancel/:id' element={<Cancel />} />
                  <Route path='/payment/:tripId' element={<Payment />} />
                  <Route path='/waiting' element={<WaitingApproval />} />
                </>
                : (
                  <>
                    <Route path='/' element={<TripNestLandingPage />} />
                    <Route path='/regi' element={<Register />} />
                    <Route path='/logi' element={<LoginPage />} />
                  </>
                )
            }
          </Routes>
        </BrowserRouter>
      </MyContext.Provider>
    </div>

  );
};
export default App;