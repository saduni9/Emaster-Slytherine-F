import React, {useEffect, useState} from "react";
import '../styles/ComponentStyles.css';
import {AiFillStar} from "react-icons/ai";
import {BsFillCartFill} from "react-icons/bs";
import server from "../apis/server";
import {Link} from "react-router-dom";

export default function CourseCard() {
    const [tagLogic, setTagLogic] = useState(2);
    const [popularCourse, setPopularCourse] = useState([]);
    const [ongoingCourse, setOngoingCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        getStudentCourse();
        getCourses();
    }, []);

    function getCourses() {
        server.get("/student/getCourses",
            {
                headers: {"token": localStorage.getItem('user')}
            }
        )
            .then((res) => {
                console.log(res.data);
                if (res.data !== "not valid") {
                    setPopularCourse(res.data);
                }
            })
            // Catch errors if any
            .catch((err) => {
                alert(err)
            })
    }

    const addToCart = (id) => {
        server.post("/student/addCart",
            {
                course_id: id,
            },
            {
                headers: {"token": localStorage.getItem('user')}
            }
        )
            .then((res) => {
                alert(res.data)
                console.log("result : ", res.data)
            })
            // Catch errors if any
            .catch((err) => {
                alert(err)
            })
    };

    const [relatedCourses,] = useState([
        {title: 'DevOps'}, {title: 'Cloud Computing'}, {title: 'JAVA'}, {title: 'Database'}, {title: 'DevOps'}, {title: 'Cloud Computing'}, {title: 'Database'}, {title: 'DevOps'}, {title: 'Cloud Computing'},
    ])

    function getStudentCourse() {
        server.get("/student/getCourse_student/ongoing",
            {
                headers: {"token": localStorage.getItem('user')}
            }
        )
            .then((res) => {
                console.log("result : ", res.data);
                setOngoingCourses(res.data);
            })
            .catch((err) => {
                alert(err)
            })
    }

    // const filteredPopularCourse = popularCourse.filter((course) => course.course_title.toLowerCase().startsWith(searchTerm.toLowerCase()));
    // const filteredOngoingCourse = ongoingCourse.filter((course) => course.course.course_title.toLowerCase().startsWith(searchTerm.toLowerCase()));
    const filteredPopularCourse = popularCourse.filter((course) => {
        const title = course.course_title;
        return title && title.toLowerCase().startsWith(searchTerm.toLowerCase());
      })
      const filteredOngoingCourse = ongoingCourse.filter((course) => {
        const title = course.course.course_title;
        return title && title.toLowerCase().startsWith(searchTerm.toLowerCase());
      });

    return (
        <>
            <div className="course-container-tab-bar">
                {
                    tagLogic === 0 ? (
                        <button className="course-container-tab-bar-btn-active"
                                onClick={() => {
                                    setTagLogic(0);
                                    setSearchTerm('');
                                }
                                }>All Courses
                        </button>
                    ) : (
                        <button className="course-container-tab-bar-btn"
                                onClick={() => {
                                    setTagLogic(0);
                                    setSearchTerm('');
                                }}>All Courses
                        </button>
                    )
                }
                {
                    tagLogic === 2 ? (
                        <button className="course-container-tab-bar-btn-active"
                                onClick={() => {
                                    setTagLogic(2);
                                    setSearchTerm('');
                                }}>Ongoing Courses
                        </button>
                    ) : (
                        <button className="course-container-tab-bar-btn"
                                onClick={() => {
                                    setTagLogic(2);
                                    setSearchTerm('');
                                }}>Ongoing Courses
                        </button>
                    )
                }
                {
                    tagLogic === 4 ? (
                        <button className="course-container-tab-bar-btn-active"
                                onClick={() => {
                                    setTagLogic(4);
                                    setSearchTerm('');
                                    window.location.href = '/user_course_info';
                                }}>User Course Information
                        </button>
                    ) : (
                        <button className="course-container-tab-bar-btn"
                                onClick={() => {
                                    setTagLogic(4);
                                    setSearchTerm('');
                                    window.location.href = '/user_course_info';
                                }}>User Course Information
                        </button>
                        
                    )
                }
                <hr/>
            </div>
            <div>
                {tagLogic === 0 && (
                    <div>
                        <input type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}
                               className="search-bar" placeholder="Search your Course"/>
                        <div className="course-card-container">
                            {filteredPopularCourse.length > 0 && filteredPopularCourse.map((data, id) => (
                                <div key={id}>
                                    <div className="course-card-content">
                                        <div className="course-card-img-content">
                                            <img src={data.course_imgUrl} alt="course 1" className="course-card-img"/>
                                        </div>
                                        <div className="course-card-detail-content">
                                            <h3 className="course-card-title">{data.course_title}</h3>
                                            {/* <p className="course-card-teacher">{data.teacher_id}</p> */}
                                            <div className="course-card-rating-content">
                                                {data.course_rate}
                                                <div className="rating-star-set">
                                                    <AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/>
                                                </div>
                                            </div>
                                            <p className="course-card-price">Rs. {data.course_fee}</p>
                                        </div>
                                    </div>
                                    <div className="course-card-description-content">
                                        <h3 className="course-card-title">{data.course_title}</h3>
                                        <p className="course-card-teacher">{data.duration}</p>
                                        <p className="course-card-price">{data.description}</p>
                                        <button className="course-card-add-to-cart-btn"
                                                onClick={() => addToCart(data.course_id)}>ADD TO CART <BsFillCartFill
                                            size={20}/>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {tagLogic === 2 && (
                <div>
                    <input type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}
                           className="search-bar" placeholder="Search your Course"/>
                    <div className="course-card-container">
                        {filteredOngoingCourse.length > 0 && filteredOngoingCourse.map((data, id) => (
                            <Link to={`/single_course/${data.course.course_id}`} key={id}
                                  className="course-card-ongoing">
                                <div className="course-card-content">
                                    <div className="course-card-img-content">
                                        <img src={data.course.course_imgUrl} alt="course 1"
                                             className="course-card-img"/>
                                    </div>
                                    <div className="course-card-detail-content">
                                        <h3 className="course-card-title">{data.course.course_title}</h3>
                                        <div className="course-card-rating-content">
                                            {data.course.course_rate}
                                            <div className="rating-star-set">
                                                <AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/>
                                            </div>
                                        </div>
                                        <p className="course-card-price">Rs. {data.course.course_fee}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            {/* <div><h3>You Can Also Learn</h3>
                <div className="related-course-content">
                    {relatedCourses.map((data, id) => (
                        <div key={id} className="related-course-card">
                            <h3 className="related-course-card-title">
                                {data.title}
                            </h3>
                        </div>))}
                </div>
            </div> */}
        </>
    );
}