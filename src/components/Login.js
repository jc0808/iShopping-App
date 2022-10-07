import React, { useState } from 'react';
import '../css/formBox.css';
import { useHistory } from "react-router-dom"


function Login({ users, returnUserId }) {

    const [username, setUsername] = useState(null);

    const [password, setPassword] = useState(null);

    const [message, setMessage] = useState(null);

    const navigate = useHistory();

    const [style, setStyle] = useState(null);

    function handleName(e) {
        setUsername(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    // function returnUser(id) {
    //     returnUserId(id)
    // }


    function validateUser(e) {
        e.preventDefault()

        const user = users.find(user => { return username === user.username && password === user.password })

        if (user !== undefined) {
            setStyle({ color: "blue" })
            setMessage('Loggin in...');
            setTimeout(() => {
                returnUserId(user.id);
                setMessage(null);
                navigate.push("/home");
            }, 1000);
        } else {
            setStyle({ color: "yellow" })
            setMessage('Invalid information. Please try again.');
        }
    }


    return (<div>
        <div id='formBox'>
            <h3>Welcome to iShopping</h3>
            <h1>Login</h1>
            <p style={style}>{message}</p>
            <form onSubmit={validateUser}>
                <div className='text_field'>
                    <input type='text' name="username" onChange={handleName} required></input>
                    <span></span>
                    <label>Username</label>
                </div>
                <div className='text_field'>
                    <input type='password' name="password" onChange={handlePassword} required></input>
                    <span></span>
                    <label>Password</label>
                </div>
                <div className='forgot-password' onClick={() => navigate.push('/forgotpassword')}>Forgot Password?</div>
                <button type='submit'>Login</button>
                <div className='sign-up' onClick={() => navigate.push('/createuser')}>Sign Up</div>
            </form>
        </div>
    </div>)
}

export default Login;