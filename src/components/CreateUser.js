import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";


function CreateUser({ setCurrentUser, setOnLog }) {

    const [name, setName] = useState(null);
    const [lastName, setlastName] = useState(null);
    const [Address, setAddress] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmP, setConfirmP] = useState(null);

    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useHistory();



    function handleName(e) {
        setName(e.target.value);
    }

    function handleLastName(e) {
        setlastName(e.target.value);
    }

    function handleAddress(e) {
        setAddress(e.target.value);
    }

    function handleUsername(e) {
        setUsername(e.target.value)
    }

    function handlePassword(e) {
        setPassword(e.target.value)
    }

    function handleConfirmP(e) {
        setConfirmP(e.target.value)
    }

    function handleForm(e) {
        e.preventDefault();

        if (password !== confirmP) {
            setErrorMessage("Passwords do not match, try again.")
        } else {
            const newUser = {
                "id": 0,
                "name": name,
                "Address": Address,
                "lastname": lastName,
                "username": username,
                "password": password,
                "cart": [],
                "admin": false,
                "login": false
            };

            fetch('https://ishopping-app-server.herokuapp.com//users', {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(newUser)
            })
                .then(r => r.json())
                .then(data => {
                    console.log(data)
                    setCurrentUser(data);
                    setOnLog(true);
                    navigate.push('/home')
                })

        }

    }

    const backStyle = {
        "color": "blue",
        "marginLeft": "-320px"
    };



    return (
        <div id='formBox'>
            <div >
                <NavLink to="/" style={backStyle}>Back</NavLink>
                <h1>Create an Account</h1>
                <p style={{ color: "yellow" }}>{errorMessage}</p>
                <form onSubmit={handleForm}>
                    <div className='text_field'>
                        <input type='text' onChange={handleName} required></input>
                        <span></span>
                        <label>Name</label>
                    </div>
                    <div className='text_field'>
                        <input type='text' onChange={handleLastName} required></input>
                        <span></span>
                        <label>Last name</label>
                    </div>
                    <div className='text_field'>
                        <input type='text' onChange={handleAddress} required></input>
                        <span></span>
                        <label>Address</label>
                    </div>
                    <div className='text_field'>
                        <input type='text' onChange={handleUsername} required></input>
                        <span></span>
                        <label>Username</label>
                    </div>
                    <div className='text_field'>
                        <input type='password' onChange={handlePassword} required></input>
                        <span></span>
                        <label>Password</label>
                    </div>
                    <div className='text_field'>
                        <input type='password' onChange={handleConfirmP} required></input>
                        <span></span>
                        <label>Confirm Password</label>
                    </div>

                    <button type='submit' >Create Account</button>

                </form>
            </div>
        </div>
    )
}

export default CreateUser;
