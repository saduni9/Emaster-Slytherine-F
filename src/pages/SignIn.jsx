import React from "react";
import "../styles/InputFormStyles.css";
import NavBar from "../components/NavBar";
import {Link, useNavigate} from 'react-router-dom';
import img from "../resources/images/stu-signin.jpeg";
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';

// Form Icons

import {GrMail} from "react-icons/gr";
import {RiLockPasswordFill} from "react-icons/ri";
import server from "../apis/server";

export default function SignIn() {
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    const onSubmit = (values) => {
        console.log(values);
        server
            .post("/auth/login", {
                email: values.email,
                password: values.password
            })
            .then((res) => {
                console.log("result : ", res.data);
                localStorage.setItem('user', res.data.token);
                localStorage.setItem('role', res.data.role);
                if (res.data.role === "teacher") {
                    navigate('/teacher_dash');
                } else if (res.data.role === "student") {
                    navigate('/course_detail');
                } else if (res.data.role === "admin") {
                    navigate('/admin_dash');
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
                        <h1 className="signin-title">Login</h1>
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
                                                   placeholder="UserName"
                                                   name="email"
                                                   value={formik.values.email}
                                                   onChange={formik.handleChange} required/>
                                            <ErrorMessage name="email" component="div" className="error-msg"/>
                                        </li>
                                        <li className="signin-body-form-input-list">
                                            <RiLockPasswordFill size={20}/>
                                            <Field type="password" className="signin-username"
                                                   placeholder="Password"
                                                   name="password"
                                                   value={formik.values.password}
                                                   onChange={formik.handleChange} required/>
                                            <ErrorMessage name="password" component="div" className="error-msg"/>
                                        </li>


                                        {/* <li className="signin-body-form-input-list-checkbox">
                                            <input type="checkbox"/>Remeber Me
                                        </li> */}
                                        <li>
                                            <button type="submit"
                                                    className="signin-body-form-input-list register-btn">Login
                                            </button>
                                        </li>

                                        <div style={{display:"flex"}}>

                                        <li className="signin-body-form-input-list-social-btn">
                                            <Link to='/forgotPassword'>
                                                <button type="button" className="create-acc-btn"style={{textDecoration:'none'}}>Forgot Password
                                                </button>
                                            </Link>
                                        </li>
                                        

                                        <li className="signin-body-form-input-list-social-btn">
                                            <Link to='/student_reg'>
                                                <button type="button" className="create-acc-btn" style={{textDecoration:'none'}}>Create an account
                                                </button>
                                            </Link>
                                        </li>
                                        </div>
                                       
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