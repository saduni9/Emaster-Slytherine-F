import React, {useEffect, useState} from "react";
import '../styles/ComponentStyles.css';
import server from "../apis/server";

export default function MyCoursesCard() {

    const [uploadedCount, setUploadedCount] = useState(450)
    const [totalViewers, setTotalViewers] = useState(11380)

    useEffect(() => {
        server.get("/teacher/getCoursesAmount",
            {
                headers: {"token": localStorage.getItem('user')}
            })
            .then((res) => {
                console.log(res.data);
                setUploadedCount(res.data.amount);
            })
            .catch(
                (err) => {
                    alert(err);
                })
    }, []);


    return (
        <>

            <div className="teacher-dash-course-card">
                <center>
                    <h3>Uploaded Courses</h3>
                    <p>{uploadedCount}</p>
                </center>
            

        </div>

     </>
    );
}