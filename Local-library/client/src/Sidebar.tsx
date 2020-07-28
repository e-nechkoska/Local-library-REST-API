import React from "react";
import "./Sidebar.css";
import { Link } from "@reach/router";

const Sidebar = () => {
  return (
    <>
      <ul className="sidebar">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/books">All books</Link>
        </li>
        <li>
          <Link to="/authors">All authors</Link>
        </li>
        <li>
          <Link to="/genres">All genres</Link>
        </li>
        <li>
          <Link to="/bookinstances">All book-instances</Link>
        </li>
        <hr></hr>
        <li>
          <Link to="/authors">Create new author</Link>
        </li>
        <li>
          <Link to="/genres">Create new genre</Link>
        </li>
        <li>
          <Link to="/books">Create new book</Link>
        </li>
        <li>
          <Link to="/bookinstances">Create new book-instance</Link>
        </li>
      </ul>
    </>
  );
};

export default Sidebar;
