import axios from "axios";
import "./profile.css";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./Mycontext";
import photo1 from "./images/Screenshot 2026-03-19 122942.png"
import photo2 from "./images/Screenshot 2026-03-19 123007.png"
import photo3 from "./images/Screenshot 2026-03-19 123023.png"
import { useNavigate, useParams } from "react-router-dom";
export default function Profile() {
    const navigate = useNavigate();
    const [newWeeklyPayment, setNewWeeklyPayment] = useState(0)
    const [newname, setnewname] = useState()
    const [payment, setpayment] = useState(50)
    const token = localStorage.getItem("AuthToken");
    const {
        userData,
        setUserData,
        edit,
        setedit,
        wallet,
        setwallet,
        addpayment,
        setaddpayment,
        transactonData,
        settransactionData
    }
        = useContext(MyContext)
    const { id } = useParams()
    const totalAmount = transactonData.reduce(
        (sum, item) => sum + item.weeklypayment, 0
    );
    async function totaldetails() {
        try {
            const response = await axios.get("https://savings-hndc.onrender.com/api/transactions/allcalculations")
            setwallet(response.data.wallet)
        }
        catch (err) {
            console.log(err)
        }
    }

    async function usertrnsation() {
        try {
            const response = await axios.get(`https://savings-hndc.onrender.com/api/transactions/gettransaction/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            settransactionData(response.data)
            console.log("transaction response", response.data)
        }
        catch (err) {
            console.error("error fetching transaction", err);
        }
    }
    async function getProfileANDtransactions() {
        try {
            const response = await axios.get(`https://savings-hndc.onrender.com/api/users/profile/${id}`)
            console.log("profile response", response.data);
            setUserData(response.data)
            usertrnsation()
        }
        catch (err) {
            console.error("error fetching profile", err);
        }
        console.log("transaction data", transactonData)
    }

    async function Edituser() {
        try {
            const response = await axios.put(`https://savings-hndc.onrender.com/api/users/edituser/${id}`, { name: newname }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                alert("successfully changed")
                setedit(0)
                // getProfileANDtransactions();
            }
        }
        catch (err) {
        }
    }
    //re-payment
    async function RePay(id) {
        try {
            const response = await axios.put(`https://savings-hndc.onrender.com/api/transactions/editpayment/${id}`,
                {
                    weeklypayment: payment,
                    paymentid: id
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                });
            if (response.status === 200) {
                alert("successfully changed")

            }
        }
        catch (err) {
        }
    }
    useEffect(() => {
        getProfileANDtransactions();
        totaldetails()
    }, [id]);
    return (
        <div style={{
            paddingTop: '20px'
        }} >
            <div >
            </div>
            {edit === 0 ? (

                <div className="details">

                    <div className="left">
                        <div className="profile-card">
                            {userData && typeof userData === 'object' ?
                                (
                                    <div>
                                        <div className="profile-image-wrapper">
                                            {console.log("photo path", userData.photo)}<img
                                                src={
                                                    userData.photo
                                                        ? userData.photo
                                                        : "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-transparent-600nw-2463868847.jpg"
                                                }
                                                alt="profile" />
                                        </div>
                                        <div>
                                            <h2 className="profile-name">{userData.name}</h2>
                                            <p className="profile-role">{userData.email}</p>
                                            <p className="profile-email">{userData._id}</p>
                                            <p className="profile-phone">{userData.phonenumber}</p>
                                            <p className="profile-location">New York, NY</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p>Loading...</p>
                                )}
                        </div>
                    </div>
                    <div className="right">
                        <div className="amounts">
                            <div style={{ background: "linear-gradient(130deg, #1f1a70, #000000)" }}>
                                <div>{wallet}</div>
                                <div>
                                    <img src={photo1} alt="photo" />
                                </div>
                            </div>
                            <div style={{ background: "linear-gradient(130deg, #51b870, #000000)" }}>
                                <div>{totalAmount < wallet ? wallet - totalAmount : 0}</div>

                                <div>
                                    <img src={photo2} alt="photo" />
                                </div>
                            </div>
                            <div style={{ background: 'linear-gradient(130deg, #780606,black)' }}>
                                <div>{totalAmount > wallet ? wallet - totalAmount : 0}</div>
                                <div>
                                    <img src={photo3} alt="photo" />
                                </div>
                            </div>
                        </div>
                        <div className="transaction-details">
                            <p>transaction details</p>
                            <table className="transaction-table">
                                <tr>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Fine</th>
                                    <th>Loan</th>
                                    <th><button style={{ width: '50%', height: '100%', fontSize: "1rem" }} onClick={() => (setaddpayment(true))}>⚙️{console.log(addpayment)}</button>

                                    </th>
                                </tr>
                                {
                                    transactonData.map((item) => (
                                        <tr
                                            key={item._id}>
                                            <td>{item.date.split('T')[0]}</td>
                                            <td>{item.weeklypayment}</td>
                                            <td>{item.weeklypaymentfine}</td>
                                            <td>{item.loan}</td>
                                            {addpayment && item.weeklypayment === 0 ?
                                                <td style={{ display: "flex", gap: '10px' }} >
                                                    <button style={{ width: '50%', height: '100%', fontSize: "1rem" }} >Delete</button>
                                                    <button style={{ width: '50%', height: '100%', fontSize: "1rem" }} onClick={() => RePay(item._id)} >Re-pay{item._id}</button></td>
                                                :
                                                <td>

                                                </td>}
                                        </tr>
                                    ))}
                            </table>
                        </div>
                    </div>
                </div>) : (
                <div style={{
                    width: "100%", height: "100vh", alignItems: 'center', justifyContent: 'center', display: ' flex'
                }}>
                    <div style={{ width: "50vw" }}>
                        {
                            userData && typeof userData === 'object' ?
                                (
                                    <div>
                                        <div className="profile-image-wrapper">
                                            <img
                                                src={
                                                    userData.photo
                                                        ? `https://savings-hndc.onrender.com${userData.photo}`
                                                        : "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-transparent-600nw-2463868847.jpg"
                                                }
                                                alt="profile"
                                            />
                                        </div>
                                        <div className="" style={{
                                            alignItems: 'center', justifyContent: 'center', display: ' flex'
                                        }} >
                                            <form onSubmit={Edituser}>
                                                <h1 >EDIT</h1>
                                                <label htmlFor="Email">name <input type="name" placeholder="name" onChange={(e) => (setnewname(e.target.value))} /></label>
                                                <label htmlFor="tel">phone  <input type="tel" /></label>
                                                {console.log(userData)}
                                                <button type="submit" >SAVE</button>
                                            </form>
                                        </div>
                                    </div>
                                ) : (
                                    <p>Loading...</p>
                                )
                        }
                    </div>
                </div >)
            }
        </div >
    )
}