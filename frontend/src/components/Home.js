import React, { useState, useEffect } from "react";
import { API_URL } from "../config/config";
export const Home = () => {
  const fetchEvents = async () => {
    try {
      const url = `${API_URL}/api/events`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
  useEffect(() => {
    fetchEvents();
  }, []);

  const [events, setEvents] = useState([]);

  return (
    <div className="home">
      <div className="grid-container mt-10 p-4">
        {events.map((item, index) => (
          <div
            key={index}
            className="flex flex-col grid-item bg-[#f8f8f8] rounded-lg"
          >
            <img src={item.image} />
            <div>{item.title}</div>
            <div>{item.description.substr(0, 40)}</div>
            <div>{item.organizerName}</div>
            <div>INR {item.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
