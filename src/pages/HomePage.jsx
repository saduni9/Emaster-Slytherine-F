import React from "react";
import "../styles/HomePage.css";
import NavBar from "../components/NavBar";
import {AiFillThunderbolt, AiOutlineArrowRight, AiOutlineFire, AiOutlineClockCircle} from "react-icons/ai";
import {Link} from "react-router-dom";

export default function HomePage() {
    return (
        <div>
            <div className="home-full-screen">
                <NavBar/>
                <div className="home-body">
                    <div className="home-body-left-detail">
                        <h1 className="home-body-left-title">
                            Sri Lanka's #1 Online Learning Platform
                        </h1>
                        <p className="home-body-left-description">
                            Study Any Local Curriculum Lesson
                        </p>
                        <Link to="/signin">
                            <button className="home-body-left-signin">SignIn <AiOutlineArrowRight size={10}/></button>
                        </Link>
                        <Link to="/about">
                            <button className="home-body-left-learnMore">Learn More</button>
                        </Link>
                        <div className="home-body-left-count">
                            <div className="home-body-left-count-list">
                                <AiOutlineFire size={40} className="home-body-left-count-thunder-icon"/>
                                <div>POWERFUL PROGRAM <br/>
                                    <span className="home-body-left-count-list-text">Our courses are up to date with latest syllabus</span>
                                </div>
                            </div>
                            <div className="home-body-left-count-list">
                                <AiOutlineClockCircle size={40} className="home-body-left-count-thunder-icon"/>
                                <div>24/7 SUPPORT <br/>
                                    <span className="home-body-left-count-list-text">Anytime support from our course providers</span>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="home-body-right-img"></div>
                </div>
            </div>
        </div>
    );
}