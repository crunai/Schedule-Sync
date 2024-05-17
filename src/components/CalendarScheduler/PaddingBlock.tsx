import Slot from "./Slot";

function PaddingBlock({ gapSize }: { gapSize: number }) {
  return <Slot gapSize={gapSize} className="bg-gradient-stripe-45"></Slot>;
}

export default PaddingBlock;
