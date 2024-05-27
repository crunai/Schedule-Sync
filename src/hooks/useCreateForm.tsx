import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { DateTime } from "luxon";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { apiLink } from "../helpers/api.config";

const defaultTZ = DateTime.local().zoneName;

type submitArgs = {
  name: string;
  timezone: string;
  earliestHour: number;
  latestHour: number;
};

export type createFormT = submitArgs & {
  days: number[];
  dates: Date[];
  isDaysOfWeek: boolean;
};

const useCreateForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError,
    clearErrors,
  } = useForm<createFormT>({
    defaultValues: {
      timezone: defaultTZ,
      isDaysOfWeek: true,
      dates: [],
      days: [],
      earliestHour: 9,
      latestHour: 17,
    },
  });

  const navigate = useNavigate();

  const mutationSubmit = useMutation({
    mutationFn: async (
      submitArgs: submitArgs & {
        days?: number[];
        dates?: number[];
        isDaysOfWeek: boolean;
      },
    ) => {
      const scheduleType = submitArgs.isDaysOfWeek
        ? "days-in-week"
        : "selected-dates";
      return axios
        .post<{
          uuid: string;
        }>(`${apiLink}/schedules/create/${scheduleType}`, submitArgs)
        .then((res) => {
          navigate(`/schedule/${res.data.uuid}`);
        });
    },
  });

  const onSubmit = (data: createFormT) => {
    if (data.isDaysOfWeek) {
      if (data.days.length === 0) {
        setError("days", {
          type: "min",
          message: "Must select more than 1 day",
        });
        return;
      }
      mutationSubmit.mutate({
        ...data,
        dates: [],
        days: data.days.map((d) => d + 1),
      });
      return;
    }

    if (data.dates.length === 0) {
      setError("dates", {
        type: "min",
        message: "Must select more than 1 date",
      });
      return;
    }

    const dates = data.dates
      .map((d) => {
        return {
          year: d.getFullYear(),
          month: d.getMonth() + 1,
          day: d.getDate(),
        };
      })
      .map((d) => DateTime.fromObject(d, { zone: data.timezone }));
    mutationSubmit.mutate({ ...data, dates: dates.map((d) => d.toMillis()) });
  };

  return {
    register,
    handleSubmit,
    errors,
    setValue,
    watch,
    setError,
    clearErrors,
    onSubmit,
    mutationSubmit,
  };
};

export default useCreateForm;
