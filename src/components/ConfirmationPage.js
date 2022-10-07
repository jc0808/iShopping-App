import React from "react";
import { NavLink } from "react-router-dom";


function ComfirmationPage({ currentUser }) {

    const backStyle = {
        "color": "blue",
        "marginLeft": "-700px"
    };

    const continueStyle = {
        "color": "blue",
        "textDecoration": "none"
    };


    return (
        <div id="box">
            <div><NavLink to="/cart" style={backStyle}>Back</NavLink></div>

            <h2>Thank you for placing your order, {currentUser.name}</h2>

            <h4>Order will be delivered to the address bellow: </h4>
            <label>{currentUser.address}</label>
            <br></br>
            <div id="b">
                <NavLink to={"/home"} style={continueStyle}>Continue Shooping</NavLink>
            </div>
        </div >
    )
}

export default ComfirmationPage;