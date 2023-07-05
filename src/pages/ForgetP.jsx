import React from "react";
import "../styles/InputFormStyles.css";
import NavBar from "../components/NavBar";
import {Link, useNavigate} from 'react-router-dom';
import img from "../resources/images/stu-signin.jpeg";
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';

// Form Icons
import {FaFacebook} from "react-icons/fa";
import {GrMail} from "react-icons/gr";
import {RiLockPasswordFill} from "react-icons/ri";
import {FcGoogle} from "react-icons/fc";
import {AiFillTwitterCircle} from "react-icons/ai";
import server from "../apis/server";
import { useState } from "react";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const[message, setMessage] = useState("");

    const initialValues = {
        email: ''
      
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        
    });

    const onSubmit = (values) => {
        console.log(values);
        server
            .post("/auth/sendEmail", {
                email: values.email,
                
            })
            .then((res) => {
                console.log( res);

                if (res.status===200){
                    setMessage(res.data.message)
                    

                }
             
              
            })
            .catch((err) => {
                alert(err)
            })
    };

    return (
        <>
            <div className="home-full-screen">
                <div className="home-navBar">
                    <NavBar/>
                </div>
                <div className="signin-body">

                    <div className="signin-body-left">
                        <img className="signin-body-right-img" src={img} alt="img"/>

                    </div>
                    <div className="signin-body-form-right">
                        <h1 className="signin-title">Forgot Password</h1>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}>
                            {(formik) => (
                                <Form>
                                    <ul>
                                        <li className="signin-body-form-input-list">
                                            <GrMail size={20}/>
                                            <Field type="email" className="signin-username"
                                                   placeholder="Email"
                                                   name="email"
                                                   value={formik.values.email}
                                                   onChange={formik.handleChange} required/>
                                            <ErrorMessage name="email" component="div" className="error-msg"/>
                                            <p>{message}</p>




                                            

                                       
                                        </li>
                                        


                                       
                                        <li>
                                            <button type="submit"
                                                    className="signin-body-form-input-list register-btn">Verify
                                            </button>
                                        </li>

                                        <li className="signin-body-form-input-list-social-btn">
                                            <Link to='/signin'>
                                                <button type="button" className="create-acc-btn">Login
                                                </button>
                                            </Link>
                                        </li>
                                    </ul>
                                </Form>
                            )}
                        </Formik>
                </div>
                </div>
        </div>
        </>
        );
        
}