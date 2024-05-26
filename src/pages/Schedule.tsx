import { useParams } from "react-router-dom";
import CalendarScheduler from "../components/CalendarScheduler/CalendarScheduler";

function Schedule() {
  const scheduleId = useParams().scheduleId;
  return (
    <main>
      {scheduleId}
      <CalendarScheduler />
    </main>
  );
}

export default Schedule;
