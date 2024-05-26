import { DateTime, Settings } from "luxon";
import { useEffect, useState } from "react";

const allTz = Intl.supportedValuesOf("timeZone");
const defaultTZ = DateTime.local().zoneName;

function TimezoneSelector({
  setParentTz,
  numWhiteSpace = 0,
}: {
  setParentTz: (newTz: string) => void;
  numWhiteSpace?: number;
}) {
  const [tz, setTz] = useState(defaultTZ);

  useEffect(() => {
    Settings.defaultZone = tz;
    setParentTz(tz);
  }, [tz, setParentTz]);

  useEffect(() => {
    return () => {
      Settings.defaultZone = defaultTZ; // reset to browser TZ on unmount
    };
  }, []);

  return (
    <>
      <label htmlFor="timezone" className="label whitespace-pre">
        Timezone:{" ".repeat(numWhiteSpace)}
      </label>
      <select
        name="timezone"
        id="timezone"
        className="select w-full rounded border border-black"
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
