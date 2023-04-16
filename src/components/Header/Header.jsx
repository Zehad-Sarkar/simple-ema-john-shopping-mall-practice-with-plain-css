import React, { useContext } from "react";
import logo from "../../images/Logo.svg";
import { Link } from "react-router-dom";
import "../../App.css";
import { AuthContext } from "../Providers/AuthProviders";

const Header = () => {
  const { user, logOut } = useContext(AuthContext)
  const handleSignOut = () => {
    logOut()
  }
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
        <p>{user && <span>welcome {user.email} <button onClick={handleSignOut}>Sign Out</button></span>}</p>
      </div>
    </div>
  );
};

export default Header;
