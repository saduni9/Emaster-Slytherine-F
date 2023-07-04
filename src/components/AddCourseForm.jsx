import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import "../styles/ComponentStyles.css";
import server from "../apis/server";
import {useNavigate} from "react-router-dom";

export default function AddCourseForm() {
    const navigate = useNavigate();
    const handleSubmit = (values) => {
        console.log(values);
        alert(JSON.stringify(values, null, 2));
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
                navigate("/teacher_dash");
            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
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
                        <ErrorMessage name="image"className="add-course-form-input-error-msg"/>
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
                        <ErrorMessage name="description"className="add-course-form-input-error-msg"/>
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
                        <button
                            type="submit"
                            className="add-course-form-button add-course-form-submit-button"
                        >
                            Submit
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
