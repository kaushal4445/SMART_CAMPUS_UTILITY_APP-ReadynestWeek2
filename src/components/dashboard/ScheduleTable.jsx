function ScheduleTable() {
  const schedule = [
    {
      time: "09:00 AM",
      subject: "Java",
      room: "A101",
    },
    {
      time: "11:00 AM",
      subject: "DBMS",
      room: "B203",
    },
    {
      time: "02:00 PM",
      subject: "Operating System",
      room: "C301",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow p-5 transition-all duration-300">
      
      <h3 className="font-bold text-lg mb-4">
        Today's Schedule
      </h3>

      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-2">Time</th>
            <th className="text-left py-2">Subject</th>
            <th className="text-left py-2">Room</th>
          </tr>
        </thead>

        <tbody>
          {schedule.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-100 dark:border-gray-700"
            >
              <td className="py-3">{item.time}</td>
              <td className="py-3">{item.subject}</td>
              <td className="py-3">{item.room}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default ScheduleTable;