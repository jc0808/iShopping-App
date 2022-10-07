import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function AccountInfo({ currentUser, isAdmin }) {

    const backStyle = {
        "color": "blue",
        "marginLeft": "-320px"
    };

    const [confirm, setConfirm] = useState(false);


    function handleConfirm() {
        setConfirm(() => !confirm);
    }

    useEffect(() => {

        if (currentUser !== null) {
            if (confirm) {
                fetch(`http://localhost:4000/users/${currentUser.id}`, {
                    method: "DELETE",
                    headers: {
                        "content-type": "application/json"
                    }
                })

                window.location.reload()
            }
        }

    }, [confirm])

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
                <button style={{ background: "red", color: "white" }} >Confirm</button>
                <button style={{ background: "gray", color: "white", marginLeft: '50px' }} onClick={() => setConfirm(false)}>Cancel</button>
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