import { useEffect, useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import { supabase } from "../../config/supabase";

function GoalTracker() {
  const [notesCount, setNotesCount] = useState(0);
  const [tasksCount, setTasksCount] = useState(0);
  const [attendancePercent, setAttendancePercent] =
    useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGoalData();
  }, []);

  const fetchGoalData = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    // Notes Count
    const { count: notes } = await supabase
      .from("notes")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id);

    // Tasks Count
    const { count: tasks } = await supabase
      .from("tasks")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id);

    // Attendance
    const { data: attendanceData } = await supabase
      .from("attendance")
      .select("*")
      .eq("user_id", user.id);

    let attendanceRate = 0;

    if (attendanceData?.length > 0) {
      const totalPresent = attendanceData.reduce(
        (sum, item) =>
          sum + Number(item.present),
        0
      );

      const totalClasses = attendanceData.reduce(
        (sum, item) =>
          sum +
          Number(item.present) +
          Number(item.absent),
        0
      );

      attendanceRate =
        totalClasses > 0
          ? Math.round(
              (totalPresent / totalClasses) *
                100
            )
          : 0;
    }

    setNotesCount(notes || 0);
    setTasksCount(tasks || 0);
    setAttendancePercent(attendanceRate);

    setLoading(false);
  };

  const goals = [
    {
      title: "✅ Complete 10 Tasks",
      current: tasksCount,
      target: 10,
    },
    {
      title: "📒 Create 20 Notes",
      current: notesCount,
      target: 20,
    },
    {
      title: "🎯 Maintain 80% Attendance",
      current: attendancePercent,
      target: 80,
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-gray-900">
        <h1 className="text-2xl font-bold dark:text-white">
          Loading Goals...
        </h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-gray-900">
      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">
          🎯 Goal Tracker
        </h1>

        <div className="space-y-6">
          {goals.map((goal, index) => {
            const percentage = Math.min(
              Math.round(
                (goal.current / goal.target) * 100
              ),
              100
            );

            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow p-6"
              >
                <h2 className="text-xl font-bold mb-3">
                  {goal.title}
                </h2>

                <p>
                  Progress:{" "}
                  <strong>
                    {goal.current} / {goal.target}
                  </strong>
                </p>

                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mt-3">
                  <div
                    className="bg-teal-500 h-4 rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>

                <p className="mt-2 font-medium">
                  {percentage}% Completed
                </p>

                {percentage >= 100 && (
                  <p className="mt-2 text-green-500 font-bold">
                    🎉 Goal Achieved!
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default GoalTracker;