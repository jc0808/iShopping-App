import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";


function ForgotPassword() {

    const backStyle = {
        "color": "blue",
        "marginLeft": "-320px"
    };

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [cPassword, setCPassword] = useState(null);
    const [message, setMessage] = useState(null);
    const [getUsers, setUsers] = useState([]);
    const [isFound, setIsFound] = useState(false);
    const [id, setId] = useState(null);

    const navigate = useHistory();

    useEffect(() => {
        fetch('https://ishopping-app-server.herokuapp.com/users')
            .then(r => r.json())
            .then(data => setUsers(data))
    }, [])


    function handleUsername(e) {
        setUsername(() => e.target.value);
    }

    function handlePassword(e) {
        setPassword(() => e.target.value);
    }

    function handleCPassword(e) {
        setCPassword(() => e.target.value);
    }

    function handleFormU(e) {
        e.preventDefault();

        const findUser = getUsers.find(user => { return user.username === username });

        if (findUser) {
            setIsFound(isFound => !isFound);
            setId(findUser.id);
        } else {
            setMessage("Username not found.");
        }
    }

    function handleFormP(e) {
        e.preventDefault();
        if (password === cPassword) {
            if (id !== 1) {
                fetch(`https://ishopping-app-database-server.herokuapp.com/users/${id}`, {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ "password": password })
                })
                    .then(navigate.push("/"))
            } else {
                setMessage("Cannot change admin Password")
            }
        } else {
            setMessage("Passwords do not match.");
        }
    }
    return (
        <div id='formBox'>
            <div >
                <NavLink to="/" style={backStyle}>Back</NavLink>
                <h1>Reset your Password</h1>
                <p style={{ color: "yellow" }}>{message}</p>

                {!isFound ?
                    <form onSubmit={handleFormU}>
                        <div className='text_field'>
                            <input type='text' onChange={handleUsername} required></input>
                            <span></span>
                            <label>Enter Your Username</label>
                        </div>

                        <button type='submit' >Find Account</button>

                    </form> :
                    <form onSubmit={handleFormP}>
                        <div className='text_field'>
                            <input type='text' onChange={handlePassword} required></input>
                            <span></span>
                            <label>Enter New Password</label>
                        </div>
                        <div className='text_field'>
                            <input type='text' onChange={handleCPassword} required></input>
                            <span></span>
                            <label>Confirm New Password</label>
                        </div>


                        <button type='submit'>Change Password</button>

                    </form>
                }
            </div>
        </div>
    )
}

export default ForgotPassword;
