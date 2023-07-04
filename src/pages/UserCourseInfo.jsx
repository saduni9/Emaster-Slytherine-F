import React from "react";
import "../styles/HomePage.css";
import "../styles/ComponentStyles.css";
import LoggedUserNavBar from "../components/LoggedUserNavBar";
import CourseCompletedCard from "../components/CourseCompletedCard";
import CourseOngoingCard from "../components/CourseOngoingCard";
import NavBar from "../components/NavBar";

export default function UserCourseInfo()
{
    return(
        <>
        <div className="home-full-screen">
            <div className="home-navBar">
                <NavBar/>
            </div>
            <div className="course-info-content">
                <div className="course-info-completed">
                    <CourseCompletedCard/>
                </div>
                <div className="course-info-ongoing">
                    <CourseOngoingCard/>
                </div>
            </div>
        </div>
        
        </>
    );
}