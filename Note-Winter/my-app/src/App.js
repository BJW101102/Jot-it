import './App.css';
import { useState } from "react";
import React from 'react';
import pencil from './images/pencil-button.png';
import eraser from './images/eraser-button.png';

function App() {
  const [note, setNote] = useState('');
  const [noteList, setNoteList] = useState([]);
  const [header, setHeader] = useState('');
  const [headerList, setHeaderList] = useState([]);

  const handleNoteChange = async (event) => {
    console.log("Event Logged: ", event.target.value);
    setNote(() => event.target.value);
  };

  const handleHeaderChange = (event) => {
    console.log("Header Event Logged: ", event.target.value);
    setHeader(event.target.value);
  };

  const handleClick = async () => {
    setNoteList([...noteList, note]);
    setHeaderList([...headerList, header]);
    console.log("NoteList: ", note);
  };

  const handleDelete = async (index) => {
    const updateList = [...noteList];
    updateList.splice(index, 1);
    setNoteList(updateList);
  };

  return (
    <div className='fluid-container'>
      <div className="App">
        <h1>Note Taker</h1>
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
            value={note} onChange={handleNoteChange}
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
        {/* {header && <p>Current Header: {header} <p>Current Note: {note}</p></p>} */}
        {noteList.length === 0 ? <h1>Insert a Note</h1> : (
          <div className="note-container">
            {
            noteList.map((note, i) => (
            <div key={i} className="card bg-light mb-3">
              <div className="card-header">{headerList[i]}</div>
              <div className="card-body">
                <p className="card-text">
                  <input type="checkbox" class="form-check-input" style={{ position: "relative", left: "-15px" }} />
                  <label class="form-check-label" for="exampleCheck1">{note}</label>
                </p>
                <button onClick={() => handleDelete(i)} style={{ position: "relative", left: "-100px" }}>
                  <img src={eraser} alt="Download" style={{ width: '25px', height: '25px' }} />
                </button>
              </div>
            </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;



