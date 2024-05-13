"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  SectionTitle,
  SectionSubtitle,
  SectionDescription,
  Button,
  Modal,
} from "@/components";
import { portfolioList } from "@/constants/data";
import { ThemeContext } from "@/context/ThemeContext";
import { SectionWrapper } from "@/components/wrapper";
import { fadeIn, staggerContainer } from "@/utils/motion";

const Portofolio = () => {
  const [openModal, setOpenModal] = useState({
    isOpen: false,
    selectedModal: null,
  });
  const { theme, isModalOpen, setActiveDots, setIsModalOpen } =
    useContext(ThemeContext);

  const portofolioRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setActiveDots("portfolio");
        return;
      }
    });
    observer.observe(portofolioRef.current);
  }, [setActiveDots]);

  const handleOpenModal = (index) => {
    setOpenModal({ isOpen: true, selectedModal: index });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setOpenModal({ isOpen: false, selectedModal: null });
    setIsModalOpen(false);
  };

  const handleRenderModal = () => {
    const { isOpen, selectedModal } = openModal;

    if (selectedModal !== null) {
      const { title, tech, role, img, description } =
        portfolioList[selectedModal];

      return (
        <Modal
          isOpen={isOpen}
          closeModal={handleCloseModal}
          title={title}
          tech={tech}
          img={img[1]}
          description={description}
          role={role}
        />
      );
    }
  };

  const truncateString = (string) => {
    const stringLimit = 75;

    if (string.length > stringLimit) {
      return string.slice(0, stringLimit) + "...";
    }

    return string;
  };

  return (
    <section className="p-sectionPadding" id="portfolio">
      {/* Portfolio Section Title */}
      <SectionTitle>Portfolio</SectionTitle>

      {/* Portfolio Section Container */}
      <motion.div
        variants={staggerContainer}
        viewport={{ once: true }}
        whileInView="show"
        initial="hidden"
        className="xl:max-w-sectionWidth max-w-[62.5rem] mx-auto"
      >
        {/* Portfolio Section Subtitle & Description */}
        <SectionSubtitle>Projects I&apos;ve created:</SectionSubtitle>
        <SectionDescription>
          I&apos;ve created a few projects while learning and working
          professionally in frontend development, which I will explain below.
        </SectionDescription>

        {/* Portfolio Section Content */}
        <motion.div
          variants={fadeIn("right", "tween", 0, 1)}
          className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:w-full w-[80%] lg:mx-0 mx-auto gap-10 mt-16"
          ref={portofolioRef}
        >
          {portfolioList.map(
            (
              {
                title,
                tech,
                role,
                img,
                description,
                link,
                isPrivate,
                textRedirect,
              },
              index
            ) => (
              <motion.div
                variants={fadeIn("up", "tween", index * 0.1, 1)}
                key={index}
                className={`${
                  theme === "light"
                    ? "bg-white hover:border-primary text-black"
                    : "bg-altSecondary hover:border-altPrimary text-white border-transparent"
                } p-5 shadow-cardShadow flex flex-col gap-y-4 rounded-lg border-[1.5px] transition-all duration-300 group`}
              >
                <div
                  className={`${
                    theme === "light" ? "" : "border-altLight"
                  } overflow-hidden rounded-xl h-[250px] border-[3px]`}
                >
                  <img
                    src={img[0]}
                    alt="Portfolio Banner"
                    className="h-full w-full object-cover rounded-[9px] transition-all duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <h3 className="font-semibold xl:text-[1.2em] lg:text-[1.1em] text-[1em]">
                    {title}
                  </h3>
                  <h4
                    className={`${"text-light"} font-medium xl:text-[1em] text-[0.85em]`}
                  >
                    {role}
                  </h4>
                  <h4
                    className={`${"text-light"} font-medium xl:text-[1em] text-[0.85em]`}
                  >
                    {tech}
                  </h4>
                  <p className="font-normal text-[0.9em]">
                    {truncateString(description)}
                  </p>
                </div>
                <div className="flex items-center gap-x-5 xl:max-w-[85%] w-full mt-4">
                  <Button
                    href={"/"}
                    onClick={() => handleOpenModal(index)}
                    type="primary"
                    size="small"
                    className="rounded-md font-medium text-center"
                  >
                    View More
                  </Button>
                  <Button
                    href={link}
                    blankTargetPage={true}
                    disabled={isPrivate}
                    type={`${isPrivate ? "" : "outline-primary"}`}
                    size="small"
                    className="rounded-md font-medium text-center"
                  >
                    {textRedirect}
                  </Button>
                </div>
              </motion.div>
            )
          )}
        </motion.div>

        {/* Portfolio Modal Render */}
        <React.Fragment>{handleRenderModal()}</React.Fragment>

        {/* View All Portfolio Button */}
        {/* <motion.div
          variants={fadeIn("up", "tween", 1.25, 0.5)}
          className="flex justify-center items-center w-full mt-10"
        >
          <Button
            href={"/portfolio"}
            scroll={true}
            type="primary"
            size="normal"
            className="rounded-md shadow-lg"
          >
            View All Projects
          </Button>
        </motion.div> */}
      </motion.div>
    </section>
  );
};

export default Portofolio;
