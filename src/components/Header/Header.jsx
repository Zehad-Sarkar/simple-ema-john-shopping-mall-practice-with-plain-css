import React from "react";
import logo from "../../images/Logo.svg";
import { Link } from "react-router-dom";
import "../../App.css";

const Header = () => {
  return (
    <div className="header">
      <div className="">
        <a href="">
          <img src={logo} alt="" />
        </a>
      </div>
      <div className="">
        <Link to="/">Shop</Link>
        <Link to="/order">Order</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Header;
