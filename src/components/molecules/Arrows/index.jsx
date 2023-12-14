import React from "react";

const arrowStyle = {
  position: "absolute",
  top: "50%",
  display: "block",
  transform: "translateY(-50%)",
  fontSize: "40px",
  cursor: "pointer",
  color: "white",
  zIndex: 20,
};

const CustomPrevArrow = ({ className, onClick }) => (
  <div
    className={className}
    style={{ ...arrowStyle, left: 12 }}
    onClick={onClick}
  ></div>
);

const CustomNextArrow = ({ className, onClick }) => (
  <div
    className={className}
    style={{ ...arrowStyle, right: 12 }}
    onClick={onClick}
  ></div>
);

export { CustomPrevArrow, CustomNextArrow };
