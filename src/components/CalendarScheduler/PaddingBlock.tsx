import Slot from "./Slot";

function PaddingBlock({ gapSize }: { gapSize: number }) {
  return (
    <Slot
      gapSize={gapSize}
      className="border border-b-0 border-black bg-gradient-stripe hover:cursor-not-allowed"
    ></Slot>
  );
}

export default PaddingBlock;
