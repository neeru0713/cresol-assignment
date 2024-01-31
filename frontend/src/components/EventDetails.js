import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { API_URL } from "../config/config";
export const EventDetails = () => {
  const { state } = useLocation();
  const { user } = useContext(UserContext);
  const [joinClicked, setJoinClicked] = useState(false);
  const [isRSVPd, setIsRSVPd] = useState(false);

  const getDate = (timestamp) => {
    const dateTime = new Date(timestamp);
    return dateTime.toISOString().split("T")[0];
  };

  const getTime = (timestamp) => {
    const dateTime = new Date(timestamp);
    return dateTime.toISOString().split("T")[1].split(".")[0];
  };

  const checkRSVPStatus = async () => {
    try {
      const url = `${API_URL}/api/events/${state?._id}/rsvp`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: user?.token,
        },
       
      });

      if (response.status === 200) {
        setIsRSVPd(false)
      }
      if (response.status === 400) {
        setIsRSVPd(true)
      }

     
    } catch (error) {
      console.error("Error during API call:", error.message);
    }
  }

  useEffect(() => {
    checkRSVPStatus()
  }, []);

  const pushNotification = async (msg) => {
    try {
      const url = `${API_URL}/api/users/${user?._id}/notifications`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: user?.token,
        },
        body: JSON.stringify({ title: msg }),
      });

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      await response.json();
    } catch (error) {
      console.error("Error during API call:", error.message);
    }
  };

  const joinEventClickHandler = async () => {
    try {
      const url = `${API_URL}/api/events/${state?._id}/join`;

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
      setJoinClicked(true);

      await pushNotification(
        `Your event : ${state.title}'s booking is confirmed`
      );
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
        {isRSVPd ? (
          <div className="flex flex-col ">
          <button disabled className="border font-semibold border-1 rounded-lg bg-gray-400  text-white p-2">
            Attending
          </button>
          <p className="text-gray-600 ">You are already RSVP'D to this event</p>
          </div>
        ) : (
          <button
            onClick={joinEventClickHandler}
            className="border font-semibold border-1  rounded-lg bg-[#ee5537] hover:bg-[#ef5821] text-white p-2"
          >
            Join Event or RSVP
          </button>
        )}
      </div>
      <div className="flex gap-4">
        <div className="w-[30%] bg-[#f8f8f8] p-2 flex flex-col gap-2">
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
      {joinClicked && (
        <div className="absolute right-8 top-26">
          {" "}
          <Link
            to={`/${user._id}/bookings`}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
          >
            View all bookings
          </Link>
        </div>
      )}
    </div>
  );
};
