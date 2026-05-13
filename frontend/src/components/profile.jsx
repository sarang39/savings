import axios from "axios";
import "./profile.css";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./Mycontext";
import { useNavigate } from "react-router-dom";
import photo1 from "./images/Screenshot 2026-03-19 122942.png"
import photo2 from "./images/Screenshot 2026-03-19 123007.png"
import photo3 from "./images/Screenshot 2026-03-19 123023.png"
import { useParams } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function Profile() {
    const COLORS = ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#6b7280"];
    const navigate = useNavigate();
    const [newname, setnewname] = useState()
    const [payment, setpayment] = useState(50)
    const [graphdata, setgraphdata] = useState([
        { name: "Housing", value: 1450 },
        { name: "Food", value: 850 },
        { name: "Transport", value: 620 },
        { name: "Entertainment", value: 480 },
        { name: "Others", value: 830 }
    ])
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
            const response = await axios.get(`${process.env.REACT_APP_API}/api/transactions/allcalculations`)
            setwallet(response.data.wallet)
            setgraphdata([
                { name: "weekly payment total:", value: response.data.weeklypaymenttotal },
                { name: "weekly payment fine total", value: response.data.weeklypaymentfine },
                { name: "wallet", value: response.data.wallet },

            ])

        }
        catch (err) {
            console.log(err)
        }
    }

    async function usertrnsation() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/transactions/gettransaction/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            settransactionData(response.data)
            console.log("transaction response", response.message)
        }
        catch (err) {
            console.error("error fetching transaction", err);
        }
    }

    async function getProfilepermenet() {
        try {
            if (!token) {
                console.error("No token found in storage");
                return;
            }
            const response = await axios.get(`${process.env.REACT_APP_API}/api/users/profileper`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setUserData(response.data)
            usertrnsation()
            console.log("profile response:::", response.data);
            if (typeof transactionData !== 'undefined') {
                console.log("Transaction Data::::", transactonData);
            }
        }
        catch (err) {
            console.error("error fetching profile:::", err);
        }

    }

    async function Edituser() {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API}/api/users/edituser/${id}`, { name: newname }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                alert("successfully changed")
                setedit(0)

            }
        }
        catch (err) {
        }
    }
    //re-payment
    async function RePay(id) {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API}/api/transactions/editpayment/${id}`,
                {
                    weeklypayment: payment,
                    paymentid: id
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                });
            if (response.status === 200) {
                // getProfileANDtransactions();
                getProfilepermenet();
                alert("successfully changed");


            }
            if (response.status === 403) {
                alert("Your not admin");


            }
        }
        catch (err) {
            if (err.status === 403) {
                alert("Your not admin");


            }
        }
    }
    useEffect(() => {
        // getProfileANDtransactions();

        getProfilepermenet();
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
                    <div>
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
                                                <p className="profile-phone">{userData.phonenumber}</p>
                                                <p className="profile-location">New York, NY</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <p>Loading...</p>
                                    )}
                            </div>
                        </div>

                        <div style={{
                            width: "350px",
                            height: "auto",
                            background: "#0f172a",
                            borderRadius: "20px",
                            padding: "20px",
                            color: "white",
                            marginTop: "20px"
                        }}>
                            <h3>Amount Overview</h3>

                            <PieChart width={300} height={300}>
                                <Pie
                                    data={graphdata}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}   // makes it donut
                                    outerRadius={100}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {graphdata.map((entry, index) => (
                                        <Cell key={index} fill={COLORS[index]} />
                                    ))}
                                </Pie>

                                <Tooltip />
                            </PieChart>
                            <div>
                                {graphdata.map((entry, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        {/* Small color cube */}
                                        <div
                                            style={{
                                                width: "15px",
                                                height: "15px",
                                                backgroundColor: COLORS[index],
                                                borderRadius: "3px",
                                            }}
                                        ></div>

                                        {/* Text */}
                                        <span>
                                            {entry.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
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
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Fine</th>
                                        <th>Loan</th>
                                        <th>
                                            <button
                                                style={{ width: '50%', height: '100%', fontSize: "1rem" }}
                                                onClick={() => setaddpayment(true)}
                                            >
                                                ⚙️
                                            </button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactonData.map((item) => (
                                        <tr key={item._id}>
                                            <td>{item.date.split('T')[0]}</td>
                                            <td>{item.weeklypayment}</td>
                                            <td>{item.weeklypaymentfine}</td>
                                            <td>{item.loan}</td>
                                            {addpayment && item.weeklypayment === 0 ? (
                                                <td style={{ display: "flex", gap: '10px' }}>
                                                    <button style={{ width: '50%', height: '100%', fontSize: "1rem" }}>
                                                        Delete
                                                    </button>
                                                    <button
                                                        style={{ width: '50%', height: '100%', fontSize: "1rem" }}
                                                        onClick={() => RePay(item._id)}
                                                    >
                                                        Re-pay
                                                    </button>
                                                </td>
                                            ) : (
                                                <td></td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
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
                                                        ? `${process.env.REACT_APP_API}${userData.photo}`
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
            <div> </div>

        </div >
    )
}