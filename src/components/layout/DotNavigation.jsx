import React, { useContext } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { fadeIn, staggerContainer } from "@/utils/motion";
import { ThemeContext } from "@/context/ThemeContext";
import { linkList } from "@/constants/data";

const DotNavigation = () => {
  const { theme, activeDots, isDotsRect } = useContext(ThemeContext);

  return (
    <motion.div
      variants={staggerContainer}
      viewport={{ once: true }}
      whileInView="show"
      initial="hidden"
      className={` ${
        isDotsRect ? "absolute bottom-[60px]" : "fixed bottom-[50%]"
      } right-6 translate-y-[50%] lg:flex hidden flex-col gap-y-2 z-10`}
    >
      {linkList.map(({ href }, index) => (
        <Link href={`/#${href}`} key={index} scroll={false}>
          <motion.div
            variants={fadeIn("left", "tween", 0.2, 0.5)}
            className={`
          ${
            theme === "light" && href === activeDots
              ? "bg-primary"
              : theme === "dark" && href === activeDots
              ? "bg-altPrimary"
              : theme === "light" && href !== activeDots
              ? "bg-light"
              : theme === "dark" && href !== activeDots
              ? "bg-altLight"
              : ""
          } 
            h-2 w-2 rounded-full
          `}
          />
        </Link>
      ))}
    </motion.div>
  );
};

export default DotNavigation;
