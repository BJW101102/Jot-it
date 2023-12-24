//@author: Brandon Walton
// NoteForm.js

import React from 'react';
import pencil from '../images/pencil-button.png';
import lightpencil from '../images/light-pencil-button.png';

const NoteForm = ({ header, note, handleHeaderChange, handleNoteChange, handleClick, darkMode }) => {
    return (
        <div className="form-container">
                <div className="form-group">
                <input
                    value={header}
                    onChange={handleHeaderChange}
                    className="form-control"
                    type="text"
                    placeholder="Note Header"
                    style={{ height: "5vh", width: "85vh", backgroundColor: darkMode ? "#F8F9FA" : "white" }}
                />
                <textarea
                    value={note}
                    onChange={handleNoteChange}
                    className="form-control"
                    placeholder="Leave a note here"
                    id="floatingTextarea"
                    style={{ height: "10vh", width: "85vh", backgroundColor: darkMode ? "#F8F9FA" : "white" }}
                />
            </div>

            <div className="button-container">
                <button onClick={handleClick}>
                    <img src={darkMode ? lightpencil : pencil} alt="Download" style={{ width: '15vh', height: '15vh' }} />
                </button>
            </div>
        </div>
    );
};

export default NoteForm;
