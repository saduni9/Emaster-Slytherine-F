import React, {useState} from "react";
import DashboardCard from "./TeacherDashboardCard";
import EarningsCard from "./EarningsCard";
import MyCoursesCard from "./MyCoursesCard";
import Forum from "./Forum";

import '../styles/NavBar.css';
import {FiLogOut} from "react-icons/fi";
import {MdOutlineForum, MdWindow} from "react-icons/md";
import {BiDollarCircle} from "react-icons/bi";
import {FaGraduationCap} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";

export default function TeacherSideNav() {
    const [navItem, setNavItem] = useState("0");
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        navigate('/signin');
    };

    return (
        <>
            <div className="teacher-dashboard-container">
                <div className="side-nav-bar">
                    <ul className="side-nav-bar-ul">
                        <li className="side-nav-logo">eMaster</li>
                        <li className="side-nav-item" onClick={(e) => {
                            setNavItem("0")
                        }}>
                            <MdWindow size={30} className="side-nav-icon"/> Dashboard
                        </li>
                        <li className="side-nav-item" onClick={() => logout()}>
                            <FiLogOut size={30} className="side-nav-icon"/> Logout
                        </li>
                    </ul>
                </div>
                <AdminDashboard/>
            </div>
        </>
    );
}