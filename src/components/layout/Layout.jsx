import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Navbar from "../Navbar";
import LiveMatches from "../liveMatches/LiveMatches";

const Layout = () => {
  return (
    <div>
      <LiveMatches />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
