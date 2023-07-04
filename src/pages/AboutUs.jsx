import React from "react";
import "../styles/HomePage.css";
import NavBar from "../components/NavBar";

export default function AboutUs() {
    return (
        <div>
            <div className="home-full-screen">
                <NavBar/>
                <div className="home-body">
                    <div className="about-body-left-detail">
                        <h1 className="home-body-left-title">
                            About Us
                        </h1>
                        <p className="home-body-left-description">
                            You don’t need to outright say, “our mission is ____,” but you should convey the mission of
                            your business in your About Us copy. This is key for attracting talent, as well as leads
                            that have Corporate Social Responsibility (CSR) goals.
                        </p>
                    </div>
                    <div className="home-body-right-img"></div>
                </div>
            </div>
        </div>
    );
}