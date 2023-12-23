//@author: Brandon Walton
// NoteForm.js
import React from 'react';
import pencil from '../images/pencil-button.png';
import lightpencil from '../images/light-pencil-button.png';

const NoteForm = ({ header, note, handleHeaderChange, handleNoteChange, handleClick, darkMode }) => {
    return (
        <div className="form-container">
            <input
                value={header}
                onChange={handleHeaderChange}
                type="text"
                placeholder="Note Header"
                style={{ height: "5vh", width: "100vh", backgroundColor: darkMode ? "#F8F9FA" : "white" }}
            />
            <textarea
                value={note}
                onChange={handleNoteChange}
                placeholder="Leave a note here"
                id="floatingTextarea"
                style={{ height: "10vh", width: "100vh", backgroundColor: darkMode ? "#F8F9FA" : "white" }}

            > </textarea>
            <div className="button-container">
                <button onClick={handleClick}>
                    <img src={darkMode ? lightpencil : pencil} alt="Download" style={{ width: '50px', height: '50px' }} />
                </button>
            </div>
            <br></br>
        </div>

    );
};

export default NoteForm;
