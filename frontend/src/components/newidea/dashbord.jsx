
import { useState } from 'react'
import './all.css'

export default function TripNestDashboard() {

    const [dashboardData] = useState({
        totalSaved: 45000,
        goalAmount: 60000,
        totalExpenses: 12500,
        remainingBalance: 32500,
        groupMembers: 8,
        recentExpenses: 4
    })

    const [activities] = useState([
        'Rahul added ₹5000 contribution',
        'Arun paid ₹3000 for hotel booking',
        `Trip goal updated to ₹${dashboardData.goalAmount.toLocaleString()}`,
        'Food expense added by Nithin'
    ])

    const [expenses] = useState([
        {
            category: 'Hotel',
            paidBy: 'Arun',
            amount: 3000,
            date: '12 May',
            status: 'Split Done'
        },
        {
            category: 'Food',
            paidBy: 'Rahul',
            amount: 1500,
            date: '13 May',
            status: 'Completed'
        },
        {
            category: 'Transport',
            paidBy: 'Nithin',
            amount: 2200,
            date: '14 May',
            status: 'Completed'
        }
    ])

    const [members] = useState([
        {
            name: 'Rahul',
            role: 'Admin',
            amount: 15000,
            progress: '75%'
        },
        {
            name: 'Arun',
            role: 'Member',
            amount: 11500,
            progress: '65%'
        },
        {
            name: 'Nithin',
            role: 'Member',
            amount: 9000,
            progress: '50%'
        }
    ])

    return (

        <div className="dashboard-page">

            {/* SIDEBAR */}

            <div className="dashboard-sidebar">

                <div>

                    <div className="dashboard-logo">
                        TripNest
                    </div>

                    <div className="dashboard-menu">

                        <div className="menu-item active-menu">
                            Dashboard
                        </div>

                        <div className="menu-item">
                            Groups
                        </div>

                        <div className="menu-item">
                            Contributions
                        </div>

                        <div className="menu-item">
                            Expenses
                        </div>

                        <div className="menu-item">
                            Analytics
                        </div>

                        <div className="menu-item">
                            Members
                        </div>

                        <div className="menu-item">
                            Settings
                        </div>

                    </div>

                </div>

                <div className="profile-box">

                    <div className="profile-avatar">
                        R
                    </div>

                    <div>

                        <h4>Rahul</h4>

                        <p>Group Admin</p>

                    </div>

                </div>

            </div>

            {/* MAIN */}

            <div className="dashboard-main">

                {/* TOPBAR */}

                <div className="dashboard-topbar">

                    <div>

                        <h1>
                            Travel Dashboard
                        </h1>

                        <p>
                            Welcome back! Here’s your latest trip overview.
                        </p>

                    </div>

                    <div className="topbar-actions">

                        <button className="dashboard-btn">
                            + Add Expense
                        </button>

                        <button className="dashboard-btn">
                            + Add Contribution
                        </button>

                    </div>

                </div>

                {/* CARDS */}

                <div className="dashboard-cards">

                    <div className="dashboard-card">

                        <p>Total Saved</p>

                        <h2>
                            ₹{dashboardData.totalSaved.toLocaleString()}
                        </h2>

                        <span>+12% this month</span>

                    </div>

                    <div className="dashboard-card">

                        <p>Goal Amount</p>

                        <h2>
                            ₹{dashboardData.goalAmount.toLocaleString()}
                        </h2>

                        <span>75% completed</span>

                    </div>

                    <div className="dashboard-card">

                        <p>Total Expenses</p>

                        <h2>
                            ₹{dashboardData.totalExpenses.toLocaleString()}
                        </h2>

                        <span>Updated today</span>

                    </div>

                    <div className="dashboard-card">

                        <p>Remaining Balance</p>

                        <h2>
                            ₹{dashboardData.remainingBalance.toLocaleString()}
                        </h2>

                        <span>Budget healthy</span>

                    </div>

                </div>

                {/* ANALYTICS */}

                <div className="dashboard-section-grid">

                    <div className="large-card">

                        <h2>
                            Contribution Analytics
                        </h2>

                        <div className="chart-placeholder">
                            Analytics Chart Area
                        </div>

                    </div>

                    <div className="large-card">

                        <h2 className="section-title">
                            Recent Activity
                        </h2>

                        {
                            activities.map((activity, index) => (

                                <div
                                    className="activity-item"
                                    key={index}
                                >

                                    <div className="activity-dot"></div>

                                    <p>
                                        {activity}
                                    </p>

                                </div>

                            ))
                        }

                    </div>

                </div>

                {/* TABLE */}

                <div className="large-card">

                    <div className="table-header">

                        <h2>
                            Recent Expenses
                        </h2>

                        <div className="badge">
                            {dashboardData.recentExpenses} New Expenses
                        </div>

                    </div>

                    <div className="table-wrapper">

                        <table className="expense-table">

                            <thead>

                                <tr>

                                    <th>Category</th>
                                    <th>Paid By</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Status</th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    expenses.map((expense, index) => (

                                        <tr key={index}>

                                            <td>{expense.category}</td>

                                            <td>{expense.paidBy}</td>

                                            <td>₹{expense.amount}</td>

                                            <td>{expense.date}</td>

                                            <td>
                                                <span className="badge">
                                                    {expense.status}
                                                </span>
                                            </td>

                                        </tr>

                                    ))
                                }

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* MEMBERS */}

                <div className="large-card members-section">

                    <div className="table-header">

                        <h2>
                            Top Contributors
                        </h2>

                        <div className="badge">
                            {dashboardData.groupMembers} Members
                        </div>

                    </div>

                    <div className="members-grid">

                        {
                            members.map((member, index) => (

                                <div
                                    className="member-card"
                                    key={index}
                                >

                                    <div className="member-top">

                                        <div className="profile-avatar">
                                            {member.name.charAt(0)}
                                        </div>

                                        <div>

                                            <h4>{member.name}</h4>

                                            <p>{member.role}</p>

                                        </div>

                                    </div>

                                    <h3>
                                        ₹{member.amount.toLocaleString()}
                                    </h3>

                                    <div className="progress-bar">

                                        <div
                                            className="progress-fill"
                                            style={{
                                                width: member.progress
                                            }}
                                        ></div>

                                    </div>

                                </div>

                            ))
                        }

                    </div>

                </div>

            </div>

        </div>

    )
}

