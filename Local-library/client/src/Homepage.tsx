import React from "react";
import Header from "./shared/Header";
import Sidebar from "./Sidebar";

const Homepage = () => {
  return (
    <>
      <Header value="Local Library Home" />
      <p className="welcomeMessage">Welcome to our Local library.</p>
      <Sidebar />
    </>
  );
};

export default Homepage;
