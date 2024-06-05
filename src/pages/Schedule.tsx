import { useParams } from "react-router-dom";
import CalendarScheduler from "../components/CalendarScheduler/CalendarScheduler";
import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiLink } from "../helpers/api.config";
import { ScheduleInfo } from "../helpers/apiTypeAdapter";
import SignUp from "../components/SignUp/SignUp";
import { useState } from "react";
import { DateTime } from "luxon";
import OptionSelector from "../components/OptionSelector/OptionSelector";

export type OptionT = {
  gapSize: number;
  tz: string;
};

const defaultTZ = DateTime.local().zoneName;

function Schedule() {
  const scheduleId = useParams().scheduleId;
  const scheduleQuery = useSuspenseQuery({
    queryKey: ["schedule-info", scheduleId],
    queryFn: async () => {
      return await axios
        .get<ScheduleInfo>(`${apiLink}/schedules/info`, {
          params: {
            scheduleUUID: scheduleId,
          },
        })
        .then((res) => res.data);
    },
    retry: 1,
  });

  if (scheduleQuery.error && scheduleQuery.isFetching) {
    throw Error;
  }

  const [option, setOption] = useState<OptionT>({
    gapSize: 30,
    tz: defaultTZ,
  });
  const [token, setToken] = useState("");

  return (
    <main>
      <h1 className="mb-7 break-words text-center text-3xl font-semibold sm:text-5xl">
        {scheduleQuery.data.schedule_name}
      </h1>
      <OptionSelector setOption={setOption} />
      <div className="flex flex-col sm:flex-row">
        <div className="mx-4 sm:w-[45%]">
          {token.length === 0 ? (
            <SignUp scheduleUUID={scheduleId} setToken={setToken} />
          ) : (
            <div>
              <h2 className="text-3xl font-semibold">Individual Schedule</h2>
            </div>
          )}
        </div>
        <div className="mx-4 overflow-y-hidden overflow-x-scroll sm:m-0 sm:w-1/2 sm:pb-8">
          <h2 className="mb-2 text-3xl font-semibold">Group Schedule</h2>
          <CalendarScheduler option={option} data={scheduleQuery.data} />
        </div>
      </div>
    </main>
  );
}

export default Schedule;
