import React, { useState, useContext } from "react";
import Modal from "./Modal";
import { API_URL } from "../config/config";
import { UserContext } from "../App";
const Register = ({ isOpen, closeModal }) => {
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    city: "",
    role: "attendee",
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

  const handleRegister = async () => {
    const url = `${API_URL}/api/users/register`;

    if (validateForm()) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.status !== 201) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const userObj = {
          ...data?.user,
          token: data?.token,
        };
        localStorage.setItem("cresol_user", JSON.stringify(userObj));
        setUser(userObj);

        closeModal();
      } catch (error) {
        console.error("Error during API call:", error.message);
      }
    }
  };
  return (
    <div className="modal">
      {isOpen && (
        <Modal
          pageName="Register Form"
          closeModal={closeModal}
          handleRegister={handleRegister}
          setFormData={setFormData}
          errors={errors}
          formData={formData}
        />
      )}
    </div>
  );
};

export default Register;
