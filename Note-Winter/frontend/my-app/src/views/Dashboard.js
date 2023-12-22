//@author: Brandon Walton
//Dashboard

import React, { useState, useEffect } from 'react';
import pencil from '../images/pencil-button.png';
import editpencil from '../images/edit-pencil.png';
import eraser from '../images/eraser-button.png';
import color from '../images/color-palette.png';
import star from '../images/favorite-star.png';
import gold from '../images/gold-star.png';
import lightpencil from '../images/light-pencil-button.png';
import lighteraser from '../images/light-eraser-button.png';
import lightcolor from '../images/light-color-palette.png';
import lightstar from '../images/light-favorite-star.png';
import lighteditpencil from '../images/light-edit-pencil.png';


import axios from 'axios';

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
  { header: " #a14e80d3", body: " #a95082" }, //Pink  
  { header: "#e38109d3", body: "#e39842" }, //Orange
  { header: "#607d29d3", body: "#6a7f2b" }, //Green
  { header: "#293b7dd3", body: "#1c397b" }, //Blue  
  { header: "#5b297dd3", body: "#51267bb9" }, //Purple 
];

function Dashboard() {

  const [note, setNote] = useState('');
  const [noteList, setNoteList] = useState([{ header: 'Default Header', body: 'Default Body', colorIndex: 0 }]);
  const [header, setHeader] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);



  //=======FECTHES=========//
  const fetchUserData = async () => {
    try {
      const resp = await api.get('user', { withCredentials: true });
      // console.log("Response is: ", resp);
      setUserData(resp.data);
    }
    catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  const fetchUserNotes = async () => {
    try {
      const resp = await api.get('usernotes', { withCredentials: true });
      console.log(resp);
      const notesData = resp.data;

      // Extract raw text from the 'header' property of each object
      const extractedNotes = notesData.map(obj => ({ id: obj.id, header: obj.header, body: obj.body, colorIndex: obj.color }));
      console.log("Color Index: ", extractedNotes);

      setNoteList(extractedNotes);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user notes:', error);
    }
  };

  useEffect(() => {
    console.log("Called ");
    fetchUserData();
    fetchUserNotes();
  }, []);


  //=======HANDLERS=========//
  const handleNoteChange = (event) => {
    setNote(() => event.target.value);
  };

  const handleHeaderChange = (event) => {
    setHeader(event.target.value);
  };

  const handleClick = async () => {
    const newNote = {
      header: header,
      body: note,
      colorIndex: 0,
      isFavorite: false,
      id: "-1"
    };

    try {
      const resp = await api.post('notes', { header: header, body: note, color: newNote.colorIndex }, { withCredentials: true });
      newNote.id = resp.data.noteID;
      console.log(newNote);
      setNoteList([...noteList, newNote]);
      console.log(resp.data);
    }
    catch (error) {
      console.log(error.response.data);
    }

  };

  const handleDelete = async (noteToDelete) => {
    console.log("Before Filter:  ", noteList);
    const updatedNoteList = noteList.filter((note) => note !== noteToDelete);
    console.log("After Filter: ", updatedNoteList);

    try {
      const resp = await api.delete('deletenotes', {
        data: { noteToDelete },
        withCredentials: true
      });

      updatedNoteList.forEach((note, index) => {
        const cardHeader = document.getElementById(`card-header-${index}`);
        const cardBody = document.getElementById(`card-body-${index}`);
        if (!darkMode) {
          cardHeader.style.setProperty('background-color', colorPicker[note.colorIndex].header, 'important');
          cardBody.style.setProperty('background-color', colorPicker[note.colorIndex].body, 'important');
        }
        else {
          cardHeader.style.setProperty('background-color', darkColorPicker[note.colorIndex].header, 'important');
          cardBody.style.setProperty('background-color', darkColorPicker[note.colorIndex].body, 'important');
        }

      });


      // console.log("updated notes: ", updatedColors);

      setNoteList(updatedNoteList);
      console.log(resp.data);
    }
    catch (error) {
      console.log(error.response.data);
    }
  };

  const handleColorChange = async (note, i) => {

    const updatedNotes = [...noteList];
    const noteToChange = updatedNotes.indexOf(note);

    console.log("Found you at: ", noteToChange);
    console.log("Current color is: ", noteList[noteToChange].colorIndex);
    console.log("Note ID is: ", note.id);
    const updatedColorIndex = (updatedNotes[noteToChange].colorIndex === 6) ? 0 : updatedNotes[noteToChange].colorIndex + 1;

    try {
      const resp = await api.patch('changecolor', { color: updatedColorIndex, noteIndex: i }, { withCredentials: true });
      console.log(resp);
    }
    catch (error) {
      console.log(error);
    }

    updatedNotes[noteToChange].colorIndex = updatedColorIndex;
    setNoteList(updatedNotes);

    const cardHeader = document.getElementById(`card-header-${i}`);
    const cardBody = document.getElementById(`card-body-${i}`);

    if (cardHeader && cardBody) {
      cardHeader.style.setProperty('background-color', colorPicker[updatedColorIndex].header, 'important');
      cardBody.style.setProperty('background-color', colorPicker[updatedColorIndex].body, 'important');
    }
  };

  //Add Request
  const handleDarkMode = async () => {
    const cardHeader = document.querySelectorAll(".card-header");
    const cardBody = document.querySelectorAll(".card-body");
    const card = document.querySelectorAll(".card");
    const dashboard = document.querySelectorAll(".Dashboard");
    const cardtext = document.querySelectorAll("#note-text");

    if (!darkMode) {
      cardHeader.forEach((headerElement) => {
        headerElement.style.setProperty('border-color', "#121212", "important");
        headerElement.style.setProperty('color', "white", "important");
      });

      cardBody.forEach((bodyElement) => {
        bodyElement.style.setProperty('border-color', "#121212", "important");
      });

      card.forEach((cardElement) => {
        cardElement.style.setProperty('border-color', "#121212", "important");
      });

      dashboard.forEach((dashboardElement) => {
        dashboardElement.style.setProperty('background-color', "#121212", "important");
        dashboardElement.style.setProperty('color', "white", "important");
      })

      cardtext.forEach((textElement => {
        textElement.style.setProperty('color', "white", "important");
      }))
      setDarkMode(true);
    }
    else {
      cardHeader.forEach((headerElement) => {
        headerElement.style.removeProperty('border-color');
        headerElement.style.removeProperty('color');
      });

      cardBody.forEach((bodyElement) => {
        bodyElement.style.removeProperty('border-color');
      });

      card.forEach((cardElement) => {
        cardElement.style.removeProperty('border-color');
      });

      dashboard.forEach((dashboardElement) => {
        dashboardElement.style.removeProperty('background-color');
        dashboardElement.style.removeProperty('color');
      });

      cardtext.forEach((textElement) => {
        textElement.style.removeProperty('color');
      })



      setDarkMode(false);
    }
  };

  //Add Request
  const handleFavoriteNote = async (favNote) => {
    console.log("Fav Id: ", favNote.id);
    const updatedNotes = [...noteList];
    const noteToFavoriteIndex = updatedNotes.indexOf(favNote);
    const starIcon = document.getElementById(`fav-star-${favNote.id}`);


    if (!updatedNotes[noteToFavoriteIndex].isFavorite) {
      updatedNotes[noteToFavoriteIndex].isFavorite = true;
      const firstUnfavoritedIndex = updatedNotes.findIndex((note) => !note.isFavorite);
      starIcon.src = gold;

      if (firstUnfavoritedIndex !== -1 && noteToFavoriteIndex !== 0 && !updatedNotes[noteToFavoriteIndex - 1].isFavorite) {
        [updatedNotes[noteToFavoriteIndex], updatedNotes[firstUnfavoritedIndex]] = [
          updatedNotes[firstUnfavoritedIndex],
          updatedNotes[noteToFavoriteIndex],
        ];
      }


    }
    else {
   
      updatedNotes.splice(noteToFavoriteIndex, 1); // Remove the unfavorited note from its current position
      updatedNotes.push(favNote); // Append it to the end of the array
      updatedNotes[updatedNotes.length - 1].isFavorite = false;
      const starIconToUpdate = document.getElementById(`fav-star-${ updatedNotes[updatedNotes.length - 1].id}`);
      starIconToUpdate.src = star;

      console.log("Fav not boolean: ", favNote.isFavorite);


       
    }

    setNoteList(updatedNotes);
  };

  //======COMPONENT=====//
  return (
    <div className='fluid-container'>
      <div className="Dashboard">
        <button onClick={handleDarkMode}>Dark Mode Tester</button>
        {/*=====HEADER=====*/}
        <h1>Note Taker</h1>
        {userData && userData.username && (
          <p>Welcome, {userData.username}!</p>
        )}
        <br></br>
        {/*===FORM-CONTAINER===*/}
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
            style={{ height: "10vh", width: "100vh", backgroundColor: darkMode ? "#F8F9FA" : "white" }}>
          </textarea>
          <div className="button-container">
            <button onClick={handleClick}>
              <img src={darkMode ? lightpencil : pencil} alt="Download" style={{ width: '50px', height: '50px', }} />
            </button>
          </div>
        </div>
        <br></br>
        {loading ? (
          <p>Loading...</p>
        ) : (
          //=====NOTE-DISPLAYER=====//
          noteList.length === 0 ? (<h1>Insert a Note</h1>) : (
            <div className="note-container">
              {
                noteList.map((note, i) => (
                  <div key={i} className="card bg-light mb-3" style={{ width: "45vh", borderColor: darkMode ? "#121212" : "unset" }}>
                    {/*====HEADER-TEXT====*/}
                    <div id={`card-header-${i}`} className="card-header" style={{ backgroundColor: darkMode ? darkColorPicker[note.colorIndex].header : colorPicker[note.colorIndex].header, borderColor: darkMode ? "#121212" : "unset" }}>
                      {note.id}
                    </div>
                    <div id={`card-body-${i}`} className="card-body" style={{ backgroundColor: darkMode ? darkColorPicker[note.colorIndex].body : colorPicker[note.colorIndex].body }}>
                      {/* ==== BODY-TEXT ==== */}
                      <p className="card-text">
                        {note.body.split('\n').map((lineNote, j) => (
                          <React.Fragment key={j}>
                            {j > 0 && <br />}
                            {/* {<input type="checkbox" className="form-check-input" style={{ position: "relative", left: "-1vh" }} />} */}
                            {<label id="note-text" style={{ color: darkMode ? "white" : "unset" }} className="form-check-label">{lineNote}</label>}
                          </React.Fragment>
                        ))}
                      </p>

                    </div>
                    <div style={{ display: "flex", marginTop: "0px", backgroundColor: darkMode ? darkColorPicker[note.colorIndex].body : colorPicker[note.colorIndex].body }}>
                      {/* ==== DELETE BUTTON ==== */}
                      <button style={{ left: "10px", marginRight: "2.5vh", top: "-2vh", position: "relative" }}>
                        <img src={darkMode ? lighteditpencil : editpencil} alt="Download" style={{ width: '25px', height: '25px' }} />
                      </button>
                      {/* ==== COLOR CHANGE BUTTON ==== */}
                      <button onClick={() => handleColorChange(note, i)} style={{ position: "relative", top: "-2vh", marginRight: "1vh" }}>
                        <img src={darkMode ? lightcolor : color} alt="Change-Color" style={{ width: '25px', height: '25px' }} />
                      </button>
                      <button onClick={() => handleFavoriteNote(note)} style={{ position: "relative", top: "-2vh" }}>
                        <img id={`fav-star-${note.id}`} src={darkMode ? lightstar : star} alt="Change-Color" style={{ marginRight: "22vh", width: '25px', height: '25px' }} />
                      </button>
                      <button onClick={() => handleDelete(note)} style={{ left: "10px", marginRight: "2.5vh", top: "-2vh", position: "relative" }}>
                        <img src={darkMode ? lighteraser : eraser} alt="Download" style={{ width: '25px', height: '25px' }} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Dashboard;
