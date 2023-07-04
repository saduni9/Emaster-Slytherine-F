import React, {useEffect, useState} from "react";
import "../styles/NavBar.css";
import {Link} from "react-router-dom";
import {BsFillCartFill} from "react-icons/bs";
import server from "../apis/server";

export default function NavBar() {
    const [cartCount, setCartCount] = useState(0);
    const [, setCourse] = useState([]);

    const getCart = async () => {
        try {
            const response = await server.get("/student/getCart", {
                headers: {token: localStorage.getItem("user")},
            });

            console.log("result cart: ", response.data);

            if (response.data && response.data.length > 0) {
                setCourse(response.data);
                setCartCount(response.data.length);
            }
        } catch (error) {
            console.log(error);
            // handle error
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('role');
    };

    useEffect(() => {
        getCart().then(() => console.log("cart count: ", cartCount));
    }, [cartCount]);

    return (
        <div className="navbar-container">
            <div className="navbar-left-section">
                {
                    localStorage.getItem("role") === "student" ? (
                        <Link to="/course_detail" className="navbar-menu-item" style={{color: 'black'}}>
                            <div className="navbar-logo-section">eMaster</div>
                        </Link>

                    ) : (
                        <Link to="/" className="navbar-menu-item" style={{color: 'black'}}>
                            <div className="navbar-logo-section">eMaster</div>
                        </Link>
                    )
                }
                <div className="navbar-menu-section">
                    {
                        !localStorage.getItem('user') && (
                            <Link to="/teacher_signin" className="navbar-menu-item">Teach With Us</Link>
                        )
                    }
                    <Link to="/about" className="navbar-menu-item">About Us</Link>
                </div>
            </div>
                {localStorage.getItem('user') ? (
                    <div className="navbar-cart-section login">
                        <Link to="/shopping_cart">
                            <li className="navbar-cart-section-item cart">{cartCount} <BsFillCartFill size={22}/></li>
                        </Link>

                        <Link to="/signin" className="navbar-cart-section-item login"
                              onClick={logout}>Logout</Link>
                    </div>
                ) : (
                    <div className="navbar-cart-section">
                        <Link to="/signin" className="navbar-cart-section-item login">Login</Link>
                        <Link to="/student_reg" className="navbar-cart-section-item">
                            <button className="nav-signup">SignUp</button>
                        </Link>
                    </div>
                )}
            </div>
    );
}