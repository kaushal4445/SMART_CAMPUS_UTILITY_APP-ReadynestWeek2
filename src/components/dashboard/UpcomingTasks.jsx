function UpcomingTasks() {
  const tasks = [
    "DBMS Assignment",
    "Java Mini Project",
    "OS Lab Record",
  ];

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow p-5 transition-all duration-300">

      <h3 className="font-bold text-lg mb-4">
        Upcoming Tasks
      </h3>

      <ul className="space-y-3">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="border-b border-gray-200 dark:border-gray-700 pb-2"
          >
            {task}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default UpcomingTasks;