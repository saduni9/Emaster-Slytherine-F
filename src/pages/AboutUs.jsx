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
                        Welcome to eMaster, where knowledge meets convenience. We are passionate about providing an engaging and accessible online learning platform that empowers individuals to unlock their full potential, anytime and anywhere.
                        </p>
                        <p className="home-body-left-description">
                        We believe that education should be a lifelong journey, and our eLearning system is designed to make that journey as enjoyable and enriching as possible.
                         </p>
                    </div>
                    <div className="home-body-right-img"></div>
                </div>
            </div>
        </div>
    );
}