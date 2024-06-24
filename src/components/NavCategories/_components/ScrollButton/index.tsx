import React from "react";
import { Button } from "../../../ui/button";

interface ScrollButtonProps {
  onClick: () => void;
  direction: "left" | "right";
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ onClick, direction }) => {
  return (
    <Button
      onClick={onClick}
      className={`rounded-full h-8 hover:bg-light-6 transition-all hover:scale-110 w-8 bg-transparent shadow-none absolute ${
        direction === "left" ? "left-[15px]" : "right-[15px]"
      } top-1/2 -translate-y-1/2 z-10`}
    >
      <i
        className={`_icon-right-arrow ${
          direction === "left" ? "rotate-180" : ""
        } text-dark-1 font-bold text-lg`}
      ></i>
    </Button>
  );
};

export default ScrollButton;
