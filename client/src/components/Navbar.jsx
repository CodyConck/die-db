import { Navbar, NavbarBrand } from "reactstrap";
import { Link } from "react-router-dom";
// import React from 'react'

const Nav = () => {
  return (
    <Navbar className="my-2" color="dark" dark>
      <NavbarBrand href="/"></NavbarBrand>
      <Link to="/">Home</Link>
      <Link to="sign-in">Sign-In</Link>
      <Link to="toolslist">Tools List</Link>
      <Link to="newtool">New Tools</Link>
      <Link to="edittool">Edit Tools</Link>
    </Navbar>
  );
};

export default Nav;
