//@author: Brandon Walton
//LoginPage

import React, { useState } from "react";
import '../CSS/Login.css';
import axios from 'axios';
import swal from 'sweetalert';


function Login() {

    var message = null;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const url = 'http://localhost:5500/api/login'
    const handleUsername = async (event) => {
        setUsername(event.target.value);
    };
    const handlePassword = async (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const resp = await axios.post(url, { username: username, password: password }, { withCredentials: true });
            if (resp.status === 200) {
                window.location.href = 'http://localhost:3000/dashboard';
            }
        }
        catch (error) {
            const status = error.response.status;
            const message = error.response.data.message;

            if (status === 401) {
                swal("Oops!", "Seems like we couldn't fetch the info, try again", "error");
                const inputs = document.getElementsByTagName("input");
                const label = document.getElementsByTagName("label");
                for (let i = 0; i < label.length; i++) {
                    label[i].style.color = "red";
                }

                label[0].textContent = "Username: Invalid Username";
                label[1].textContent = "Password: Invalid Password";


                for (let i = 0; i < inputs.length; i++) {
                    setUsername(""); // Reset username state
                    setPassword(""); // Reset password state
                }
            }
            else {
                alert("Network Error");
            }
            console.log("Error Status: ", status);
            console.log("Error Message: ", message);
        }
    }

    const handleSignUp = async () =>{
        window.location.href = 'http://localhost:3000/signup';
    }

    return (
        <div className="Login" style={{ textAlign: "center" }}>
            <h1>Login</h1>
            <form id="form-handler" style={{ width: "25vh", margin: "auto" }}>
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
                {/* <p>Username: {username}</p>
                <br></br>
                <p>Password: {password}</p> */}

                <br></br>
                <button id="login-button" type="submit" onClick={handleSubmit}   style={{ marginRight: "5vh" }} className="btn btn-outline-success">Login</button>
                <button id="login-button" type="button" onClick={handleSignUp}   style={{ marginRight: "5vh" }} className="btn btn-outline-success">Signup</button>
                {message}
            </form>
        </div>
    );
}

export default Login;