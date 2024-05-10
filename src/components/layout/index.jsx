import React from "react";
import { Header, Footer } from "../index";
import SocialMedia from "./SocialMedia";
import DotNavigation from "./DotNavigation";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="relative w-screen">
        {/* Section Social Media Links */}
        <SocialMedia />

        {/* Main Section */}
        {children}

        {/* Section Dots Navigations */}
        <DotNavigation />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
