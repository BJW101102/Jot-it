//@author: Brandon Walton
// Header.js
import React from 'react';
import '../CSS/Header.css'; // Import a separate CSS file



const Header = ({ username, darkMode }) => {
    return (
        <div>
            <h1 className="header-container">
                <span>Jot-it!</span>
            </h1>
            {username && <p>Welcome, {username}!</p>}
        </div>
    );
};

export default Header;