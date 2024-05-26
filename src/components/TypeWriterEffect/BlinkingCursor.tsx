import { MotionProps, motion } from "framer-motion";

const blinkCursorOptions: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, repeat: Infinity, repeatType: "reverse" },
};

export const BlinkingCursor = () => {
  return (
    <motion.span
      className="block h-8 w-[4px] rounded-sm bg-emerald-500 sm:h-10 xl:h-12"
      {...blinkCursorOptions}
    ></motion.span>
  );
};
