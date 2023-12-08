// CustomArrows.js
import React from "react";

const arrowStyle = {
  position: "absolute",
  top: "50%",
  display: "block",
  transform: "translateY(-50%)",
  fontSize: "40px", // Sesuaikan ukuran ikon sesuai kebutuhan
  cursor: "pointer",
  color: "white",
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
