import React from "react";
import "../styles/HomePage.css";
import AdminDashboardCard from '../components/AdminDashboardCard'

export default function AdminDashboard()
{
    return(
        <>
            <div className="admin-dashboard-style">
                <AdminDashboardCard/>
            </div>
        </>
    );
}