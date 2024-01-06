//@author: Brandon Walton
//SignUp

import React, { useState } from "react";
import '../CSS/Login.css';
import axios from 'axios';
import swal from 'sweetalert';


function SignUp() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const url = 'http://localhost:5500/api/register'

    const handleUsername = async (event) => {
        setUsername(event.target.value);
    };

    const handlePassword = async (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Clicked");
        try {
            const resp = await axios.post(url, { username: username, password: password, theme: false }, { withCredentials: true });
            if (resp.status === 200) {

                swal("Awesome!", "Great to have you", "success").then(() => {
                    window.location.href = 'http://localhost:3000/dashboard';
                });
            }
        }
        catch (error) {
            const status = error.response.status
            if (status === 409) {
                swal("Oops!", "User name has already been taken", "error");
                setUsername('');
                setPassword('');
            }
            console.log("Error Status: ", error.response.status);
            console.log("Error Message: ", error.response.data.message);
        }

    };

    const handleBackToLogin = async () => {
        window.location.href = 'http://localhost:3000/login';

    };

    return (
        <div className='sticky-note-container'>
            <div className="Login">
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <h1> New to Jot-it?</h1>
                    <span> <p> Sign up below!</p></span>
                </div>                <form id="form-handler">
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="username"
                            className="form-control"
                            placeholder="Enter username"
                            value={username}
                            onChange={handleUsername}
                        />
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={handlePassword}
                        />
                    </div>
                    <button id="login-button" type="submit" onClick={handleSubmit} className="btn btn-outline-success">Submit</button>
                    <button id="login-button" type="button" onClick={handleBackToLogin} className="btn btn-outline-success">Back To Login</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;