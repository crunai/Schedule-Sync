import { DateTime, Settings } from "luxon";
import { useEffect, useState } from "react";
import { OptionT } from "../CalendarScheduler/CalendarScheduler";

const allTz = Intl.supportedValuesOf("timeZone");
const defaultTZ = DateTime.local().zoneName;

export type IntervalSlot = {
  start: Date;
  end: Date;
};

function TimezoneSelector({
  setOption,
}: {
  setOption: React.Dispatch<React.SetStateAction<OptionT>>;
}) {
  const [tz, setTz] = useState(defaultTZ);

  useEffect(() => {
    Settings.defaultZone = tz;
    setOption((prev) => {
      return {
        ...prev,
        tz,
      };
    });
  }, [tz, setOption]);

  useEffect(() => {
    return () => {
      Settings.defaultZone = defaultTZ; // reset to browser TZ on unmount
    };
  }, []);

  return (
    <>
      <label htmlFor="timezone">Timezone:</label>
      <select
        name="timezone"
        id="timezone"
        onChange={(e) => {
          setTz(e.target.value);
        }}
        value={tz}
      >
        {allTz.map((tzString) => {
          return (
            <option key={tzString} value={tzString}>
              {tzString}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default TimezoneSelector;
