import React, { useContext } from "react";
import { useLocation } from "react-router";
import { UserContext } from "../App";
import { API_URL } from "../config/config";
export const EventDetails = () => {
  const { state } = useLocation();
  const { user } = useContext(UserContext);

  const getDate = (timestamp) => {
    const dateTime = new Date(timestamp);
    return dateTime.toISOString().split("T")[0]; 
  };

  const getTime = (timestamp) => {
    const dateTime = new Date(timestamp);
    return dateTime.toISOString().split("T")[1].split(".")[0]; 
  };

  const joinEventClickHandler = async () => {
    try {
      const url = `${API_URL}/api/events/${state._id}/join`;

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

      await response.json();
    } catch (error) {
      console.error("Error during API call:", error.message);
    }
  };

  console.log("Event data in route", state);
  return (
    <div className="mx-[15%] mt-5 flex flex-col gap-1">
      <img src={state?.image} className="w-full h-[400px] " />
      <div className="flex justify-between px-5 py-2 bg-[#f8f8f8]">
        <h1 className="font-bold text-3xl ">{state.title}</h1>
        <button
          onClick={joinEventClickHandler}
          className="border font-semibold border-1  rounded-lg bg-[#ee5537] hover:bg-[#ef5821] text-white p-2"
        >
          Join Event
        </button>
      </div>
      <div className="flex gap-4">
        <div className="w-[30%] bg-[#f8f8f8 flex flex-col gap-2">
          <div className="detail-group">
            <h2>Date</h2>
            <span>{getDate(state.date)}</span>
          </div>
          <div className="detail-group">
            <h2>Time</h2>
            <span>{getTime(state.date)}</span>
          </div>
          <div className="detail-group">
            <h2>Price</h2>
            <span>INR {state.price}</span>
          </div>
          <div className="detail-group">
            <h2>City</h2>
            <span>{state.city}</span>
          </div>
          <div className="detail-group">
            <h2>Location</h2>
            <span>{state.location}</span>
          </div>
        </div>
        <div className="w-[70%] bg-[#F5F5F5]">
          <h2 className="px-10 py-5 font-semibold text-2xl">About</h2>
          <p className="px-10 py-5 text-lg">{state.description}</p>
        </div>
      </div>
    </div>
  );
};
