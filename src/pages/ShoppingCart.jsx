import React from "react";
import "../styles/HomePage.css";
import "../styles/ComponentStyles.css";
import ShoppingCartCard from "../components/ShoppingCartCard";
import NavBar from "../components/NavBar";

export default function ShoppingCart()
{
    return(
        <>
        <div className="home-full-screen">
            <div className="home-navBar">
                <NavBar/>
            </div>
            <div className="course-body-content">
            <h2>Shopping Cart</h2>
            <p>Course In Cart</p>
            <hr/>
                <ShoppingCartCard/>
            </div>
        </div>
        
        </>
    );
}