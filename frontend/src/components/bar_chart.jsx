import React from "react";
import { Bar } from "react-chartjs-2";
import "./chart.css";
import axios from "axios";
import { useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const MyChart = () => {
    const [maptransaction, setmaptransaction] = useState([])

    async function GetAlltransactions() {
        try {
            const res = await axios.get(`http://localhost:5000/api/transactions/listTransactions`)
            setmaptransaction(res.data)

        }
        catch (err) {
            console.log("error in featch transaction:", err)
        }
    }
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Total",
                data: [100, 400, 150, 30, 25, 35, 40, 45, 30, 20, 15, 10],
                backgroundColor: "rgba(141, 227, 227, 0.6)"//rgba(75,192,192,0.6)
            }
        ]
    };
    return (
        <div style={{ width: "100%", height: "100vh", display: "flex", alignItems: "end", justifyContent: "center" }}>
            <div className="chart-container" >
                <Bar data={data} />
            </div >
        </div>
    );
};

export default MyChart;