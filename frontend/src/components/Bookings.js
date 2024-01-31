import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from "../config/config";
import { UserContext } from "../App";
const Bookings = () => {
  const [events, setEvents] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const url = `${API_URL}/api/users/${userId}`
     
        const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: user?.token,
            },
          
          });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const eventData = await response.json();
        setEvents(eventData);
      } catch (error) {
        console.error('Error fetching user events:', error);
      }
    };

    fetchUserEvents();
  }, [userId]);

  const getDate = (dateString) => {
    // Implement your logic to format the date
  };

  const getTime = (dateString) => {
    // Implement your logic to format the time
  };

  return (
    <div className="event-table-container mx-10 my-4">
      <table className="event-table rounded-lg">
        <thead>
          <tr>
            <th>Organizer Name</th>
            <th>Organization</th>
            <th>Title</th>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.organizerName}</td>
              <td>{event.organization}</td>
              <td>{event.title}</td>
              <td>{getDate(event.date)}</td>
              <td>{getTime(event.date)}</td>
              <td>{event.location}</td>
              <td>{event.genre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
