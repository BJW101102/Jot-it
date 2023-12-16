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
            const resp = await axios.post(url, { username: username, password: password }, { withCredentials: true });
            if (resp.status === 200) {

                swal("Awesome!", "Great to have you", "success").then(() => {
                    window.location.href = 'http://localhost:3000/dashboard';
                });
            }
        }
        catch (error) {
            console.log(error.response);
        }

    }

    const handleBackToLogin = async () => {
        window.location.href = 'http://localhost:3000/dashboard';

    }

    return (
        <div className="Login" style={{ textAlign: "center" }}>
            <h1>SignUp</h1>
            <form style={{ width: "25vh", margin: "auto" }}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="username"
                        className="form-control"
                        placeholder="Enter username"
                        value={username}
                        onChange={handleUsername}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={handlePassword}
                    />
                </div>
                <p>Username: {username}</p>
                <br></br>
                <p>Password: {password}</p>

                <br></br>
                <button id="login-button" type="submit" onClick={handleSubmit} style={{ marginRight: "5vh" }} className="btn btn-outline-success">Submit</button>
                <button id="login-button" type="button" onClick={handleBackToLogin} style={{ marginRight: "5vh" }} className="btn btn-outline-success">Back to Login</button>                
            </form>
        </div>
    );
}

export default SignUp;