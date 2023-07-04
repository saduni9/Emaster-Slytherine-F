import React from "react";
import "../styles/HomePage.css";
import NavBar from "../components/NavBar";
import {AiFillThunderbolt, AiOutlineArrowRight} from "react-icons/ai";
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
                                <AiFillThunderbolt size={40} className="home-body-left-count-thunder-icon"/>
                                <div>700+ <br/>
                                    <span className="home-body-left-count-list-text">Hours of Content</span>
                                </div>
                            </div>
                            <div className="home-body-left-count-list">
                                <AiFillThunderbolt size={40} className="home-body-left-count-thunder-icon"/>
                                <div>575k <br/>
                                    <span className="home-body-left-count-list-text">Active Users</span>
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