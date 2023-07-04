import React, {useEffect, useState} from "react";
import '../styles/ComponentStyles.css';
import server from "../apis/server";

export default function EarningsCard() {

    const [earning, setEarning] = useState();

    useEffect(() => {
        server.get("/teacher/getEarnings",
            {
                headers: {"token": localStorage.getItem('user')}
            })
            .then((res) => {
                console.log(res.data);
                setEarning(res.data.totalEarnings);
            })
            .catch(
                (err) => {
                    alert(err);
                }
            )
    }, []);

    return (
        <>
            <div className="teacher-dash-course-card">
                <center>
                    <h3>Your Total Earnings</h3>
                    <h4>Rs. {earning}</h4>
                </center>
            </div>
        </>
    );
}