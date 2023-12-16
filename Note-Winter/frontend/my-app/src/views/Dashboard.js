//@author: Brandon Walton
//Dashboard

import React, { useState, useEffect } from 'react';
import pencil from '../images/pencil-button.png';
import eraser from '../images/eraser-button.png';
import axios from 'axios';
const url = 'http://localhost:5500/api/user';


function Dashboard() {


  const [userData, setUserData] = useState(null);

  const fetchUserData = async () =>{
    try{
      const resp = await axios.get(url, {withCredentials: true});
      console.log("Response is: ", resp);
      setUserData(resp.data);
    }
    catch(error){
      console.error('Error fetching user data:', error);
    }
  }

  useEffect(() => {
    console.log("Called ");
    fetchUserData();
  }, []);


  const [note, setNote] = useState('');
  const [noteList, setNoteList] = useState([]);
  const [header, setHeader] = useState('');
  const [headerList, setHeaderList] = useState([]);

  const handleNoteChange = (event) => {
    setNote(() => event.target.value);
  };

  const handleHeaderChange = (event) => {
    setHeader(event.target.value);
  };

  const handleClick = () => {
    setNoteList([...noteList, note]);
    setHeaderList([...headerList, header]);
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
        {noteList.length === 0 ? <h1>Insert a Note</h1> : (
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
