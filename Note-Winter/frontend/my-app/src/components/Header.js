//@author: Brandon Walton
// Header.js
import React from 'react';
import thumbtack from '../images/thumbtack.png';
import '../CSS/Header.css'; // Import a separate CSS file



const Header = ({ username, darkMode }) => {
    return (
        <div>
            <h1 className="header-container">
                {/* {darkMode ? (<img src={thumbtack} className="logo" alt="Thumbtack Logo" />) : (<div></div>)} */}
                <span>Jot-it!</span>
            </h1>
            {username && <p>Welcome, {username}!</p>}
            <div>
                {/* <button onClick={darkMode} style={{ marginBottom: "4vh" }}>Dark Mode Tester</button> */}
            </div>
        </div>
    );
};

export default Header;