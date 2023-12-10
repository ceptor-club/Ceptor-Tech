import React from "react";
import Meta from "./Meta";
import { NavbarMdUp, NavbarSmUp } from "./NavBar/index";

const Layout = ({ children }) => {
  const isHomePage = window.location.pathname === "/";

  return (
    <>
      <Meta />
      {!isHomePage && <NavbarMdUp />}
      {!isHomePage && <NavbarSmUp />}
      <main>{children}</main>
      <footer className="mb-10"></footer>
    </>
  );
};

export default Layout;
