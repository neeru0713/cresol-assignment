import React, { useState, useEffect, useRef, useContext } from "react";
import { CgSearch } from "react-icons/cg";
import Register from "./Register";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
const NavBar = () => {
  const [searchText, setSearchText] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const popoverRef = useRef(null);
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('cresol_user')
    setUser(null)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setPopoverVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePopoverToggle = () => {
    setPopoverVisible(!isPopoverVisible);
  };

  const closeModal = () => {
    setShowRegisterModal(false);
  };

  const openModal = () => {
    setShowRegisterModal(true);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    navigate(`/`, {state: e.target.value})
  };

  return (
    <>
      <div className="navbar flex justify-between px-2 py-3 items-center bg-[#F8F8F8]">
        <Link to="/">
          {" "}
          <img
            className="h-[40px] ml-10"
            src="https://www.cresolinfoserv.com/static/e1bd846383d17f597aa26998e4e51991/b06b5/logo.avif"
            alt="Logo"
          />
        </Link>
        <div className="search-container relative">
          <input
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            className="search h-[40px] w-[600px] border border-2 border-gray-300 rounded-md pl-2"
            placeholder="Search"
          />
          <CgSearch className="search-icon absolute right-2 top-3 text-gray-500" />
        </div>

        <div className="flex justify-between gap-6 items-center">
          <Link to="/createevent">
            <button className="font-medium border border-gray-400 px-3 py-1 rounded-lg text-white bg-blue-800 hover:bg-blue-600">
              Create Event
            </button>
          </Link>
          <div
            className="user-info cursor-pointer relative flex items-center mr-14 gap-2"
            onClick={handlePopoverToggle}
            ref={popoverRef}
          >
            <img
              className="h-[35px] rounded-full"
              src="https://assets-in.bmscdn.com/static/2023/10/default-pic.png"
              alt="User"
            />
            <span>{user?.name || "Guest"}</span>
            {isPopoverVisible && (
              <div className="popover rounded-lg absolute bg-white right-0 shadow-md top-10">
                <ul className="p-4 border border-gray-300 rounded-lg border-lg w-[150px] text-center flex flex-col">
                  {!user && (
                    <li
                      onClick={openModal}
                      className="rounded-lg p-1 hover:bg-blue-100"
                    >
                      Sign Up
                    </li>
                  )}
                  
                  {user && user.role === "organizer" && (
                    <Link to="/manageevent">
                    <li className="rounded-lg p-1 hover:bg-blue-100">
                      Manage Events
                    </li>
                    </Link>
                  )}
                 

                  <li className="rounded-lg p-1 hover:bg-blue-100">
                    My Bookings
                  </li>
                  {user && (
                    <li 
                    onClick={logout}
                    className="rounded-lg p-1 hover:bg-blue-100">
                      Sign Out
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <Register isOpen={showRegisterModal} closeModal={closeModal} />
    </>
  );
};

export default NavBar;
