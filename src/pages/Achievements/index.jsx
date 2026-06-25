import Sidebar from "../../components/dashboard/Sidebar";

function Achievements() {
  const notes = JSON.parse(
    localStorage.getItem("notes") || "[]"
  );

  const assignments = JSON.parse(
    localStorage.getItem("assignments") || "[]"
  );

  const attendance = JSON.parse(
    localStorage.getItem("attendance") || "[]"
  );

  const totalPresent = attendance.reduce(
    (sum, item) => sum + item.present,
    0
  );

  const totalClasses = attendance.reduce(
    (sum, item) =>
      sum + item.present + item.absent,
    0
  );

  const attendancePercent =
    totalClasses > 0
      ? Math.round(
          (totalPresent / totalClasses) * 100
        )
      : 0;

  const achievements = [
    {
      title: "📒 Notes Master",
      unlocked: notes.length >= 10,
    },
    {
      title: "📝 Productivity Pro",
      unlocked: assignments.length >= 10,
    },
    {
      title: "🎯 Attendance King",
      unlocked: attendancePercent >= 90,
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-gray-900">
      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">
          🏆 Achievements
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl shadow ${
                item.unlocked
                  ? "bg-green-500 text-white"
                  : "bg-gray-300"
              }`}
            >
              <h2 className="text-xl font-bold">
                {item.title}
              </h2>

              <p className="mt-2">
                {item.unlocked
                  ? "Unlocked ✅"
                  : "Locked 🔒"}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Achievements;