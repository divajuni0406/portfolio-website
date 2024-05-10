// ScrollPage.js

import { useEffect, useState } from "react";

const Test = () => {
  const [fixedContentTop, setFixedContentTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const fixedContent = document.getElementById("fixed-content");
      const scrollingContent = document.getElementById("scrolling-content");

      const fixedContentRect = fixedContent.getBoundingClientRect();
      const scrollingContentRect = scrollingContent.getBoundingClientRect();

      if (fixedContentRect.bottom >= scrollingContentRect.top) {
        setFixedContentTop(scrollingContentRect.top - fixedContentRect.height);
      } else {
        setFixedContentTop(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-screen">
      <div
        id="fixed-content"
        className="fixed left-0 top-0 w-40 bg-black"
        style={{ top: fixedContentTop }}
      >
        dssdsdsds dssdsdsds dssdsdsds dssdsdsds dssdsdsds dssdsdsds dssdsdsds
        dssdsdsds dssdsdsds dssdsdsds dssdsdsds dssdsdsds dssdsdsds dssdsdsds
        dssdsdsds dssdsdsds dssdsdsds dssdsdsds dssdsdsds dssdsdsds dssdsdsds
        dssdsdsds
      </div>
      <div id="scrolling-content" className="ml-48">
        dsdsdsds dsdsdsds dsdsdsds dsdsdsds dsdsdsds dsdsdsds dsdsdsds dsdsdsds
        dsdsdsds dsdsdsds dsdsdsds dsdsdsds dsdsdsds dsdsdsds dsdsdsds dsdsdsds
        dsdsdsds dsdsdsds dsdsdsds dsdsdsds dsdsdsds dsdsdsds dsdsdsds dsdsdsds
        dsdsdsds dsdsdsds dsdsdsds dsdsdsds dsdsdsds
      </div>
    </div>
  );
};
Test.getLayout = (page) => <>{page}</>;
export default Test;
