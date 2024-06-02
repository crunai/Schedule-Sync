export type ScheduleInfo = {
  schedule_name: string;
  type: "DAYSINWEEK" | "SELECTEDDATES";
  allowable_time_range: { start: number; end: number }[];
  timezone: string;
  user_availabilities: {
    [key: string]: { start: number; end: number; preference: number };
  };
};
