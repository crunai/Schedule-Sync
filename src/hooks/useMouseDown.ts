import { createContext, useContext } from "react";

export const MouseDownContext = createContext(false);
export const useMouseDown = () => useContext(MouseDownContext);
