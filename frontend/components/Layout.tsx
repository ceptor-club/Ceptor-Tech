import React from "react";
import Meta from "./Meta";
import { NavbarMdUp, NavbarSmUp } from "./NavBar/index";

const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <NavbarMdUp />
      <NavbarSmUp />
      <main>{children}</main>
    </>
  );
};

export default Layout;
