import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function TimetableCalendar() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">
        📅 Timetable Calendar
      </h2>

      <Calendar
        onChange={setDate}
        value={date}
      />

      <p className="mt-4">
        Selected Date:
        <span className="font-bold ml-2">
          {date.toDateString()}
        </span>
      </p>
    </div>
  );
}

export default TimetableCalendar;