import React from "react";
import "./lights.css";

const Lights = () => {
  const bulbs = Array.from({ length: 30 });

  return (
    <ul className="bulbs">
      {bulbs.map((_, index) => (
        <li className="bulb" key={index}></li>
      ))}
    </ul>
  );
};

export default Lights;
