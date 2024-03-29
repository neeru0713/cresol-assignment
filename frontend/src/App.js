import NavBar from "./components/NavBar"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateEvent from "./components/CreateEvent";
import './App.css';
import { Home } from "./components/Home";
import { EventDetails } from "./components/EventDetails";
import React, { useState, useEffect, createContext } from "react";
import ManageEvent from "./components/ManageEvent";
import  Bookings  from "./components/Bookings";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    let user = localStorage.getItem("cresol_user");
    if (user) {
      let userObj = JSON.parse(user);
      setUser(userObj);
    }
  }, []);


  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="app">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:title/edit" element={<CreateEvent editMode={true}/>} />
            <Route path="/manageevent" element={<ManageEvent />} />
            <Route path="/createevent" element={<CreateEvent />} />
            <Route path="/:title/details" element={<EventDetails/>} />
            <Route path="/:userId/bookings" element={<Bookings/>} />
          </Routes>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
