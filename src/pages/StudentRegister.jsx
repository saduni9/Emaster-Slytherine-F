import React from "react";
import * as Yup from "yup";
import "../styles/InputFormStyles.css";
import NavBar from "../components/NavBar";
import {Link, useNavigate} from "react-router-dom";
import img from "../resources/images/stu_reg.jpeg";

//Form Icons
import {FaUserAlt} from "react-icons/fa";
import {GrMail} from "react-icons/gr";
import {RiLockPasswordFill, RiLockPasswordLine} from "react-icons/ri";
import {ErrorMessage, Field, Form, Formik} from "formik";
import server from "../apis/server";

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    repPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    termsOfService: Yup.boolean().oneOf([true], 'Must accept terms of service')
});


export default function StudentRegister() {
    const navigate = useNavigate();

    function handleReg(values) {
        console.log(values);

        server
            .post(
                "/student/registerStudent",
                {
                    name: values.firstName,
                    email: values.email,
                    password: values.password,
                },
                {
                    headers: {
                        token: localStorage.getItem("user"),
                    },
                }
            )
            .then((res) => {
                console.log("result : ", res.data);
                if (res.data === "success") {
                    navigate("/signin");
                }
            })
            .catch((err) => {
                alert(err);
            });
    }


    const initialValues = {
        firstName: '',
        email: '',
        password: '',
        repPassword: '',
        termsOfService: false
    };

    return (
        <>
            <div className="home-full-screen">
                <div className="home-navBar">
                    <NavBar/>
                </div>
                <div className="signin-body">
                    <div className="signin-body-form">
                        <h1 className="signin-title">Sign Up <br/><span className="signin-title-start-teach">and Start Learning</span>
                        </h1>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleReg}>
                            {() => (
                                <Form>
                                    <div>
                                        <ul>
                                            <li className="signin-body-form-input-list">
                                                <FaUserAlt size={20}/>
                                                <Field type="text" className="signin-username" placeholder="First Name"
                                                       name="firstName" required/>
                                                <ErrorMessage name="firstName" component="div"
                                                              className="error-message"/>
                                            </li>
                                            <li className="signin-body-form-input-list">
                                                <GrMail size={20}/>
                                                <Field type="email" className="signin-username" placeholder="Your email"
                                                       name="email" required/>
                                                <ErrorMessage name="email" component="div" className="error-message"/>
                                            </li>
                                            <li className="signin-body-form-input-list">
                                                <RiLockPasswordFill size={20}/>
                                                <Field type="password" className="signin-username"
                                                       placeholder="Password"
                                                       name="password" required/>
                                                <ErrorMessage name="password" component="div"
                                                              className="error-message"/>
                                            </li>
                                            <li className="signin-body-form-input-list">
                                                <RiLockPasswordLine size={20}/>
                                                <Field type="password" className="signin-username"
                                                       placeholder="Repeat Password" name="repPassword" required/>
                                                <ErrorMessage name="repPassword" component="div"
                                                              className="error-message"/>
                                            </li>
                                            <li className="signin-body-form-input-list-checkbox">
                                                <label>
                                                    <Field type="checkbox" name="termsOfService" required/>
                                                    I agree all the terms of Service
                                                </label>
                                                <ErrorMessage name="termsOfService" component="div"
                                                              className="error-message"/>
                                            </li>
                                            <li>
                                                <button type="submit"
                                                        className="signin-body-form-input-list register-btn">Register
                                                </button>
                                            </li>
                                            <li className="signin-body-form-input-list-social-btn">
                                                
                                                <div className="signin-form-social-media-btn-set">
                                                
                                                    <Link to='/signin'>
                                                        <button type="button"
                                                                className="signin-body-right-already-member-btn">I am
                                                            already a member
                                                        </button>
                                                    </Link>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div className="signin-body-right">
                        <img className="signin-body-right-img" src={img} alt="img"></img>
                    </div>
                </div>
            </div>
        </>
    );
}