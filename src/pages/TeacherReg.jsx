import React,{useState} from "react";
import * as Yup from "yup";
import "../styles/InputFormStyles.css";
import NavBar from "../components/NavBar";
import {Link, useNavigate} from "react-router-dom";
import img from "../resources/images/teacher_reg.jpeg";
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import {storage} from '../config/firebaseConfig';
import { FaUserAlt } from 'react-icons/fa';



//Form Icons

import {GrMail} from "react-icons/gr";
import {RiLockPasswordFill, RiLockPasswordLine} from "react-icons/ri";
import {HiClipboard} from "react-icons/hi";
import {ErrorMessage, Field, Form, Formik} from "formik";
import server from "../apis/server";

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    repPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Repeat password is required'),
    qualification: Yup.string().required('Qualification is required'),
    termsOfService: Yup.boolean().oneOf([true], 'Must accept terms of service')
});


export default function StudentReg() {

    
    const [pdf, setPdf] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);//
    const navigate = useNavigate();

    
    function handleReg(values) {
        console.log(values);

        server
            .post(
                "/teacher/register",
                {
                    name: values.firstName,
                    email: values.email,
                    password: values.password,
                    // qualification: values.qualification,
                    qualification: pdfUrl,
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
        qualification: '',
        termsOfService: false
    };
    
   




    const handleUpload = (event) => {
        const selectedFile = event.target.files[0]; // Get the first selected file
        setPdf(selectedFile); // Set the PDF file
       
      
        // You can perform any additional logic or validations here
      
        // Example: Accessing the file name and size
        console.log("Selected PDF File:", selectedFile.name);
        console.log("File Size:", selectedFile.size);
      };

     
          
            const uploadPdf =  () => {
                setSuccess(null)
                setError(null)
                const currentDate = new Date();
                const timestamp = currentDate.getTime(); //today date and time save file generate unique file name using pdf name and timestamp
                const uniqueFileName = `${pdf.name}_${timestamp}.pdf`;
                const storageRef = ref(storage, `qualifications/${uniqueFileName}`);
                const uploadTask = uploadBytesResumable(storageRef, pdf);
          
            return new Promise((resolve, reject) => {
              uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                },
                (error) => {
                    reject(error);
                    setError('upload fail')

                  },
                  async () => {
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(url);
                    setSuccess('Sucessfully uploaded')
                    setPdfUrl(url)
                    console.log(url)
                  }
                );
              });
            };
           
     


   

    return (
        <>
            <div className="home-full-screen">
                <div className="home-navBar">
                    <NavBar/>
                </div>
                <div className="signin-body">
                    <div className="signin-body-form">
                        <h1 className="signin-title">Sign Up <br/><span className="signin-title-start-teach">and Start Teaching</span>
                        </h1>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleReg}>
                            {(formik) => (
                                <Form>
                                    <div>
                                        <ul>
                                            <li className="signin-body-form-input-list">
                                                <FaUserAlt size={20}/>
                                                <Field type="text" className="signin-username" placeholder="Full Name"
                                                       name="firstName"
                                                       value={formik.values.firstName}
                                                       onChange={formik.handleChange} 
                                                       
                                                       required/>
                                                <ErrorMessage name="firstName" component="div"
                                                              className="error-message"/>
                                            </li>
                                            <li className="signin-body-form-input-list">
                                                <GrMail size={20}/>
                                                <Field type="email" className="signin-username" placeholder="Your email"
                                                       name="email" 
                                                       value={formik.values.email}
                                                       onChange={formik.handleChange}
                                                       required/>
                                                <ErrorMessage name="email" component="div" className="error-message"/>
                                            </li>
                                            <li className="signin-body-form-input-list">
                                                <RiLockPasswordFill size={20}/>
                                                <Field type="password" className="signin-username"
                                                       placeholder="Password"
                                                       name="password" 
                                                       value={formik.values.password}
                                                       onChange={formik.handleChange}
                                                       required/>
                                                <ErrorMessage name="password" component="div"
                                                              className="error-message"/>
                                            </li>
                                            <li className="signin-body-form-input-list">
                                                <RiLockPasswordLine size={20}/>
                                                <Field type="password" className="signin-username"
                                                       placeholder="Repeat Password" name="repPassword" 
                                                       value={formik.values.repPassword}
                                                       onChange={formik.handleChange}
                                                       required/>
                                                <ErrorMessage name="repPassword" component="div"
                                                              className="error-message"/>
                                            </li>
                                            <li className="signin-body-form-input-list">
                                                <HiClipboard size={20}/>
                                                <input type="file" accept="application/pdf" onChange={handleUpload} className="add-course-form-input" />
                                                
                                            </li>
                                            <li><button type="button"
                                                onClick={uploadPdf}
                                              disabled={pdf === null}
                                             >Upload Pdf
                                              </button></li>
                                              <li><p style={{color:"green"}}>{success} </p></li>
                                              <li><p style={{color:"red"}}>{error} </p></li>

                                            <li className="signin-body-form-input-list-checkbox">
                                                <label>
                                                    <Field type="checkbox" name="termsOfService" required/>
                                                    I agree all the terms of Service
                                                </label>
                                                <ErrorMessage name="termsOfService" component="div"
                                                              className="error-message"/>
                                            </li>
                                            <li>
                                                <button type ="submit" onClick={formik.handleSubmit}
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