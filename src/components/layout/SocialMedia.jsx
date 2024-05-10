import React, { useContext } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { socialMediaList } from "@/constants/data";
import { fadeIn, staggerContainer } from "@/utils/motion";
import { ThemeContext } from "@/context/ThemeContext";

const SocialMedia = () => {
  const { theme, isSocialMediaRect } = useContext(ThemeContext);

  return (
    <motion.div
      variants={staggerContainer}
      viewport={{ once: true, amount: 0.25 }}
      whileInView="show"
      initial="hidden"
      className={`${
        isSocialMediaRect ? "absolute bottom-6 left-6" : "fixed bottom-6 left-6"
      }  flex-col gap-y-3 lg:flex hidden z-10`}
    >
      {socialMediaList.map(({ href, SocialMediaIcon }, index) => (
        <Link
          href={href}
          key={index}
          target="_blank"
          className="transition-all duration-300 hover:-translate-y-1"
        >
          <motion.div
            variants={fadeIn("right", "tween", index * 0.1, 0.85)}
            className={`${
              theme === "light" ? "text-primary" : "text-altPrimary"
            } shadow-lg rounded-full p-3`}
          >
            <SocialMediaIcon />
          </motion.div>
        </Link>
      ))}
    </motion.div>
  );
};

export default SocialMedia;
