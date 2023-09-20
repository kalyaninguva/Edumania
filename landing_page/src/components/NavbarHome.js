import React from "react";
import { Link } from "react-router-dom";

const NavbarHome = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/homepage">
          <i className="fas fa-code"></i> Edumania
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/school">SchoolSearch</Link>
        </li>

        <li>
          <Link to="/notice">Notices</Link>
        </li>
        <li>
          <Link to="/findSchools">Pay Fee</Link>
        </li>
        <li>
          <Link to="/token">See token</Link>
        </li>
        <li>
          <Link to="/logout">Log Out</Link>
        </li>
      </ul>
    </nav>
  );
};
export default NavbarHome;
