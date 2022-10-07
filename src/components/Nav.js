import React from "react";
import { NavLink } from "react-router-dom"


function Nav({ currentUser, cartNum, isAdmin }) {

    const linkStyles = {
        display: "inline-block",
        width: "50px",
        padding: "12px",
        margin: "0 6px 6px",
        textDecoration: "none",
        color: "yellow",
    };

    const admin = isAdmin ? linkStyles : { display: "none" };

    const styleCart = { color: "yellow", padding: "12px", display: "inline-block", textDecoration: "none", }

    const styleLogOut = { color: "yellow", padding: "12px", display: "inline-block", textDecoration: "none", marginLeft: "20px", "cursor": "pointer" }

    return (
        <div className="navigation">
            <h1>iShooping</h1>
            <h2>Welcome, {currentUser.name}</h2>
            <div>
                <NavLink to="/home" style={linkStyles} >Home</NavLink>
                <NavLink to="/addform" style={admin} >Add</NavLink>
                <NavLink to="/users" style={admin}>Users</NavLink>
                <NavLink to="/cart" style={styleCart} >Cart🛒({cartNum})</NavLink>
                <NavLink to="/accountinfo" style={linkStyles} >Account</NavLink>
                <div style={styleLogOut} onClick={() => window.location.reload()}>Logout</div>


            </div>

        </div>
    )
}

export default Nav;