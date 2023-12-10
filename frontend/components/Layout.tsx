import React from "react";
import Meta from "./Meta";
import { NavbarMdUp, NavbarSmUp } from "./NavBar/index";

const Layout = ({ children }) => {
  const isBrowser = typeof window !== "undefined";

  return (
    <>
      <Meta />
      {isBrowser && window.location.pathname === "/" && <NavbarMdUp />}
      {isBrowser && window.location.pathname === "/" && <NavbarSmUp />}
      <main>{children}</main>
      <footer className="mb-10"></footer>
    </>
  );
};

export default Layout;
