import React, {useEffect, useState} from "react";
import '../styles/ComponentStyles.css';
import server from "../apis/server";
import {Link} from "react-router-dom";

export default function CourseOngoingCard()
{

    const[ongoingCourseList, setOngoingCourseList] = useState([]);


    useEffect(() => {
        getStudentCourse();
    }, []);

    function getStudentCourse() {
        server.get("/student/getCourse_student/ongoing",
            {
                headers: {"token": localStorage.getItem('user')}
            }
        )
            .then((res) => {
                console.log("result : ", res.data);
                setOngoingCourseList(res.data);
            })
            .catch((err) => {
                alert(err)
            })
    }
    
    return(
     <>
     <div className="course-info-card">
        <center><h3>Courses Ongoing</h3></center> 
        {ongoingCourseList.length > 0 && ongoingCourseList.map((data,id)=>(
            <div className="course-info-card-content" style={{backgroundColor: '#7AAFD0'}} key={id}>
                <Link to={`/single_course/${data.course.course_id}`}>
                    <h4>{data.course.course_title}</h4>
                </Link>
            </div>
        ))}
     </div>
     </>
    );
}