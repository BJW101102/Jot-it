//@author: Brandon Walton
// Header.js
import React from 'react';

const Header = ({ username, darkMode }) => {
    return (
        <div>
            <h1>Note Taker</h1>
            {username && <p>Welcome, {username}!</p>}
            <div>
                <button onClick={darkMode} style={{ marginBottom: "4vh" }}>Dark Mode Tester</button>
            </div>
        </div>
    );
};

export default Header;