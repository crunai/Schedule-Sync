import { useEffect, useState } from "react";

const useDelayDisplay = (delay: number = 300) => {
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplay(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return display;
};

export default useDelayDisplay;
