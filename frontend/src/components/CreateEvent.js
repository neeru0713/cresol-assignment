import React, { useState } from "react";

const CreateEvent = ({ onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    organization: "",
    title: "",
    location: "",
    dateTime: "",
    image: "",
    description: "",
    genre: "",
    price: "",
    maxAttendees: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="create-event flex flex-col gap-4 border border-2 w-[500px] rounded-xl p-12 text-center m-auto">
      <label>
        Organization:
        <input
          type="text"
          name="organization"
          value={formData.organization}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Location:
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Date and Time:
        <input
          type="datetime-local"
          name="dateTime"
          value={formData.dateTime}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Image of Event:
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Genre:
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Price:
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Maximum Attendees:
        <input
          type="number"
          name="maxAttendees"
          value={formData.maxAttendees}
          onChange={handleInputChange}
        />
      </label>

      <div>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default CreateEvent;
