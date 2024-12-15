import React from "react";

const MainBar = () => {
  return (
    <header className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-lg font-bold">Procard Admin Dashboard</h1>
      <div className="flex items-center space-x-4">
        <button className="text-blue-600">Profile</button>
        <button className="text-blue-600">Logout</button>
      </div>
    </header>
  );
};

export default MainBar;
