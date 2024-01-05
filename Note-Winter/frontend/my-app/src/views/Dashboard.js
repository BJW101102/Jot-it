//@author: Brandon Walton
//Dashboard

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Card from '../components/NoteCard';
import NoteForm from '../components/NoteForm';
import NavBar from '../components/NavBar';
import axios from 'axios';
import SideView from '../components/SideView';

const api = axios.create({
  baseURL: 'http://localhost:5500/api/',
  withCredentials: true,
});

function Dashboard() {

  const [note, setNote] = useState('');
  const [noteList, setNoteList] = useState([{ header: 'Default Header', body: 'Default Body', colorIndex: 0 }]);
  const [header, setHeader] = useState('');
  const [userData, setUserData] = useState('');
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);


  //=======FECTHES=========//
  useEffect(() => {
    console.log("Called ");
    const fetchUserNotes = async () => {
      try {
        const resp = await api.get('usernotes', { withCredentials: true });
        console.log(resp);
        const notesData = resp.data;
        // Extract raw text from the 'header' property of each object
        const extractedNotes = notesData.map(obj => ({ id: obj.id, header: obj.header, body: obj.body, colorIndex: obj.color, isFavorite: obj.isFavorite }
        ));
        console.log("Color Index: ", extractedNotes);
        setNoteList(extractedNotes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user notes:', error);
      }
    };
    const fetchUserData = async () => {
      const styleElement = document.createElement('style');
      styleElement.innerHTML = `
        ::-webkit-scrollbar-track {
          background-color: ${darkMode ? '#2C2E2C' : '#958870'};
          border-radius: 10px;
        }
    
        ::-webkit-scrollbar-thumb {
          background-color: ${darkMode ? '#A5A6A6' : '#4B3E33'};
          border-radius: 10px;
        }
    
        ::-webkit-scrollbar-thumb:hover {
          background-color: ${darkMode ? '#6A6B6C' : '#251F19'};
        }
      `;
    
      document.head.appendChild(styleElement);
      try {
        const resp = await api.get('user', { withCredentials: true });
        console.log(resp.data.username);
        setUserData(resp.data);
        setDarkMode(resp.data.theme);
        //Couldn't just call the method, very weird!
        if (resp.data.theme === true) {
          handleDarkMode();
        }
        console.log("Theme is: ", resp.data.theme);
      }
      catch (error) {
        console.error('Error fetching user data:', error);
        console.log("No user");
  
      }
    };
    fetchUserNotes();
    fetchUserData();
    // eslint-disable-next-line
  }, []);

  //=======HANDLERS-NOTE/THEME=========//
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
      const resp = await api.post('notes', { header: header, body: note, color: newNote.colorIndex, isFavorite: newNote.isFavorite }, { withCredentials: true });
      newNote.id = resp.data.noteID;
      console.log(newNote);
      setNoteList([...noteList, newNote]);
      console.log(resp.data);
    }
    catch (error) {
      console.log(error.response.data);
    }

  };

  const handleDarkMode = async () => {
    const cardHeader = document.querySelectorAll(".card-header");
    const cardBody = document.querySelectorAll(".card-body");
    const card = document.querySelectorAll(".card");
    const dashboard = document.querySelectorAll(".Dashboard");
    const cardtext = document.querySelectorAll("#note-text");
    var darkModeRequest = false;


    // Apply styles to customize the scrollbar

    // For WebKit browsers (Chrome, Safari)

    if (!darkMode) {
      document.body.style.setProperty('background-color', "#121212", "important");
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
      darkModeRequest = true;
    }
    else {
      document.body.style.setProperty('background-color', "#faf8de", "important");
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
      darkModeRequest = false;
    }
    const styleElement = document.createElement('style');

    styleElement.innerHTML = `
        ::-webkit-scrollbar-track {
          background-color: ${!darkMode ? '#2C2E2C' : '#958870'};
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background-color: ${!darkMode ? '#A5A6A6' : ' #4B3E33'};
          border-radius: 10px;
        }
       
        ::-webkit-scrollbar-thumb:hover {
          background-color: ${!darkMode ? '#6A6B6C' : '#251F19'};
        }
      `;
    
      document.head.appendChild(styleElement);
   
    try {
      const resp = await api.patch('theme', { theme: darkModeRequest }, { withCredentials: true });
      console.log(resp);
    }
    catch (error) {
      console.log(error.response.data);
    }
  };

  //=======HANDLERS-CARD-BUTTONS=========//
  const handleColorChange = async (colorPicker, note, i) => {

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

  const handleFavoriteNote = async (favNote) => {
    console.log("Fav Id: ", favNote.id);
    const updatedNotes = [...noteList];
    const noteToFavoriteIndex = updatedNotes.indexOf(favNote);
    var swappedNoteIndex = -1;
    var situation = 0;
    if (!updatedNotes[noteToFavoriteIndex].isFavorite) {
      updatedNotes[noteToFavoriteIndex].isFavorite = true;
      const firstUnfavoritedIndex = updatedNotes.findIndex((note) => !note.isFavorite);
      console.log("favNoteIndex is: ", noteToFavoriteIndex);
      console.log("swappedNoteIndex is: ", swappedNoteIndex);
      if (firstUnfavoritedIndex !== -1 && noteToFavoriteIndex !== 0 && !updatedNotes[noteToFavoriteIndex - 1].isFavorite) {
        [updatedNotes[noteToFavoriteIndex], updatedNotes[firstUnfavoritedIndex]] = [
          updatedNotes[firstUnfavoritedIndex],
          updatedNotes[noteToFavoriteIndex],
        ];
        swappedNoteIndex = noteToFavoriteIndex;  //Swapped has happened new index
        situation = 1;
      }
    }
    else {
      updatedNotes[noteToFavoriteIndex].isFavorite = false;
      updatedNotes.splice(noteToFavoriteIndex, 1); // Remove the unfavorited note from its current position
      updatedNotes.push(favNote); // Append it to the end of the array
      console.log("Fav not boolean: ", favNote.isFavorite);
      situation = 2;

    }
    switch (situation) {
      case 0: //Favorite with no swap
        try {
          const resp = await api.patch('favorite', { favNoteID: favNote.id, swapNoteID: null, situation: 0 }, { withCredentials: true });
          console.log(resp);
        }
        catch (error) {
          console.log(error);
        }
        break;

      case 1://Favorite with swap
        try {
          const resp = await api.patch('favorite', { favNoteID: favNote.id, swapNoteID: updatedNotes[swappedNoteIndex].id, situation: 1 }, { withCredentials: true });
          console.log(resp);
        }
        catch (error) {
          console.log(error);
        }
        break;

      case 2: //Unfavorite
        try {
          const resp = await api.patch('favorite', { favNoteID: favNote.id, swapNoteID: null, situation: 2 }, { withCredentials: true });
          console.log(resp);
        }
        catch (error) {
          console.log(error);
        }
        break;
        default: console.log("Something Unexpected Happend");
    }
    setNoteList(updatedNotes);
  };

  const handleDelete = async (colorPicker, darkColorPicker, noteToDelete) => {
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
      setNoteList(updatedNoteList);
      console.log(resp.data);
    }
    catch (error) {
      console.log(error.response.data);
    }
  };

  //======COMPONENT=====//
  return (
    <div className='container-fluid'>
      <div className='row'>
        <NavBar
          username={userData && userData.username}
          noteList={noteList}
          darkMode={darkMode}
          handleDarkMode={handleDarkMode} />
      </div>
      <div className='row'>

      <div className='col-xl-3' style={{ backgroundColor: darkMode ? "#1a1b1a" : "#BBAB8C", overflow: 'auto'}}>
          <SideView darkMode={darkMode} noteList={noteList} />
        </div>
        <div className='col-xl-9'>
          <div className="Dashboard">
            <Header username={userData && userData.username} darkMode={handleDarkMode} />
            <NoteForm
              header={header}
              note={note}
              handleHeaderChange={handleHeaderChange}
              handleNoteChange={handleNoteChange}
              handleClick={handleClick}
              darkMode={darkMode}
            />
            {loading ? (
              <p>Loading...</p>
            ) : (
              //=====NOTE-DISPLAYER=====//
              noteList.length === 0 ? (<h1>Insert a Note</h1>) : (
                <div className='note-view-container'>
                  <div className="note-container">
                    {noteList.map((note, i) => (
                      <Card
                        key={i}
                        note={note}
                        i={i}
                        darkMode={darkMode}
                        handleColorChange={handleColorChange}
                        handleFavoriteNote={handleFavoriteNote}
                        handleDelete={handleDelete}
                      />
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
