import React from 'react';
import placeholder from '../images/placeholder.png';
import '../CSS/SideView.css'; // Import a separate CSS file
import gold from '../images/gold-star.png';
import star from '../images/favorite-star.png';

const SideView = ({ darkMode, noteList, username }) => {

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
                <br></br>
                <br></br>
                <input class="form-control form-control-sm" id="formFileSm" type="file" />
            </div>
            <br></br>
            {noteList.length > 0 ? (
                <table className="custom-table" style={{ ...tableStyle, color: darkMode ? 'white' : 'black' }}>
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: darkMode ? "#121212" : "#E1DEBA", color: darkMode ? "white" : "black", textAlign: 'center' }}>
                                <h4>{username}'s notes</h4>
                                </th>
                        </tr>
                    </thead>
                    <tbody>
                        {noteList.map((note, i) => (
                            <tr key={i} style={i % 2 === 0 ? oddRowStyle : null}>
                                <td style={{ position: 'relative' }}>
                                    {note.header}
                                    <img src={note.isFavorite ? gold : star} alt="favorite" style={{ position: 'absolute', right: '3vh', top: '50%', transform: 'translateY(-50%)', width: '25px', height: '25px' }} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <h1>No Notes, add some</h1>
            )}
        </div>
    );
};

export default SideView;
