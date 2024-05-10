import React, { createContext, useState } from "react";

export const ThemeContext = createContext({
  theme: "light",
  activeDots: "home",
  isModalOpen: false,
  isSocialMediaRect: false,
  isDotsRect: false,
  setTheme: () => "light",
  setActiveDots: () => "home",
  setActiveNavs: () => "home",
  setIsModalOpen: () => false,
  setIsSocialMediaRect: () => false,
  setIsDotsRect: () => false,
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [activeDots, setActiveDots] = useState("home");
  const [activeNavs, setActiveNavs] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSocialMediaRect, setIsSocialMediaRect] = useState(false);
  const [isDotsRect, setIsDotsRect] = useState(false);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        activeDots,
        activeNavs,
        isModalOpen,
        isSocialMediaRect,
        isDotsRect,
        setActiveDots,
        setActiveNavs,
        setIsModalOpen,
        setIsSocialMediaRect,
        setIsDotsRect,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
