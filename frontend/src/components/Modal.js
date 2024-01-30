import React, { useState } from "react";

const Modal = ({ pageName, closeModal }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    city: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email || !formData.email.includes("@")) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password should be at least 6 characters";
    }
    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    if (!formData.city) {
      newErrors.city = "City is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
        
      closeModal(); 
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="overlay" onClick={closeModal}></div>
      <div className="fixed z-[1000] border border-2 w-[400px] rounded-xl right-[40%] border p-10 bg-white">
        <h2 className="text-2xl font-semibold mb-4 text-center">{pageName}</h2>
        <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
            {errors.city && <div className="error">{errors.city}</div>}
          </div>

          <div className="form-buttons mt-5 flex w-full justify-between">
            <button
              type="button"
              className="font-medium border border-gray-400 px-2 py-1 rounded-lg text-red-500"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="font-medium border border-gray-400 px-2 py-1 rounded-lg bg-blue-800 text-white hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Modal;
