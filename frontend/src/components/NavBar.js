import React, { useState, useEffect, useRef, useContext } from "react";
import { CgSearch } from "react-icons/cg";
import Register from "./Register";
import { Link } from "react-router-dom";
import { SlBell } from "react-icons/sl";
import { UserContext } from "../App";

const NavBar = () => {
  const [searchText, setSearchText] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [isPopoverVisible, setPopoverVisible] = useState(false);
  const [isClickedBell, setIsClickedBell] = useState(false);
  const [notification, setNotification] = useState([])
  const { user } = useContext(UserContext);
  const popoverRef = useRef(null);
const popoverRef1 = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setPopoverVisible(false);
      }

       if (popoverRef1.current && !popoverRef1.current.contains(event.target)) {
         setIsClickedBell(false);
      }
      
      };
      const handleClickOutside1 = (event) => {
        if (popoverRef1.current && !popoverRef1.current.contains(event.target)) {
          setIsClickedBell(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.example.com/data");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setNotification(result);
        
      } catch (error) {
        console.error("Error fetching data:", error.message);
       
      }
    };

    fetchData();
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
    
    const handleClickBell = () => {
      setIsClickedBell(!isClickedBell);  
    }
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
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
          <div className="relative">
            <SlBell
              className="text-lg cursor-pointer"
              onClick={handleClickBell}
              ref={popoverRef1}
            />
            {isClickedBell && (
              <div className="bell-popover rounded-lg absolute bg-white shadow-md top-[45px] left-[-30px]">
                <ul className="p-4 border border-gray-300 rounded-lg border-lg w-[150px] text-center flex flex-col">
                  {notification.map((notification, index) => (
                    <li
                      key={index}
                      className="rounded-lg p-1 hover:bg-blue-100"
                    >
                      {notification.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
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
            <span>Hi, {user?.name || "Guest"}</span>
            {isPopoverVisible && (
              <div className="popover rounded-lg absolute bg-white right-0 shadow-md top-10">
                {/* Content of the user icon popover */}
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
                    <li className="rounded-lg p-1 hover:bg-blue-100">
                      Manage Events
                    </li>
                  )}
                  <li className="rounded-lg p-1 hover:bg-blue-100">
                    My Bookings
                  </li>
                  {user && (
                    <li className="rounded-lg p-1 hover:bg-blue-100">
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
