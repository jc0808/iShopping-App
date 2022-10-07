import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";

function AccountInfo({ currentUser, isAdmin, setOnLog }) {


    const navigate = useHistory();
    const backStyle = {
        "color": "blue",
        "marginLeft": "-320px"
    };

    const [confirm, setConfirm] = useState(false);
    const [reConfirm, setReConfirm] = useState(false);


    function handleConfirm() {
        
        setConfirm(() => !confirm);
    }

    function handleReConfirm() {
        
        setReConfirm(() => !reConfirm);
        console.log("reconfirmed")
    }

    useEffect(() => {

        if (currentUser !== null) {
            if (reConfirm) {
                fetch(`https://ishopping-app-database-server.herokuapp.com/users/${currentUser.id}`, {
                    method: "DELETE",
                    headers: {
                        "content-type": "application/json"
                    }
                })
                .then(() => {
                    navigate.push("/");
                    window.location.reload()
                })
            }
        }

    }, [reConfirm])

    const admin = !isAdmin ? { background: "red", color: "white" } : { display: "none" };


    const validate = !confirm ?
        <>
            <h1>Account Information</h1>
            <div>
                <br></br>
                <label>Name: {currentUser.name} {currentUser.lastname} </label>
            </div>
            <div>
                <label>Address: {currentUser.address}</label>
            </div>
            <div>
                <label>Username: {currentUser.username}</label>
            </div>
            <div>
                <br></br>
                <button style={admin} onClick={handleConfirm}>Delete Account</button>
            </div>
        </>

        :
        <>
            <label style={{ color: "red" }}>Are you sure you want to delete your account?</label>

            <div>
                <button style={{ background: "red", color: "white" }} onClick={handleReConfirm}>Confirm</button>
                <button style={{ background: "gray", color: "white", marginLeft: '50px' }} onClick={() => !confirm}>Cancel</button>
            </div>

        </>


    return (
        <div id="formBox">
            <div><NavLink to="/home" style={backStyle}>Back</NavLink></div>
            {validate}
        </div>
    )
}

export default AccountInfo;