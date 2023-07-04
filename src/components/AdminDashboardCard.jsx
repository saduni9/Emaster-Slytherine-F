import React, {useEffect, useState} from "react";
import server from "../apis/server";
import {AiFillStar} from "react-icons/ai";

export default function DashboardCard() {
    const [stat, setStat] = useState([]);

    function getCourseStats() {
        server.get("/admin/stats/courses",
            {
                headers: {"token": localStorage.getItem('user')}
            }
        )
            .then((res) => {
                console.log("result : ", res.data);
                setStat(res.data);
            })
            // Catch errors if any
            .catch((err) => {
                alert(err)
            })
    }

    useEffect(() => {
        getCourseStats();
    }, []);

    useEffect(() => {
        setDashboardCard([
            {icon: <AiFillStar/>, title: 'Total Users', count: stat.totalUsers},
            {icon: <AiFillStar/>, title: 'Total Students', count: stat.totalStudents},
            {icon: <AiFillStar/>, title: 'Total Instructors', count: stat.totalInstructors},
            {icon: <AiFillStar/>, title: 'Total Courses', count: stat.totalCourses},
            {icon: <AiFillStar/>, title: 'Total Payments', count: stat.totalPayment}
        ]);
    }, [stat]);

    const [dashboardCard, setDashboardCard] = useState([
        {icon: <AiFillStar/>, title: 'Total Users', count: 0,},
        {icon: <AiFillStar/>, title: 'Total Students', count: 0},
        {icon: <AiFillStar/>, title: 'Total Instructors', count: 0},
        {icon: <AiFillStar/>, title: 'Total Courses', count: 0,},
        {icon: <AiFillStar/>, title: 'Total Payments', count: 0}
    ])
    return (
        <>
            <div className="dashboard-card-container">
                {dashboardCard.map((data, id) => (
                    <div className="dashboard-card" key={id}>
                        <div className="dashboard-card-icon">{data.icon}</div>
                        <div className="dashboard-card-title">
                            {data.title} <br/>
                            {data.count}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}