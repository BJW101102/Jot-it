import React, { useState } from "react";
import '../CSS/Login.css';
import axios from 'axios';

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
            const resp = await axios.post(url, { username: username, password: password }, {withCredentials: true});
            if (resp.status === 200){
                window.location.href = 'http://localhost:3000/dashboard';
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="Login" style={{ textAlign: "center" }}>
            <h1>Login</h1>
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
                <button id="login-button" type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
                {message}
            </form>
        </div>
    );
}

export default Login;