import React, { useEffect, useState } from "react";
import "../css/slider.css";
const ButtonUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  return (
    <>
      {isVisible && (
        <button
          id="scroll-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          {" "}
          <i className="fa fa-thin fa-arrow-up" />
        </button>
      )}
    </>
  );
};

export default ButtonUp;
