import React, { useState, useEffect, useRef } from "react";
import { CgSearch } from "react-icons/cg";

const NavBar = () => {
  const [searchText, setSearchText] = useState("");
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const popoverRef = useRef(null);

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

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="navbar flex justify-between m-4 items-center">
      <img
        className="h-[35px] "
        src="https://www.cresolinfoserv.com/static/e1bd846383d17f597aa26998e4e51991/b06b5/logo.avif"
        alt="Logo"
      />
      <div className="search-container relative">
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          className="search h-[40px] w-[600px] border border-2 rounded-md pl-2"
          placeholder="Search"
        />
        <CgSearch className="search-icon absolute right-2 top-3 text-gray-500" />
      </div>
      <div
        className="user-info cursor-pointer relative"
        onClick={handlePopoverToggle}
        ref={popoverRef}
      >
        <img
          className="h-[35px] mr-14"
          src="https://assets-in.bmscdn.com/static/2023/10/default-pic.png"
          alt="User"
        />
        {isPopoverVisible && (
          <div className="popover absolute bg-white right-[5%] shadow-md mt-2">
            <ul className="p-4 border border-lg w-[150px] text-center flex flex-col gap-1">
              <li className="border border-1 rounded-lg p-1 hover:bg-blue-200">
                Your Booking
              </li>
              <li className="border border-1 rounded-lg p-1 hover:bg-blue-100">
                Sign Out
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
