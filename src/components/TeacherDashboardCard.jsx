import React, {useEffect, useState} from "react";

import {BsFillPlusCircleFill} from "react-icons/bs";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import "../styles/ComponentStyles.css";
import server from "../apis/server";
import UploadVideos from "./UploadVideos";

export default function DashboardCard() {
    const [AddCourseForm, setAddForm] = useState(false);
    const [addLessonForm, setAddLessonForm] = useState(false);
    const [coursesList, setCoursesList] = useState([]);

    function getCourses() {
        server.get("/teacher/getCourses",
            {
                headers: {"token": localStorage.getItem('user')}
            }
        )
            .then((res) => {
                console.log(res.data);
                if (res.data !== "not valid") {
                    setCoursesList(res.data);
                }
            })
            // Catch errors if any
            .catch((err) => {
                alert(err)
            })
    }

    const handleSubmit = (values) => {
        console.log(values);
        server
            .post(
                "/teacher/addCourse",
                {
                    course_title: values.courseTitle,
                    course_imgUrl: values.image,
                    description: values.description,
                    course_fee: values.price,
                    duration: values.duration,
                },
                {
                    headers: {token: localStorage.getItem("user")},
                }
            )
            .then((res) => {
                console.log("result : ", res.data);
                setAddForm(false);
            })
            .catch((err) => {
                alert(err);
            });
    };

    useEffect(() => {
        getCourses();
    }, []);

    return (
        <>
            {!AddCourseForm && !addLessonForm &&
                <div className="dashboard-card-container-card">
                    <div className="dashboard-card" onClick={(e) => {
                        setAddForm(true);
                    }}>
                        <div>
                            <BsFillPlusCircleFill size={40} className="dashboard-card-icon"/>
                        </div>
                        <div className="dashboard-card-title">Add Course</div>
                    </div>
                    <div className="dashboard-card" onClick={(e) => {
                        setAddLessonForm(true);
                    }}>
                        <div><BsFillPlusCircleFill size={40} className="dashboard-card-icon"/></div>
                        <div className="dashboard-card-title">Add Lesson</div>
                    </div>
                </div>
            }
            {AddCourseForm && !addLessonForm &&
                <div className="dashboard-card-container">
                    <Formik
                        initialValues={{
                            courseTitle: "",
                            image: "",
                            price: "",
                            description: "",
                            duration: "",
                        }}
                        validationSchema={Yup.object({
                            courseTitle: Yup.string().required("Required"),
                            image: Yup.string().required("Required"),
                            price: Yup.string().required("Required"),
                            duration: Yup.string().required("Required"),
                            description: Yup.string().required("Required"),
                        })}
                        onSubmit={handleSubmit}
                    >
                        {() => (
                            <Form>
                                <div className="add-course-form-content">
                                    <h1>Add Course Form</h1>
                                    <Field
                                        type="text"
                                        name="courseTitle"
                                        className="add-course-form-input"
                                        placeholder="Add course title here"
                                    />
                                    <ErrorMessage name="courseTitle" className="add-course-form-input-error-msg"/>
                                    <br/>
                                    <Field
                                        type="text"
                                        name="image"
                                        className="add-course-form-input"
                                        placeholder="Add your image URL here"
                                    />
                                    <ErrorMessage name="image" className="add-course-form-input-error-msg"/>
                                    <br/>
                                    <Field
                                        type="text"
                                        name="price"
                                        className="add-course-form-input"
                                        placeholder="Add price here"
                                    />
                                    <ErrorMessage name="price" className="add-course-form-input-error-msg"/>
                                    <br/>
                                    <Field
                                        type="text"
                                        name="description"
                                        className="add-course-form-input add-course-form-input-description"
                                        placeholder="Add course description here"
                                    />
                                    <ErrorMessage name="description" className="add-course-form-input-error-msg"/>
                                    <br/>
                                    <Field
                                        type="text"
                                        name="duration"
                                        className="add-course-form-input add-course-form-input-description"
                                        placeholder="Add course duration here"
                                    />
                                    <ErrorMessage name="duration" className="add-course-form-input-error-msg"/>
                                    <br/>
                                    <br/>
                                    <div className="submit-cancel-button-container">
                                        <button
                                            type="submit"
                                            className=""
                                        >
                                            Submit
                                        </button>
                                        <button
                                            type="button"
                                            className="submit-cancel-button"
                                            onClick={() => {
                                                setAddForm(false)
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            }
            {addLessonForm &&
                <div className="dashboard-card-container">
                    <UploadVideos setAddLessonForm={setAddLessonForm}/>
                </div>
            }
        </>
    );
}

