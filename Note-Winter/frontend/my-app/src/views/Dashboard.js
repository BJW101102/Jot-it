//@author: Brandon Walton
//Dashboard

import React, { useState, useEffect } from 'react';
import pencil from '../images/pencil-button.png';
import eraser from '../images/eraser-button.png';
import axios from 'axios';
const url = 'http://localhost:5500/api/user';
const noteurl = 'http://localhost:5500/api/notes';


function Dashboard() {

  const [note, setNote] = useState('');
  const [noteList, setNoteList] = useState([]);
  const [header, setHeader] = useState('');
  const [headerList, setHeaderList] = useState([]);
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const resp = await axios.get(url, { withCredentials: true });
      // console.log("Response is: ", resp);
      setUserData(resp.data);
    }
    catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  const fetchUserNotes = async () => {
    try {
      const resp = await axios.get('http://localhost:5500/api/usernotes', { withCredentials: true });
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
    } catch (error) {
      console.error('Error fetching user notes:', error);
    }
  };
  

  useEffect(() => {
    console.log("Called ");
    fetchUserData();
    fetchUserNotes();

  }, []);




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
      const resp = await axios.post(noteurl, { header: header, body: note }, { withCredentials: true });
      console.log(resp.data);
    }
    catch (error) {
      console.log(error.response.data);
    }

  };

  const handleDelete = (index) => {
    const updateList = [...noteList];
    updateList.splice(index, 1);
    setNoteList(updateList);
  };

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
        {noteList.length === 0 ? (<h1>Insert a Note</h1>) : (
          <div className="note-container">
            {
              noteList.map((note, i) => (
                <div key={i} className="card bg-light mb-3">
                  <div className="card-header">{headerList[i]}</div>
                  <div className="card-body">
                    <p className="card-text">
                      <input type="checkbox" className="form-check-input" style={{ position: "relative", left: "-15px" }} />
                      <label className="form-check-label" htmlFor="exampleCheck1">{note}</label>
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

export default Dashboard;
