import React from "react";
import "../styles/HomePage.css";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

export default function TeacherSignin()
{

    return(
        <div className="home-full-screen">
        <div className="home-navBar">
            <NavBar/>
        </div>
        <div className="home-body">
            <div className="home-body-left">
                
                <p className="home-body-left-title-text">
                    Come teach with us
                </p>
                <p className="home-body-left-detail-text">
                Become an instructor and change 
                lives — including your 
                </p>
            <Link to="/teacher_reg">
                <button className="home-body-left-get-started">Get Started</button>
            </Link>
            </div>
            <div className="home-body-right-img-signin"></div>
        </div>
    </div>
    );
   
}