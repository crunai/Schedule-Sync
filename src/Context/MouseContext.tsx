import { useEffect, useState } from "react";
import { MouseDownContext } from "../hooks/useMouseDown";

export const MouseDownProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    const handleMouseDown = () => {
      setIsMouseDown(true);
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    document.addEventListener("mousedown", () => setIsMouseDown(true));
    document.addEventListener("mouseup", () => setIsMouseDown(false));

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <MouseDownContext.Provider value={isMouseDown}>
      {children}
    </MouseDownContext.Provider>
  );
};
