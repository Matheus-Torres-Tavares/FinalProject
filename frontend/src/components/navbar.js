import React, { Component } from "react";

import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <div className="bodytext">
      <nav>
        <Link to="/" className="navbar-brand">
          Coderlink
        </Link>
        <div>
          <ul className="navbar-nav mr-auto">
            <li>
              <Link to="/" class="links">
                Posts
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="create" class="links">
                Create a Post
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/user" class="links">
                Create User
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
