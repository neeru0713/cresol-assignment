import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { API_URL } from "../config/config";
import { UserContext } from "../App";
const CreateEvent = ({ editMode }) => {
  const { state } = useLocation();
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    organization: "",
    organizerName: "",
    title: "",
    location: "",
    city: "",
    date: "",
    image: "",
    description: "",
    genre: "",
    price: "",
    maximumAllowed: "",
  });

  const navigate = useNavigate()

  useEffect(() => {
    if (editMode === true) {
      setFormData(state);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (editMode === true) {
        const url = `${API_URL}/api/events/${state._id}`;
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: user?.token,
          },
          body: JSON.stringify(formData),
        });
        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonRes = await response.json();
        navigate(`/${jsonRes?.title}/details`,  { state: jsonRes });
      } else {
        const url = `${API_URL}/api/events`;

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: user?.token,
          },
          body: JSON.stringify(formData),
        });

        if (response.status !== 201) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonRes = await response.json();
        const updatedUser = { ...user, role: "organizer" };
        setUser(updatedUser);
        localStorage.setItem("cresol_user", JSON.stringify(updatedUser));
        navigate(`/${jsonRes?.title}/details`,  { state: jsonRes });
      }
    } catch (error) {
      console.error("Error during API call:", error.message);
    }
  };

  return (
    <div className="create-event flex flex-col gap-10 p-12 w-[80%]">
      <div className="flex flex-col gap-5">
        <h1>Organizer Details</h1>
        <div className="flex justify-between">
          <div className="form-group">
            <label>Organization Name </label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Organizer Name</label>
            <input
              type="text"
              name="organizerName"
              value={formData.organizerName}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h1>Event Details</h1>

        <div className="flex justify-between">
          <div className="form-group">
            <label>Event Title </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Genre </label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>City </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Location </label>
          <input
            type="text"
            name="location"
            className="w-full"
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex justify-between">
          <div className="form-group">
            <label>Date and Time </label>
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Maximum Attendees</label>
            <input
              type="number"
              name="maximumAllowed"
              value={formData.maximumAllowed}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Event image link </label>
          <input
            type="text"
            name="image"
            className="w-full"
            value={formData.image}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group description">
          <label>Description </label>
          <textarea
            name="description"
            value={formData.description}
            className="border border-2 p-2 border-gray-400 rounded-lg h-[100px] w-full"
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group-buttons">
          <Link to="/">
            <button className="font-medium border border-gray-400 px-2 py-1 rounded-lg text-red-600 text-lg">
              Cancel
            </button>
          </Link>
          <button
            onClick={handleSave}
            className="font-medium border border-gray-400 px-2 py-1 rounded-lg bg-blue-800 text-white hover:bg-blue-700 text-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
