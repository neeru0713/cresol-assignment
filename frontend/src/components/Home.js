import React, { useState, useEffect, useRef } from "react";
import { API_URL } from "../config/config";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
export const Home = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    city: "",
    genre: "",
    maxPrice: "",
  });
  const {state} = useLocation()
  
  const navigate = useNavigate();
  const timeoutIdRef = useRef(null);

  function debounce(func, delay) {
  
    return function (...args) {
      clearTimeout(timeoutIdRef.current);
  
      timeoutIdRef.current = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }
  

  useEffect(()=>{
    if(state!==null){
      debouncedFetchData(state)
    } else {
      fetchEvents();
    }
   
  }, [state])

  const fetchEvents = async () => {
    try {
      let url = `${API_URL}/api/events?`;

      const filteredUrl = new URL(url);
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          filteredUrl.searchParams.append(key, value);
        }
      });

      const response = await fetch(filteredUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      setEvents(jsonResponse);
    } catch (error) {
      console.error("Error during API call:", error.message);
    }
  };

  const fetchEventsBasedOnSearch = async (searchQuery) => {
    try {
      let url = `${API_URL}/api/events/search?q=${searchQuery}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      setEvents(jsonResponse);
    } catch (error) {
      console.error("Error during API call:", error.message);
    }
  };

  const debouncedFetchData = debounce(fetchEventsBasedOnSearch, 500);

  useEffect(() => {
    if(!state){
      fetchEvents();
    }

    return () => {
      clearTimeout(timeoutIdRef.current);
    };
    
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const handleFetchResults = () => {
    fetchEvents();
  };

  const handleNavigation = (item) => {
    console.log(item);
      navigate(`/${item.title}/details`, { state: item } );
  };

  return (
    <div className="home flex flex-row gap-2">
      <div className="flex flex-col gap-5 m-2 filters w-[20%] border border-1 rounded-lg border-gray-300 p-8">
        <h1 className="font-semibold text-2xl">Filters</h1>
        <input
          type="text"
          placeholder="City"
          value={filters.city}
          onChange={(e) => handleFilterChange("city", e.target.value)}
        />
        <input
          type="text"
          placeholder="Genre"
          value={filters.genre}
          onChange={(e) => handleFilterChange("genre", e.target.value)}
        />
        <input
          type="text"
          placeholder="Max Price in INR"
          value={filters.maxPrice}
          onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
        />

        <button
          onClick={handleFetchResults}
          className="border font-semibold border-1  rounded-lg bg-[#ee5537] hover:bg-[#ef5821] text-white p-2"
        >
          Apply Filters
        </button>
      </div>
      <div className="grid-container mt-10 p-4 w-[80%]">
        {events.map((item, index) => (
          <div
            onClick={() => {
              handleNavigation(item);
            }}
            key={index}
            className="flex flex-col grid-item bg-[#f8f8f8] rounded-lg"
          >
            <img src={item.image} alt={item.title} className="rounded-lg"/>
            <div>{item.title}</div>
            <div>{item.description.substr(0, 40)}</div>
            <div>{item.organizerName}</div>
            <div>INR {item.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
