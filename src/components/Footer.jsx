import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { identity, linkList, socialMediaList } from "@/constants/data";
import { ThemeContext } from "@/context/ThemeContext";
import { fadeIn, staggerContainer, textVariants } from "@/utils/motion";

export default function Footer() {
  const {
    setIsDotsRect,
    setIsSocialMediaRect,
    isDotsRect,
    isSocialMediaRect,
    theme,
  } = useContext(ThemeContext);
  const footerRef = useRef();

  const { name, division } = identity;

  useEffect(() => {
    const handleScroll = () => {
      const { top } = footerRef.current.getBoundingClientRect();
      const topFixed = top.toFixed();

      // Dots Layout Condition
      if (topFixed < 510) {
        setIsDotsRect(true);
      }
      if (isDotsRect && topFixed > 511) {
        setIsDotsRect(false);
      }

      // SocialMedia Layout Condition
      if (topFixed < 908) {
        setIsSocialMediaRect(true);
      }
      if (isSocialMediaRect && topFixed > 909) {
        setIsSocialMediaRect(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setIsDotsRect, setIsSocialMediaRect, isDotsRect, isSocialMediaRect]);

  return (
    <motion.footer
      ref={footerRef}
      variants={staggerContainer}
      viewport={{ once: true }}
      whileInView="show"
      initial="hidden"
      className={`${
        theme === "light" ? "bg-primary" : "bg-altPrimary"
      } py-16 w-full text-white text-center flex flex-col items-center gap-y-16 transition-all duration-300`}
    >
      {/* Footer Logo Name */}
      <div className="flex flex-col gap-y-4">
        <motion.h3
          variants={textVariants(1)}
          className="text-white font-semibold text-[2rem] tracking-wide"
        >
          {name}
        </motion.h3>
        <motion.h4
          variants={textVariants(1.1)}
          className="text-white font-medium text-[1.4rem]"
        >
          {division[0]}
        </motion.h4>
      </div>

      {/* Footer Link List */}
      <div className="flex flex-wrap lg:flex-row flex-col lg:gap-y-0 gap-y-8 gap-x-8">
        {linkList.map(({ title, href }, index) => (
          <Link
            href={`/#${href}`}
            key={index}
            scroll={false}
            className={`${
              theme === "light" ? "hover:text-light" : "hover:text-altLight"
            } font-normal transition-all`}
          >
            <motion.div variants={fadeIn("up", "tween", index * 0.1, 1.2)}>
              {title}
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Footer Social Media List */}
      <div className="flex gap-x-6 ">
        {socialMediaList.map(({ SocialMediaIcon, href }, index) => (
          <Link href={href} target="_blank" key={index}>
            <motion.div
              variants={fadeIn("up", "tween", index * 0.1, 1.2)}
              className={`${
                theme === "light" ? "text-primary" : "text-altPrimary"
              } p-3 bg-white rounded-xl flex shadow-sm border border-transparent transition-all duration-300 hover:border-white hover:bg-transparent hover:text-white`}
            >
              <SocialMediaIcon />
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Footer Copyright */}
      <motion.span
        variants={textVariants(1.3)}
        className="text-white font-normal text-[13px]"
      >
        © 2022 Created by Diva Juni Artha. All right reserved
      </motion.span>
    </motion.footer>
  );
}
