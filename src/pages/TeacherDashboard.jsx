import React from "react";
import "../styles/HomePage.css";
import DashboardCard from "../components/TeacherDashboardCard";

export default function TeacherDashboard()
{
    return(
        <>
            <div className="teacher-dashboard-content">
                <DashboardCard/>
            </div>
        </>
    );
}
