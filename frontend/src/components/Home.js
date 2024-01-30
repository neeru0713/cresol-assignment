import React from 'react'

export const Home = () => {
    const columnData = ["Column 1", "Column 2", "Column 3", "Column 4"];

  return (
    <div className="home">
      <div className="grid-container mt-10 p-4">
        {columnData.map((item, index) => (
          <div key={index} className="grid-item">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
export default Home;