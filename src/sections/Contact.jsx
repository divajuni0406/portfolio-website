"use client";

import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import {
  SectionTitle,
  SectionSubtitle,
  SectionDescription,
} from "@/components";
import { contactCardList } from "@/constants/data";
import { ThemeContext } from "@/context/ThemeContext";
import { fadeIn, slideIn, staggerContainer } from "@/utils/motion";

const Contact = () => {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [subjectInput, setSubjectInput] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme, setActiveDots } = useContext(ThemeContext);

  const formRef = useRef(null);
  const contactRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setActiveDots("contact");
        return;
      }
    });
    observer.observe(contactRef.current);
  }, [setActiveDots]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const clearFormAfterSubmit = () => {
      setNameInput("");
      setEmailInput("");
      setSubjectInput("");
      setMessageInput("");
    };

    setLoading(true);
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        formRef.current,
        process.env.NEXT_PUBLIC_PUBLIC_KEY
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Your Message Is Successfully Sended!",
          timer: 2500,
        });
        setLoading(false);
        clearFormAfterSubmit();
      })
      .catch(() => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          timer: 2500,
        });
      });
  };

  return (
    <section className="p-sectionPadding pb-28" id="contact">
      {/* Contact Section Title */}
      <SectionTitle>Contact Me</SectionTitle>

      {/* Contact Section Container */}
      <motion.div
        variants={staggerContainer}
        viewport={{ once: true, amount: 0.25 }}
        whileInView="show"
        initial="hidden"
        className="xl:max-w-[71.875rem] lg:max-w-[62.5rem] lg:w-full w-[80%] mx-auto grid lg:grid-cols-[30%_60%] grid-cols-1 lg:gap-[10%] gap-16"
      >
        {/* Contact Section Card */}
        <motion.div
          variants={slideIn("left", "tween", 0, 1)}
          className="flex flex-col gap-y-8"
          ref={contactRef}
        >
          {/* Contact Section Card Subtitle & Description */}
          <div className="flex flex-col gap-y-2">
            <SectionSubtitle className="lg:text-[26px]">
              Let&apos;s discuss your project
            </SectionSubtitle>
            <SectionDescription className="font-medium">
              Just contact me with this media below
            </SectionDescription>
          </div>

          {/* Contact Section Card Content */}
          <div className="flex flex-col gap-y-5 lg:w-full w-[80%] lg:mx-0 mx-auto">
            {contactCardList.map(
              ({ ContactIcon, title, contact, href }, index) => (
                <Link href={href} key={index} target="_blank">
                  <motion.div
                    variants={fadeIn("up", "tween", index * 0.1, 1)}
                    className={`${
                      theme === "light"
                        ? "bg-white border-primary text-black"
                        : "bg-altSecondary border-altPrimary text-white"
                    } shadow-cardShadow p-5 rounded-md flex flex-col gap-y-3 items-center border-b-[2px] transition-all duration-300 hover:shadow-xl`}
                  >
                    <ContactIcon
                      className={`${
                        theme === "light" ? "text-primary" : "text-altPrimary"
                      } text-[22px]`}
                    />
                    <h4 className="font-semibold">{title}</h4>
                    <span
                      className={`${
                        theme === "light" ? "text-light" : "text-altLight"
                      } font-medium lg:text-[14px] text-[12px]`}
                    >
                      {contact}
                    </span>
                    <span
                      className={`${
                        theme === "light" ? "text-primary" : "text-altPrimary"
                      } font-normal text-[14px]`}
                    >
                      Send Me A Message
                    </span>
                  </motion.div>
                </Link>
              )
            )}
          </div>
        </motion.div>

        {/* Contact Section Form */}
        <motion.div
          variants={slideIn("right", "tween", 0, 1)}
          className="flex flex-col gap-y-8 h-full"
        >
          {/* Contact Section Form Subtitle & Description */}
          <div className="flex flex-col gap-y-2">
            <SectionSubtitle className="lg:text-[26px]">
              Feel free to contact me
            </SectionSubtitle>
            <SectionDescription className="font-medium">
              I&apos;am always open to discussing for any opportunities you
              offer
            </SectionDescription>
          </div>

          {/* Contact Section Form Input */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-y-5"
          >
            <div className="w-full">
              <input
                value={nameInput}
                onChange={({ target: { value } }) => setNameInput(value)}
                className={`${
                  theme === "light"
                    ? "text-black border-primary placeholder:text-primary focus:bg-white"
                    : "text-white border-altPrimary placeholder:text-altPrimary focus:bg-altSecondary"
                } p-6 w-full rounded-lg bg-primary/10 border-[2px] placeholder:font-medium focus:outline-none`}
                type="text"
                name="username"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <input
                value={emailInput}
                onChange={({ target: { value } }) => setEmailInput(value)}
                className={`${
                  theme === "light"
                    ? "text-black border-primary placeholder:text-primary focus:bg-white"
                    : "text-white border-altPrimary placeholder:text-altPrimary focus:bg-altSecondary"
                } p-6 w-[48%] rounded-lg bg-primary/10 border-[2px] placeholder:font-medium focus:outline-none`}
                type="email"
                name="email"
                placeholder="Your Email"
                required
              />
              <input
                value={subjectInput}
                onChange={({ target: { value } }) => setSubjectInput(value)}
                className={`${
                  theme === "light"
                    ? "text-black border-primary placeholder:text-primary focus:bg-white"
                    : "text-white border-altPrimary placeholder:text-altPrimary focus:bg-altSecondary"
                } p-6 w-[48%] rounded-lg bg-primary/10 border-[2px] placeholder:font-medium focus:outline-none`}
                type="text"
                name="subject"
                placeholder="Your Subject"
              />
            </div>
            <div>
              <textarea
                value={messageInput}
                onChange={({ target: { value } }) => setMessageInput(value)}
                className={`${
                  theme === "light"
                    ? "border-primary text-black placeholder:text-primary focus:bg-white"
                    : "border-altPrimary text-white placeholder:text-altPrimary focus:bg-altSecondary"
                } p-6 w-full h-[16.5rem] resize-none rounded-lg bg-primary/10 border-[2px] placeholder:font-medium focus:outline-none`}
                name="message"
                placeholder="Your Message"
                required
              />
            </div>
            <button
              type="submit"
              className={`${
                theme === "light"
                  ? "bg-primary hover:border-primary hover:text-primary"
                  : "bg-altPrimary hover:border-altPrimary hover:text-altPrimary"
              } w-fit flex items-center gap-x-3 px-6 py-3 shadow-lg bg-primary rounded-md border-[1.5px] border-transparent text-white font-medium transition-all duration-300 hover:bg-transparent`}
            >
              {loading ? (
                <div className="flex item-center space-x-2">
                  <svg
                    aria-hidden="true"
                    class={`inline w-6 h-6 ${
                      theme === "light"
                        ? "text-gray-200 fill-gray-600"
                        : "text-gray-600 fill-gray-300"
                    }  animate-spin`}
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <h3>Processing</h3>
                </div>
              ) : (
                <div className="flex items-center space-x-1">
                  <h3>Send Message</h3>
                  <FaPaperPlane />
                </div>
              )}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
