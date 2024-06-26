import TimezoneSelector from "../Inputs/TimezoneSelector/TimezoneSelector";
import GapSlider from "../Inputs/GapSlider/GapSlider";
import useCalendarChanges from "../../hooks/useCalendarChanges";
import { OptionT } from "../../pages/Schedule";
import CopyLink from "../CopyLink/CopyLink";

function OptionSelector({
  setOption,
}: {
  setOption: React.Dispatch<React.SetStateAction<OptionT>>;
}) {
  const { handleTzChange, handleGapChange } = useCalendarChanges(setOption);

  return (
    <div className="mx-4 mb-5 flex flex-col items-center gap-y-3 sm:mr-4 sm:items-end sm:gap-y-6">
      <div className="flex flex-row">
        <TimezoneSelector numWhiteSpace={1} setParentTz={handleTzChange} />
      </div>
      <div className="flex flex-row gap-x-3">
        <GapSlider setParentGap={handleGapChange} />
        <CopyLink />
      </div>
    </div>
  );
}

export default OptionSelector;
