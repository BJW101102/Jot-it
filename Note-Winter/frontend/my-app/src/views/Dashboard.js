//@author: Brandon Walton
//Dashboard

import React, { useState, useEffect } from 'react';
import pencil from '../images/pencil-button.png';
import eraser from '../images/eraser-button.png';
import axios from 'axios';
import color from '../images/color-palette.png';

const api = axios.create({
  baseURL: 'http://localhost:5500/api/',
  withCredentials: true,  // Assuming you want to include credentials with each request
});

const colorPicker = [
  { header: "#f6a0a1", body: "#fea7a7bc" }, //Red
  { header: "#f7bbf9", body: "#ffc2ffbc" }, //Pink  
  { header: "#f6d4a1", body: "#fedba7bc" },  //Orange
  { header: "#b2f7a1", body: "#bafea7bc" },  //Green
  { header: "#bce9f9", body: "#c4f0ffbc" }, //Blue  
  { header: "#bda0f8", body: "#c5a7febc" }, //Purple
  { header: "#f1f2f3", body: "#f8f9fa" } //Gray
];

function Dashboard() {

  const [note, setNote] = useState('');
  const [noteList, setNoteList] = useState([]);
  const [header, setHeader] = useState('');
  const [headerList, setHeaderList] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);


//Begin: Fetching User Infromation
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
      const headerArray = notesData.header;
      const bodyArray = notesData.body;

      // Extract raw text from the 'header' property of each object
      const extractedTextHeaderArray = headerArray.map(obj => obj.header);
      const extractedTextBodyArray = bodyArray.map(obj => obj.body);

      // Update the state with the extracted text
      setHeaderList(extractedTextHeaderArray);
      setNoteList(extractedTextBodyArray);
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
//End: Fetching User Infromation


//Begin: Handlers
  const handleNoteChange = (event) => {
    setNote(() => event.target.value);
  };

  const handleHeaderChange = (event) => {
    setHeader(event.target.value);
  };

  const handleClick = async () => {
    setNoteList([...noteList, note]);
    setHeaderList([...headerList, header]);
    try {
      const resp = await api.post('notes', { header: header, body: note }, { withCredentials: true });
      console.log(resp.data);
    }
    catch (error) {
      console.log(error.response.data);
    }

  };

  const handleDelete = async (noteToDelete) => {

    const indexToDelete = noteList.indexOf(noteToDelete);

    try {
      const resp = await api.delete('deletenotes', {
        data: { index: indexToDelete },
        withCredentials: true
      });
      const updatedNoteList = [...noteList];
      const updatedHeaderList = [...headerList];
      updatedNoteList.splice(indexToDelete, 1);
      updatedHeaderList.splice(indexToDelete, 1);

      setNoteList(updatedNoteList);
      setHeaderList(updatedHeaderList);

      console.log(resp.data);
    }
    catch (error) {
      console.log(error.response.data);
    }
  };
  var colorIndex = -1;
  const handleColorChange = async (index) => {
    console.log("called");
    if (colorIndex === 6) {
      colorIndex = 0;
    }
    else {
      colorIndex++;

    }
    const cardHeader = document.getElementsByClassName("card-header");
    const cardBody = document.getElementsByClassName("card-body");

    cardHeader[index].style.setProperty('background-color', colorPicker[colorIndex].header, 'important');
    cardBody[index].style.setProperty('background-color', colorPicker[colorIndex].body, 'important');

  };
//End: Handlers

  return (
    <div className='fluid-container'>
      <div className="Dashboard">
        <h1>Note Taker</h1>
        {userData && userData.username && (
          <p>Welcome, {userData.username}!</p>
        )}
        <br></br>
        <div className="form-container">
          <input
            value={header}
            onChange={handleHeaderChange}
            type="text"
            placeholder="Note Header"
            style={{ height: "5vh", width: "100vh" }}
          />
          <textarea
            value={note}
            onChange={handleNoteChange}
            placeholder="Leave a note here"
            id="floatingTextarea"
            style={{ height: "10vh", width: "100vh", }}>
          </textarea>
          <div className="button-container">
            <button onClick={handleClick}>
              <img src={pencil} alt="Download" style={{ width: '50px', height: '50px' }} />
            </button>
          </div>
        </div>
        <br></br>
        {loading ? (
          <p>Loading...</p>
        ) : (
          noteList.length === 0 ? (<h1>Insert a Note</h1>) : (
            <div className="note-container">
              {

                noteList.map((note, i) => (
                  <div key={i} className="card bg-light mb-3" style={{ width: "45vh", }}>
                    <div className="card-header">{headerList[i]}</div>
                    <div className="card-body">
                      <p className="card-text">
                        {note.split('\n').map((lineNote, j) => (
                          <React.Fragment key={j}>
                            {j > 0 && <br />}
                            {<input type="checkbox" className="form-check-input" style={{ position: "relative", left: "-15px" }} />}
                            {<label id="note-text" className="form-check-label">{lineNote}</label>}
                          </React.Fragment>
                        ))}
                      </p>
                      <button onClick={() => handleDelete(note)} style={{ position: "relative", left: "-110px" }}>
                        <img src={eraser} alt="Download" style={{ width: '25px', height: '25px' }} />
                      </button>
                      <button onClick={() => handleColorChange(i)}>
                        <img src={color} alt="Download" style={{ width: '25px', position: "relative", left: '-100px' }} />
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
