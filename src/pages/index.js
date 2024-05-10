import React, { useContext, useEffect } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import {
  Home,
  About,
  Experiences,
  Works,
  Portfolio,
  GetInTouch,
  Contact,
} from "@/sections";

export default function MainPage() {
  const { theme, isModalOpen } = useContext(ThemeContext);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isModalOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }

    // Cleanup function
    return () => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "auto";
      }
    };
  }, [isModalOpen]);

  return (
    <React.Fragment>
      <main
        className={`${
          theme === "light" ? "bg-[#fefefe] light" : "bg-[#0e1b31] dark"
        } overflow-hidden transition-all duration-300`}
      >
        <Home />
        <About />
        <Experiences />
        <Works />
        {/* <Services /> */}
        <Portfolio />
        <GetInTouch />
        {/* <Article /> */}
        <Contact />
      </main>
    </React.Fragment>
  );
}
