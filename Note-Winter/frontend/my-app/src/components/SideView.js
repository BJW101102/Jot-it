import React from 'react';
import placeholder from '../images/placeholder.jpg';

const SideView = ({darkMode}) => {
    return (
        <div>
        <img src={placeholder} alt="Download" style={{marginTop: '5vh', marginLeft: '4vh', width: '40vh', height: '40vh', border: darkMode ? "10px solid #2C2E2C" : "10px solid #5D432C" }} />
        <div className="overflow-auto">...</div>

        </div>
    );
};

export default SideView;