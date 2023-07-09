import React, {useEffect, useState} from 'react';
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import {storage} from '../config/firebaseConfig';
import {Field, Form, Formik} from 'formik';
import server from "../apis/server";
import * as Yup from 'yup';

const UploadVideos = ({setAddLessonForm}) => {
    const [videos, setVideos] = useState([]);
    const [progressBars, setProgressBars] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [urls, setUrls] = useState([]);
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

    useEffect(() => {
        getCourses();
    }, []);

    const handleSubmit = (values) => {
        console.log('selectedCourseId:', values.course);
        console.log('videoUrls:', urls);

        for (let i = 0; i < urls.length; i++) {
            server
                .post(
                    "/teacher/addVideo",
                    {
                        course_id: values.course,
                        video_link: urls[i],
                    },
                    {
                        headers: {token: localStorage.getItem("user")},
                    }
                )
                .then((res) => {
                    console.log("result : ", res.data);
                })
                .catch((err) => {
                    alert(err);
                });
        }
        setAddLessonForm(false);
    }

    const handleUploadAll = async () => {
        setError(null);
        setSuccess(null);
        const uploadedUrls = [];
        const newProgressBars = [...progressBars];

        for (let i = 0; i < videos.length; i++) {
            try {
                const url = await uploadVideo(videos[i], i, newProgressBars);
                uploadedUrls.push(url);
                if (uploadedUrls.length === videos.length) {
                    setUrls(uploadedUrls);
                    const newProgressBars = progressBars.map(() => 100);
                    setProgressBars(newProgressBars);
                    setSuccess('All videos have been uploaded successfully!');
                }
            } catch (error) {
                setError(error);
            }
        }
    };

    const uploadVideo = async (video, index, progressBars) => {
        const storageRef = ref(storage, `videos/${video.name}`);
        const uploadTask = uploadBytesResumable(storageRef, video);

        return new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
                (snapshot) => {
                    progressBars[index] = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgressBars([...progressBars]);
                },
                (error) => {
                    reject(error);
                },
                async () => {
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(url);
                }
            );
        });
    };

    const validationSchema = Yup.object().shape({});

    return (
        <div>
            <Formik initialValues={{course: ""}} onSubmit={handleSubmit} validationSchema={validationSchema}>
                {({values, errors, touched}) => (
                    <Form className="add-course-form-content">
                        <Field as="select" name="course"
                               className={errors.course && touched.course ? ' is-invalid add-course-form-input' : 'add-course-form-input'}>
                            <option value="">Select Course</option>
                            {coursesList.map((course) => (
                                <option key={course.course_id} value={course.course_id}>
                                    {course.course_title}
                                </option>
                            ))}
                        </Field>
                        {errors.course && touched.course && <div className="invalid-feedback">{errors.course}</div>}
                        <br/>
                        <input type="file" accept="video/*" multiple onChange={handleUpload}
                               className="add-course-form-input"/>

                        {progressBars.map((progress, index) => (
                            <div key={index} className="progress-bar-container">
                                <progress value={progress} max="100" className="progress-bar"/>
                                <span className="progress-bar-present">{progress}%</span>
                                <br/>
                            </div>
                        ))}
                        {error && <div style={{color: 'red'}}>{error.message}</div>}
                        {success && <div style={{color: 'green'}}>{success}</div>}

                        {urls.length > 0 && urls.map((url, index) => (
                            <div key={index}>
                                <a href={url}>{url}</a>
                            </div>
                        ))}
                        <br/>
                        <div className="submit-cancel-button-container">
                            <button type="button"
                                    onClick={handleUploadAll}
                                    disabled={videos.length === 0 || progressBars.some(progress => progress > 0)}
                            >Upload all videos
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary btn-block"
                                disabled={values.course === "" || urls.length === 0}
                            >Submit
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary btn-block"
                                onClick={() => setAddLessonForm(false)}
                            >Cancel
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default UploadVideos;