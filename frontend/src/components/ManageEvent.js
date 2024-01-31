import React, { useState, useEffect, useContext } from "react";
import { API_URL } from "../config/config";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const ManageEvent = () => {
  const [events, setEvents] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate()

  const navigateToEditPage = (event) => {
    navigate(`/${event?.title}/edit`, { state: event });
  }

  const deleteEvent = async (id) => {
    try {
        const url = `${API_URL}/api/events/${id}`;
  
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: user?.token,
          },
        });
  
        if (response.status !== 204) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
       
        await fetchEvents()
      } catch (error) {
        console.error("Error during API call:", error.message);
      }
  }

  const fetchEvents = async () => {
    try {
      const url = `${API_URL}/api/events/${user?._id}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: user?.token,
        },
      });

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let jsonResponse = await response.json();
      setEvents(jsonResponse);
    } catch (error) {
      console.error("Error during API call:", error.message);
    }
  };

  const getDate = (timestamp) => {
    const dateTime = new Date(timestamp);
    return dateTime.toISOString().split("T")[0];
  };

  const getTime = (timestamp) => {
    const dateTime = new Date(timestamp);
    return dateTime.toISOString().split("T")[1].split(".")[0]; 
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="event-table-container mx-10 my-4 ">
      <table className="event-table rounded-lg">
        <thead>
          <tr>
            <th>Organizer Name</th>
            <th>Organization</th>
            <th>Title</th>
            <th>Date</th>
            <th>Time</th>
            <th>Maximum Allowed</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {events &&
            events.map((event) => (
              <tr key={event.id}>
                <td>{event.organizerName}</td>
                <td>{event.organization}</td>
                <td>{event.title}</td>
                <td>{getDate(event.date)}</td>
                <td>{getTime(event.date)}</td>
                <td>{event.maximumAllowed}</td>
                <td className="flex gap-5">
                
                    <button 
                    onClick={() => {navigateToEditPage(event)}}
                    className="font-medium px-3 py-1 rounded-lg bg-yellow-600 text-white hover:bg-yellow-500 text-lg">
                      Edit Event
                    </button>
                  

                  <button 
                  onClick={() => {deleteEvent(event?._id)}}
                  className="font-medium px-3 py-1 rounded-lg bg-red-600 text-white hover:bg-red-500 text-lg">
                    Delete Event
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageEvent;
