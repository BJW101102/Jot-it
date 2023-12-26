import React from 'react';
import placeholder from '../images/placeholder.jpg';
import '../CSS/SideView.css'; // Import a separate CSS file

const SideView = ({ darkMode, noteList }) => {

    const tableStyle = {
        backgroundColor: darkMode ? '#121212' : '#E1DEBA',
        width: '100%',
    };

    const oddRowStyle = {
        backgroundColor: darkMode ? '#2C2E2C' : '#7D6856',
    };

    return (
        <div>
            <div className='image-container'>
                <img className='profile-picture' src={placeholder} alt="Download" style={{ border: darkMode ? "10px solid #2C2E2C" : "10px solid #7D6856" }} />
            </div>
            <br></br>
            <table className="custom-table" style={{ ...tableStyle, color: darkMode ? 'white' : 'black' }}>
                <thead>
                    <tr>
                        <th style={{ backgroundColor: darkMode ? "#121212" : "#E1DEBA", color: darkMode ? "white" : "black" }} >Note-Title</th>
                    </tr>
                </thead>
                <div className='table-container'>
                    <tbody>
                        {noteList.length === 0 ? (
                            <tr>
                                <td ><h1>No Notes, add some</h1></td>
                            </tr>) : noteList.map((note, i) => (
                                <tr key={i} style={i % 2 === 0 ? oddRowStyle : null}>
                                    <td>{note.header}</td>
                                </tr>
                            ))}
                    </tbody>
                    <div className="table-scrollbar">
                        <div className="table-scrollbar-thumb"></div>
                    </div>
                </div >

            </table>
        </div>
    );
};

export default SideView;
