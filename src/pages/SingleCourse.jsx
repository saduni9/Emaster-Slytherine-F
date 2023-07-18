import React, {useEffect, useState} from "react";
import "../styles/CourseStyles.css";
import NavBar from "../components/NavBar";
import {VscFeedback} from "react-icons/vsc";
import server from "../apis/server";
import {Link, useParams} from "react-router-dom";
import ReactStars from "react-rating-stars-component/dist/react-stars";
import {AiOutlineLike, AiTwotoneLike} from "react-icons/ai";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";

export default function SingleCourse() {
    const [rating, setRating] = useState(0);
    const [like, setLike] = useState(false);

    const [course, setCourse] = useState({
        course: [
            {
                course_title: "",
            },
        ],
        videos: [
            {
                video_link: "",
            },
        ],
    });
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
    const {id} = useParams();

    const ratingChanged = (newRating) => {
        console.log(newRating);

        server.put('/student/rateCourse',
            {
                course_id: id,
                rate: newRating
            },
            {
                headers: {
                    token: localStorage.getItem('user')
                }
            },)
            .then(
                (res) => {
                    alert(res.data);
                    console.log(res.data);
                    setRating(res.data);
                }
            ).catch(
            (err) => {
                alert(err);
            }
        )
    };

    const getCourseById = () => {
        server
            .get(`/student/getCourse_byID/${id}`, {
                headers: {token: localStorage.getItem("user")},
            })
            .then((res) => {
                console.log("result : ", res.data);
                setCourse(res.data);
            })
            // Catch errors if any
            .catch((err) => {
                alert(err);
            });
    };

    useEffect(() => {
        getCourseById();
    }, []);

    const handleVideoSelect = (index) => {
        setSelectedVideoIndex(index);
    };

    const likeFunction = () => {
        if (!like) {
            server.put("/student/likeCourse/" + id,
                {},
                {
                    headers: {"token": localStorage.getItem('user')}
                }
            ).then(
                (res) => {
                    console.log(res.data);
                    setLike(true);
                }
            ).catch(
                (err) => {
                    alert(err.message);
                }
            )
        }
        // else {
        //     server.put("/student/unlikeCourse/" + id,
        //         {},
        //         {
        //             headers: {"token": localStorage.getItem('user')}
        //         }
        //     ).then(
        //         (res) => {
        //             console.log(res.data);
        //             setLike(false);
        //         }
        //     ).catch(
        //         (err) => {
        //             alert(err.message);
        //         }
        //     )
        // }
    }

    const initialValues = {
        comment: '',
    };

    const validationSchema = Yup.object({
        comment: Yup.string().required('Feedback is required')
    });

    const onSubmit = (values) => {
        console.log(values);

        server.post('/student/commentCourse', {
                course_id: id,
                comment: values.comment

            },
            {
                headers: {"token": localStorage.getItem('user')}
            }).then((res) => {
            alert(res.data);
        }).catch((err) => {
            alert(err.message);
        })
    };

    return (
        <>
            <div className="home-full-screen">
                <NavBar/>
                <div className="course-title-container">
                    <div className="course-title">
                        {course && course.course[0].course_title}
                    </div>
                    {/*<div>*/}
                    {/*    {parseInt(course.course[0].course_rate)}*/}
                    {/*</div>*/}
                    <div>
                        {
                            course.course.length > 0 && course.course[0].course_rate >= 0 && (
                                <ReactStars
                                    value={course.course[0].course_rate}
                                    count={5}
                                    onChange={ratingChanged}
                                    size={24}
                                    activeColor="#ffd700"
                                />
                            )
                        }
                    </div>
                </div>
                <div>
                    {course.videos.length > 0 && (
                        <div className="single-course-detail">
                            <div className="video-section">
                                <video
                                    controls
                                    className="video-player"
                                    src={course.videos[selectedVideoIndex].video_link}
                                >
                                    Your browser does not support the video tag.
                                </video>
                                <div className="like">
                                    {
                                        like ?
                                            <AiTwotoneLike onClick={likeFunction}/>
                                            : <AiOutlineLike onClick={likeFunction}/>
                                    }
                                    <div>{
                                        course && course.course[0].likes
                                    }</div>
                                </div>
                            </div>
                            <div className="playlist">
                                <div className="playlist-title">Playlist</div>
                                {course.videos.map((video, index) => (
                                    <div
                                        key={index}
                                        className={selectedVideoIndex === index ? "selected" : "not-selected"}
                                        onClick={() => handleVideoSelect(index)}
                                    >
                                        {`Video ${index + 1}`}
                                    </div>
                                ))}
                            </div>

                            <div className="single-course-feedback-content">
                                <div className="single-course-feeedback">
                                    <h4>Feedback</h4>
                                    <VscFeedback size={60}/>
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={validationSchema}
                                        onSubmit={onSubmit}>
                                        {(formik) => (
                                            <Form>
                                                <div>
                                                    <Field type="text"
                                                           className="feedback-input-box"
                                                           placeholder="Feedback"
                                                           name="comment"
                                                           value={formik.values.comment}
                                                           onChange={formik.handleChange}
                                                           required/>
                                                    <ErrorMessage name="comment" component="div"
                                                                  className="error-msg"/>
                                                    <button type="submit" className="feedback-submit-button">Submit
                                                        Feedback
                                                    </button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                    <div className="go-to-forum">
                                        <Link to="/forum" type="button"> Go to Forum </Link>
                                    </div>
                                </div>
                                {/*<div className="single-course-question-forum">*/}
                                {/*    <h4>Ask Questions From Your Teacher</h4>*/}
                                {/*    <p>Google Sheet</p>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    )}
                </div>
                <div className="single-course-rate"></div>
            </div>
        </>
    );
}
