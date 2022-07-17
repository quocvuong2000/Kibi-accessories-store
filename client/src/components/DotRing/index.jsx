import React, { useContext } from "react";
import "./DotRing.css";
import useMousePosition from "../../customHook/useMousePosition";
import { MouseContext } from "../../context/mouse-context";

const DotRing = () => {
  const { cursorType } = useContext(MouseContext);
  const { x, y } = useMousePosition();
  return (
    <>
      <div
        style={{ transform: `translate(${x - 15}px, ${y - 15}px)` }}
        className={"ring " + cursorType}
      ></div>
      <div
        className={"dot " + cursorType}
        style={{ left: `${x}px`, top: `${y}px` }}
      ></div>
    </>
  );
};

export default DotRing;
