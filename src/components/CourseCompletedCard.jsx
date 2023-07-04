import React, {useEffect, useState} from "react";
import '../styles/ComponentStyles.css';
import server from "../apis/server";

export default function CourseCompletedCard() {

    const [completeCourseList, setCompleteCourseList] = useState([]);

    useEffect(() => {
        getStudentCourse();
    }, []);

    function getStudentCourse() {
        server.get("/student//getCourse_student/complete",
            {
                headers: {"token": localStorage.getItem('user')}
            }
        )
            .then((res) => {
                // alert(res.data);
                console.log("result : ", res.data);
                setCompleteCourseList(res.data);
            })
            .catch((err) => {
                alert(err)
            })
    }

    return (
        <>
            <div className="course-info-card">
                <center><h3>Courses Completed</h3></center>
                {completeCourseList && completeCourseList.map((data, id) => (
                    <div className="course-info-card-content" key={id}>
                        <h4>{data.course.course_title}</h4>
                    </div>
                ))}
     </div>
     </>
    );
}