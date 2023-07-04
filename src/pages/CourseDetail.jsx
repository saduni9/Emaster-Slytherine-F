import React from "react";
import "../styles/HomePage.css";
import NavBar from "../components/NavBar";
import CourseCard from "../components/CourseCard";

export default function CourseDetail()
{
    return(
        <>
        <div className="home-full-screen">
            <div className="home-navBar">
                <NavBar/>
            </div>
            <div className="course-body-content">
                <CourseCard/>
            </div>
        </div>
        
        </>
    );
}