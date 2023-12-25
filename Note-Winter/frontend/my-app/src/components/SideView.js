import React from 'react';
import placeholder from '../images/placeholder.jpg';
import '../CSS/SideView.css'; // Import a separate CSS file

const SideView = ({ darkMode, noteList }) => {
    return (
        <div>
            <div className='image-container'>
                <img className='profile-picture' src={placeholder} alt="Download" style={{ border: darkMode ? "10px solid #2C2E2C" : "10px solid #5D432C" }} />
            </div>
            <br></br>
            <table className="custom-table" style={{ maxHeight: "10vh", overflowY: "auto" }}>
                <thead>
                    <tr>
                        <th style={{ backgroundColor: darkMode ? "#121212" : "#FAF8DE", color: darkMode ? "white" : "black" }} >Note-Title</th>
                    </tr>
                </thead>
                <div className='table-container'>
                    <tbody>
                        {noteList.length === 0 ? (
                            <tr>
                                <td ><h1>No Notes, add some</h1></td>
                            </tr>) : noteList.map((note, i) => (
                                <tr key={i}>
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

// {noteList.length === 0 ? (
//     <tr>
//         <td colSpan="2"><h1>No Notes, add some</h1></td>
//     </tr>
// ) : (
//     noteList.map((note, i) => (
//         <tr key={i}>
//             <td scope="row">{note.header}</td>
//             <td>{/* You can add favorite icon or other content here */}</td>
//         </tr>
//     ))
// )} 