//@author: Brandon Walton
// Card.js
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import star from '../images/favorite-star.png';
import editpencil from '../images/edit-pencil.png';
import eraser from '../images/eraser-button.png';
import color from '../images/color-palette.png';
import gold from '../images/gold-star.png';
import save from '../images/save-button.png';

// import swal from 'sweetalert';
// import lighteraser from '../images/light-eraser-button.png';
// import lightcolor from '../images/light-color-palette.png';
// import lightstar from '../images/light-favorite-star.png';
// import lighteditpencil from '../images/light-edit-pencil.png';
// import lightgoldstar from '../images/light-gold-star.png';

const api = axios.create({
    baseURL: 'http://localhost:5500/api/',
    withCredentials: true,
});



const colorPicker = [
    { header: "#f1f2f3", body: "#f8f9fa" },   //Gray
    { header: "#f6a0a1", body: "#fea7a7bc" }, //Red
    { header: "#f7bbf9", body: "#ffc2ffbc" }, //Pink  
    { header: "#f6d4a1", body: "#fedba7bc" }, //Orange
    { header: "#b2f7a1", body: "#bafea7bc" }, //Green
    { header: "#bce9f9", body: "#c4f0ffbc" }, //Blue  
    { header: "#bda0f8", body: "#c5a7febc" }, //Purple
];

const darkColorPicker = [
    { header: "#373c38d3", body: "#393a36" },   //Gray
    { header: "#a82424d3", body: "#a32626" }, //Red
    { header: "#a95082", body: " #a14e80d3" }, //Pink  #a95082
    { header: "#e38109d3", body: "#e39842" }, //Orange
    { header: "#6a7f2b", body: "#607d29d3" }, //Green "#6a7f2b" "#607d29d3"
    { header: "#1c397b", body: "#293b7dd3" }, //Blue   "#1c397b" "#293b7dd3"
    { header: "#5b297dd3", body: "#51267bb9" }, //Purple 
];


const Card = ({ note, i, darkMode, handleColorChange, handleFavoriteNote, handleDelete }) => {

    const [editMode, setEditMode] = useState(false);
    const [editedHeader, setEditedHeader] = useState(note.header);
    const [editedBody, setEditedBody] = useState(note.body);

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleHeaderChange = (event) => {
        setEditedHeader(event.target.value);
    };

    const handleBodyChange = (event) => {
        setEditedBody(event.target.value);
    };

    const handleSave = async (note) => {
        note.header = editedHeader;
        note.body = editedBody;
        try {
            const resp = await api.patch('editnote', { header: editedHeader, body: editedBody, noteID: note.id }, { withCredentials: true });
            console.log(resp);
        }
        catch (error) {
            console.log(error.response.data);
        }
        toggleEditMode();
    };
    return (
        <div key={i} className="card bg-light mb-3" style={{ width: "45vh", borderColor: darkMode ? "#121212" : "unset" }}>
            {/*====HEADER-TEXT====*/}
            <div id={`card-header-${i}`} className="card-header" style={{ backgroundColor: darkMode ? darkColorPicker[note.colorIndex].header : colorPicker[note.colorIndex].header, borderColor: darkMode ? "#121212" : "unset", color: darkMode ? "white" : "black" }}>
                {editMode ? (
                    <div className="Edit-Header" >
                        <button
                            style={{ position: 'relative', left: '-3vh' }}
                            onClick={() => handleSave(note)}
                            type="button">
                            <img src={save} alt="Save" style={{ width: '25px', height: '25px' }} />
                        </button>
                        <input
                            type="text"
                            value={editedHeader}
                            onChange={handleHeaderChange}
                            style={{ backgroundColor: darkMode ? "#F8F9FA" : "white" }}
                        >
                        </input>
                    </div>
                ) : (
                    note.header
                )}
            </div>
            {editMode ? (
                <div className="Edit-Body" style={{ backgroundColor: darkMode ? darkColorPicker[note.colorIndex].body : colorPicker[note.colorIndex].body }}>
                    <textarea
                        type="text"
                        value={editedBody}
                        onChange={handleBodyChange}
                        style={{ width: "40vh", marginTop: "2vh", marginBottom: "2vh", backgroundColor: darkMode ? "#F8F9FA" : "white" }}
                    >
                    </textarea>
                </div>

            ) : (
                <div id={`card-body-${i}`} className="card-body" style={{ backgroundColor: darkMode ? darkColorPicker[note.colorIndex].body : colorPicker[note.colorIndex].body }}>
                    {/* ==== BODY-TEXT ==== */}
                    <p className="card-text">
                        {note.body.split('\n').map((lineNote, j) => (
                            <React.Fragment key={j}>
                                {j > 0 && <br />}
                                {<label id="note-text" style={{ color: darkMode ? "white" : "unset" }} className="form-check-label">{lineNote}</label>}
                            </React.Fragment>
                        ))}
                    </p>
                </div>
            )
            }
            <div style={{ display: "flex", marginTop: "0px", backgroundColor: darkMode ? darkColorPicker[note.colorIndex].body : colorPicker[note.colorIndex].body }}>

                {/* ==== EDIT-BUTTON ==== */}
                <div className='edit-button' style={{ left: "10px", marginRight: "2.5vh", top: "-2vh", position: "relative" }}>
                    <button onClick={toggleEditMode}>
                        <img src={editpencil} alt="Download" style={{ width: '25px', height: '25px' }} />
                    </button>
                </div>

                {editMode ? (<div></div>) : (
                    <div className="Buttons" style={{ position: "relative", top: "-2vh" }}>
                        {/* ==== COLOR-BUTTON ==== */}
                        <button style={{ marginRight: "1vh" }} onClick={() => handleColorChange(colorPicker, note, i)}>
                            <img src={color} alt="Change-Color" style={{ width: '25px', height: '25px' }} />
                        </button>

                        {/* ==== FAVORITE-BUTTON ==== */}
                        <button style={{ marginRight: "23vh" }} onClick={() => handleFavoriteNote(note)}>
                            <img id={`fav-star-${i}`}
                                src={note.isFavorite ? gold : star}
                                alt="Change-Color"
                                style={{ width: '25px', height: '25px' }}
                            />
                        </button>

                        {/* ==== DELETE-BUTTON ==== */}
                        <button onClick={() => handleDelete(colorPicker, darkColorPicker, note)}>
                            <img src={eraser} alt="Download" style={{ width: '25px', height: '25px' }} />
                        </button>
                    </div>
                )
                }
            </div>
        </div >

    );
};
export default Card;
