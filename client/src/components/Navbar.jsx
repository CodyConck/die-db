import { Navbar, NavbarBrand } from "reactstrap";
import { Link } from "react-router-dom";
// import React from 'react'

console.log(Navbar);

const Nav = () => {
  return (
    <Navbar className="my-2" color="dark" dark>
      <NavbarBrand href="/"></NavbarBrand>
      <Link to="sign-in">Sign-In</Link>
      <Link to="edittool">Edit Tools</Link>
      <Link to="newtool">New Tools</Link>
      <Link to="toolslist">Tools List</Link>
      <Link to="/">Home</Link>
    </Navbar>
  );
};

export default Nav;