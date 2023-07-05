import React, {useEffect, useState} from "react";
import '../styles/ComponentStyles.css';
import server from "../apis/server";
import {ImBin} from "react-icons/im";

export default function ShoppingCartCard() {
    const [course, setCourse] = useState([]);

    const getCart = () => {
        server.get("/student/getCart",
            {
                headers: { "token": localStorage.getItem('user') }
            }
        )
            .then((res) => {
                console.log("result cart: ", res.data);
                if(res.data && res.data.length > 0){
                    setCourse(res.data);
                }

            })
            // Catch errors if any
            .catch((err) => {
                console.log(err);
            })
    };

    const purchaseCourse = (id) => {
        server.get(`/student/purchaseCourse/${id}`,
            {
                headers: { "token": localStorage.getItem('user') }
            }
        )
            .then((res) => {
                alert(res.data)
                console.log("result : ", res.data);
                getCart();
            })
            .catch((err) => {
                alert(err)
            })
    }

    useEffect(() => {
        getCart();
    }, []);

    const removeFromCart = (id) => {
        server.delete("/student/removeCart/" + id,
            {
                headers: { "token": localStorage.getItem('user') }
            }
        )
            .then((res) => {
                alert(res.data)
                console.log("result : ", res.data);
                getCart();
            })
            // Catch errors if any
            .catch((err) => {
                alert(err)
            })
    };

    return (
        <>
            {Array.isArray(course) && course.map((data) => (
                <div className="shopping-cart-card-container" key={data.cart_id}>
                    <div className="shopping-cart-card-course-img-content">
                        <img src={data.course.course_imgUrl} className="shopping-cart-card-course-img"  alt="course image"/>
                    </div>
                    <div className="shopping-cart-card-course-detail">
                        <p>{data.course.course_title}</p>
                        <p>{data.course.teacher_name}</p>
                        <p>{data.course.course_rate}</p>
                    </div>
                    <div className="shopping-cart-card-course-price">
                        {data.course.courseFee}
                    </div>
                    <div className="shopping-cart-card-course-total-price">
                        {data.course.totalFee}
                    </div>
                    <div className="shopping-cart-card-checkout">
                        <div className="shopping-cart-card-course-total-price"
                             onClick={() => removeFromCart(data.cart_id)}>
                            <ImBin/>
                        </div>
                        <button className="shopping-cart-card-checkout-btn"
                                onClick={() => purchaseCourse(data.course.course_id)}>Checkout
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
}