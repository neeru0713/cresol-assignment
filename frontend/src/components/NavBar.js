import React, { useState } from "react";
import { CgSearch } from "react-icons/cg";

const NavBar = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="navbar flex justify-between m-4 item-center">
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
      <div className="user-info">
        <img
          className="h-[35px]"
          src="https://assets-in.bmscdn.com/static/2023/10/default-pic.png"
          alt="User"
        />
      </div>
    </div>
  );
};

export default NavBar;
