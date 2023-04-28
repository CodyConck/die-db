import { Navbar, NavbarBrand } from "reactstrap";
// import { Link } from "react-router-dom";
// import React from 'react'

const Nav = () => {
  return (
    <Navbar className="my-2" color="dark" dark>
      <NavbarBrand href="/">
        {/* <Link to="/">Home</Link> */}
        {/* <Link to="sign-in">Sign-In</Link>
        <Link to="edittools">Edit Tools</Link>
        <Link to="newtools">New Tools</Link>
        <Link to="toolslist">Tools List</Link> */}
      </NavbarBrand>
    </Navbar>
  );
};

export default Nav;
