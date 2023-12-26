import React from 'react';
const NavBar = ({ username, darkMode, noteList, handleDarkMode }) => {
    return ( /*#6D5541 5D432C*/
            <nav style={{ backgroundColor: darkMode ? "#2C2E2C" : "#7D6856", display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
                <div style={{ color: "white", display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginLeft: '2vh' }}>User: {username}</span>
                    <span style={{ marginLeft: '2vh', marginRight: '2vh' }}>Total Notes: {noteList.length}</span>
                    <span style={{ marginRight: '2vh' }}>Favorited Notes: {noteList.filter(note => note.isFavorite).length}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label className="switch" style={{ marginRight: '1rem' }}>
                        <input onChange={handleDarkMode} type="checkbox" checked={darkMode} />
                        <span className="slider round"></span>
                    </label>
                    <button style={{ color: 'white', height: '10vh' }}>Sign Out</button>
                </div>
            </nav>
    );
};

export default NavBar;