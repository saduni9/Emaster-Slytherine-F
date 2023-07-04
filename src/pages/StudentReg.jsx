import React, {useState} from "react";
import "../styles/InputFormStyles.css";
import NavBar from "../components/NavBar";
import {Link} from 'react-router-dom';
import img from "../resources/images/stu_reg.jpeg";

//Form Icons
import { FaUserAlt, FaFacebook } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { AiFillTwitterCircle } from "react-icons/ai";

export default function StudentReg()
{
    const[firstName, setFirstName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[repPassword, setRepPassword] = useState("");

    function handleReg()
    {
        
    }

    return(
        <>
        <div className="home-full-screen">
            <div className="home-navBar">
                <NavBar/>
            </div>
            <div className="signin-body">
                <div className="signin-body-form">
                    <h1 className="signin-title">Sign Up <br/><span className="signin-title-start-teach">and Start Learning</span></h1>
                    <ul>
                        <li className="signin-body-form-input-list">
                            <FaUserAlt size={20}/>
                            <input type="text" className="signin-username" 
                            placeholder="First Name"
                            name="firstname"
                            value={firstName}
                            onChange={(e)=>setFirstName(e.target.value)} required/>
                        </li>
                        <li className="signin-body-form-input-list">
                            <GrMail size={20}/>
                            <input type="email" className="signin-username" 
                            placeholder="Your email"
                            name="email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)} required/>
                        </li>
                        <li className="signin-body-form-input-list">
                            <RiLockPasswordFill size={20}/>
                            <input type="password" className="signin-username" 
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)} required/>
                        </li>
                        <li className="signin-body-form-input-list">
                            <RiLockPasswordLine size={20}/>
                            <input type="password" className="signin-username" 
                            placeholder="Repeat Password"
                            name="reppassword"
                            value={repPassword}
                            onChange={(e)=>setRepPassword(e.target.value)} required/>
                        </li>
                       
                        <li className="signin-body-form-input-list-checkbox">
                            <input type="checkbox"/>I agree all the terms of Service
                        </li>
                        <li>
                            <button type="submit" onClick={handleReg} className="signin-body-form-input-list register-btn">Register</button>
                        </li>
                        <li className="signin-body-form-input-list-social-btn">
                            <p className="signin-body-form-input-list-continue-with"> Continue With </p>
                            <div className="signin-form-social-media-btn-set" style={{marginRight:'40%'}}>
                                <FcGoogle size={20}/>
                                <AiFillTwitterCircle size={20}/>
                                <FaFacebook size={20}/>   
                            </div>
                          
                        </li>
                    </ul>
                </div>
                <div className="signin-body-right">
                    <img className="signin-body-right-img" src={img}></img>
                    <Link to = '/signin'>
                         <button type="button" className="signin-body-right-already-member-btn">I am already a member</button>
                    </Link>
                </div>
                </div>
        </div>
        
        </>
    );
}