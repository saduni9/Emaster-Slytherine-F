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
                        <li className="side-nav-item" onClick={(e) => {
                            setNavItem("1")
                        }}>
                            <MdOutlineForum size={30} className="side-nav-icon"/> Forums
                        </li>
                        <li className="side-nav-item" onClick={(e) => {
                            setNavItem("2")
                        }}>
                            <BiDollarCircle size={30} className="side-nav-icon"/> Earnings
                        </li>
                        <li className="side-nav-item" onClick={(e) => {
                            setNavItem("3")
                        }}>
                            <FaGraduationCap size={30} className="side-nav-icon"/> My Courses
                        </li>
                        <li className="side-nav-item" onClick={() => logout()}>
                            <FiLogOut size={30} className="side-nav-icon"/> Logout
                        </li>
                    </ul>
                </div>
                {navItem === "0" &&
                    <div className="teacher-dashboard-body-content">
                        <div className="teacher-dashboard-body-user-bar">

                        </div>
                        <DashboardCard/>
                    </div>
                }
                {navItem === "1" &&
            <div className="teacher-dashboard-body-content">
                <div className="teacher-dashboard-body-user-bar">

                </div>
                <Forum/>
            </div>
            }
            { navItem === "2" &&
            <div className="teacher-dashboard-body-content">
                <div className="teacher-dashboard-body-user-bar">

                </div>
                <EarningsCard/>
            </div>
            }
            { navItem === "3" &&
            <div className="teacher-dashboard-body-content">
                <div className="teacher-dashboard-body-user-bar">

                </div>
                <MyCoursesCard/>
            </div>
            }
        </div>
        </>
    );
}