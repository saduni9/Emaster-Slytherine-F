import React ,{useState}from "react";
import "../styles/InputFormStyles.css";
import NavBar from "../components/NavBar";
import {Link, useNavigate,useParams} from 'react-router-dom';
import img from "../resources/images/stu-signin.jpeg";
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';

// Form Icons
import {FaFacebook} from "react-icons/fa";
import {GrMail} from "react-icons/gr";
import {RiLockPasswordFill} from "react-icons/ri";
import {RiLockPasswordLine } from "react-icons/ri";
import {FcGoogle} from "react-icons/fc";
import {AiFillTwitterCircle} from "react-icons/ai";
import server from "../apis/server";

export default function ResetPassword() {
    const navigate = useNavigate();
    const { id, token } = useParams();
    const[password, setPassword] = useState("");
    const[repPassword, setRepPassword] = useState("");
    const[message, setMessage] = useState("");
    


    console.log(token)

    const initialValues = {
       
        password: '',
        repPassword:''
    };

    const validationSchema = Yup.object({
        password: Yup.string().required('Password is required'),
        repPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Repeat password is required'),
    });

    const onSubmit = (values) => {
        console.log('hiiiiiiiiiiiiiiiiiiiiii');
        server
            .post(`/auth/reset/${id}/${token}`, {
                new_password:password
            })
            .then((res) => {
                if (res.status===200){
                    setMessage(res.data.message)
                    

                }
                console.log(res);
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
                        <h1 className="signin-title">Reset Password</h1>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}>
                            {(formik) => (
                                <Form>
                                    <ul>
                                      
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
                                         name="repPassword"
                                         value={repPassword}
                                         onChange={(e)=>setRepPassword(e.target.value)} required/>
                                         </li>


                                        
                                        <li>
                                        <p>{message}</p>

                                            <button type="submit"
                                            onClick={onSubmit}
                                                    className="signin-body-form-input-list register-btn">Reset
                                            </button>
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