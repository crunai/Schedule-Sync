import { MotionProps, motion } from "framer-motion";
import { twJoin } from "tailwind-merge";
import { BlinkingCursor } from "./BlinkingCursor";

const ScrollTypeOptions: MotionProps = {
  initial: { width: 0 },
  animate: { width: "fit-content" },
  transition: { duration: 2, ease: "linear", delay: 1 },
};

export const TypewriterEffectSmooth = ({
  words,
}: {
  words: {
    text: string;
    className?: string;
  }[];
}) => {
  const wordsArraySplit = words.map((word) => {
    return {
      ...word,
      chars: word.text.split(""),
    };
  });

  const renderWords = () => {
    return (
      <div>
        {wordsArraySplit.map((wordSplit, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {wordSplit.chars.map((char, index) => (
                <span
                  key={`char-${index}`}
                  className={twJoin(`text-black `, wordSplit.className)}
                >
                  {char}
                </span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="my-6 flex space-x-1">
      <motion.div className="overflow-hidden pb-2" {...ScrollTypeOptions}>
        <div className="whitespace-nowrap text-2xl font-bold sm:text-4xl xl:text-5xl">
          {renderWords()}
        </div>
      </motion.div>
      <BlinkingCursor />
    </div>
  );
};
