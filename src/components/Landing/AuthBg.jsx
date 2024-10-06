import React from "react";
import { useCursorPosition } from "./UsecursorPosition";
import useScreenSize from "./useScreenSize";

const AuthBg = ({ children, className, from, to, id }) => {
  const mousePosition = useCursorPosition();
  const screenSize = useScreenSize();

  const element = document.getElementById(id);
  const boundingElementRect = element?.getBoundingClientRect();

  const relativeX = mousePosition.x - (boundingElementRect?.left ?? 0);
  const relativeY = mousePosition.y - (boundingElementRect?.top ?? 0);

  return (
    <div
      id={id}
      style={
        screenSize.width > 1024
          ? {
              backgroundImage: `radial-gradient(circle at ${relativeX}px ${relativeY}px, ${
                from || "rgba(220, 183, 50, 0.7)"
              }, ${to || "transparent"} 60%)`,
            }
          : {}
      }
      className={className}
    >
      {children}
    </div>
  );
};

export default AuthBg;
