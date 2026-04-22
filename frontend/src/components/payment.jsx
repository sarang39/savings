import React, { useState } from 'react';
import "./payment.css";
import axios from 'axios';
export default function Payment() {

    const [payment, setpayment] = useState(50)
    const token = localStorage.getItem("AuthToken");
    async function addtransaction(e) {
        e.preventDefault()
        try {
            console.log(token)
            const response = await axios.post("https://savings-hndc.onrender.com/api/transactions/createTransaction", {
                "weeklypayment": Number(payment)
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (response.status === 201) {
                alert("Payment processed successfully!");
            }
        }
        catch (err) {
            alert("retry", err)
        }

    }
    // async function addpaymentS(e) {
    //     e.preventDefault()
    //     try {
    //         console.log(token)
    //         const response = await axios.post("https://savings-hndc.onrender.com/api/transactions/pay", { amount: Number(payment) })
    //         if (response.status === 200) {

    //         }
    //     } catch (err) {
    //         alert("retry", err)
    //     }
    // }
    async function addpaymentS(e) {
        e.preventDefault();
        try {
            const response = await axios.post(
                "https://savings-hndc.onrender.com/api/transactions/pay",
                { amount: Number(payment) }
            );

            if (response.status === 200) {
                // 🔥 REDIRECT to Stripe Checkout
                window.location.href = response.data.url;
            }

        } catch (err) {
            console.log(err);
            alert("Retry payment");
        }
    }


    // Implement payment logic here
    return (
        <div className="paymentcontainer"  >
            <div style={{ borderRadius: "25px" }} >
                <form className="form" >
                    <input type="amount" onChange={(e) => { setpayment(e.target.value) }} placeholder='Enter the amont' />
                    <button type="submit" onClick={(e) => addpaymentS(e)} >Pay Weeklypayment for: {payment}</button>
                </form>
            </div>
        </div >
    )
}





