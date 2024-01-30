import React from "react";
import Modal from "./Modal";
const Register = ({isOpen, closeModal}) => {
  return (
    <div className="modal">
      {isOpen && <Modal pageName="Register Form" closeModal={closeModal} />}
    </div>
  );
};

export default Register;
