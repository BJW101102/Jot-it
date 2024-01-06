import React from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5500/api/',
    withCredentials: true,
});

const NavBar = ({ username, darkMode, noteList, handleDarkMode }) => {

    const handleLogout = async () => {
        try {
            const resp = await api.post('logout', { withCredentials: true });
            if (resp.status === 200) {
                window.location.href = 'http://localhost:3000';
            }
        }
        catch (error) {
            console.log(error.response.data);
        }
    }
    return (
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
                <button onClick={handleLogout} style={{ color: 'white', height: '10vh'}}>Sign Out</button>
            </div>
        </nav>
    );
};

export default NavBar;