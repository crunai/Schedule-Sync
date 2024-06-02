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
        {scheduleQuery.data?.schedule_name}
      </h1>
      <OptionSelector setOption={setOption}/>
      <div className="flex flex-col sm:flex-row">
        <div className="mx-3 sm:w-5/12">
          {token.length > 0 ? (
            <>Logged In</>
          ) : (
            <SignUp scheduleUUID={scheduleId} setToken={setToken} />
          )}
        </div>
        <div className="sm:w-7/12 mx-3">Schedule</div>
      </div>
      <CalendarScheduler option={option} />
    </main>
  );
}

export default Schedule;
