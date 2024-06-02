import { Link } from "react-router-dom";
import { TypewriterEffectSmooth } from "../components/TypeWriterEffect/TypeWriterEffect";

const words = "Plan events with".split(" ").map((w) => {
  return { text: w };
});
const highlightedWord = {
  text: "Sync.",
  className: "text-emerald-500",
};
const renderedWords = words.concat(highlightedWord);

export default function Home() {
  return (
    <div className="flex h-[35rem] flex-col items-center justify-center">
      <p className="text-sm text-neutral-600 sm:text-base xl:text-xl">
        The Solution for Group Scheduling
      </p>
      <TypewriterEffectSmooth words={renderedWords} />
      <Link to="/create">
        <button className="btn btn-md border bg-emerald-600 text-white sm:btn-lg hover:bg-emerald-700">
          Create a New Schedule
        </button>
      </Link>
    </div>
  );
}
