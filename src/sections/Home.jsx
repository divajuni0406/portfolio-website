/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useRef } from "react";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import { BsArrowDownCircle, BsFillChatFill } from "react-icons/bs";
import { Button } from "@/components";
import { identity } from "@/constants/data";
import { ThemeContext } from "@/context/ThemeContext";
import {
  slideIn,
  staggerContainer,
  textVariants,
  zoomIn,
} from "@/utils/motion";

const Home = () => {
  const { theme, setActiveDots } = useContext(ThemeContext);

  const { name, division, description, picture } = identity;

  const homeRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setActiveDots("home");
        return;
      }
    });
    observer.observe(homeRef.current);
  }, [setActiveDots]);

  return (
    <section
      className="w-screen 2xl:h-screen h-full p-sectionPadding"
      id="home"
    >
      {/* Home Container */}
      <motion.div
        variants={staggerContainer}
        viewport={{ once: true, amount: 0.25 }}
        whileInView="show"
        initial="hidden"
        className="xl:max-w-sectionWidth  max-w-[62.5rem] mx-auto grid lg:grid-cols-2 grid-cols-1 pt-16"
      >
        {/* Home Text Info */}
        <motion.div
          variants={slideIn("left", "tween", 0.1, 1)}
          className="py-16 flex flex-col lg:items-start items-center lg:text-start text-center"
          ref={homeRef}
        >
          <motion.span
            variants={textVariants(1.1)}
            className={`${
              theme === "light" ? "text-[#777777]" : "text-[#a9afc3]"
            } font-semibold text-base`}
          >
            Hello I&apos;m
          </motion.span>
          <motion.h1
            variants={textVariants(1.2)}
            className={`${
              theme === "light" ? "text-primary" : "text-altPrimary"
            } font-semibold lg:text-[4rem] md:text-[2.8rem] text-[2.5rem] leading-[120%] mt-1 mb-4`}
          >
            {name}
          </motion.h1>
          <motion.h3
            variants={textVariants(1.3)}
            className={`${
              theme === "light" ? "text-black" : "text-white"
            } font-bold text-[22px] mb-6`}
          >
            <Typewriter
              options={{ strings: division, autoStart: true, loop: true }}
            />
          </motion.h3>
          <motion.p
            variants={textVariants(1.4)}
            className={`${
              theme === "light" ? "text-[#777777]" : "text-[#a9afc3]"
            } font-medium text-[16px] max-w-[350px] mb-8`}
          >
            {description[0]}
          </motion.p>
          <motion.div variants={zoomIn(1.5, 0.75)}>
            <Button
              href={"/#contact"}
              type="primary"
              size="normal"
              className="w-fit rounded-[10px] flex items-center gap-x-3"
            >
              Let's Talk
              <BsFillChatFill className="text-[20px]" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Home Image */}
        <motion.div
          variants={slideIn("right", "tween", 0.1, 1)}
          className="flex items-center justify-center w-full h-full"
        >
          <div className="lg:w-full lg:flex lg:justify-center w-72">
            <Image
              src={picture[0]}
              alt={"Personal Profile"}
              width={500}
              height={500}
              blurDataURL={picture[0]}
              className="object-cover"
              placeholder="blur"
              style={{
                maskImage: "url('/image/pngItem-profile.png')",
                maskRepeat: "no-repeat",
                maskSize: "120%",
                maskPosition: "-20px 10px",
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Home Scroll Down Button */}
      <motion.div
        variants={slideIn("up", "tween", 0.2, 1.1)}
        viewport={{ once: true }}
        whileInView="show"
        initial="hidden"
      >
        <Link
          href={"/#about"}
          scroll={false}
          className={`${
            theme === "light" ? "text-black" : "text-white"
          } inline-flex justify-center items-center gap-x-2 text-center w-full mt-16 font-medium text-[18px] animate-bounce`}
        >
          Scroll Down
          <BsArrowDownCircle
            className={`${
              theme === "light" ? "text-primary" : "text-altPrimary"
            } text-[24px]`}
          />
        </Link>
      </motion.div>
    </section>
  );
};

export default Home;

Home.activeDots = "home";
