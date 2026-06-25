import { useEffect, useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import { supabase } from "../../config/supabase";

function Leaderboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);

      const { data: profiles } = await supabase
        .from("profiles")
        .select("*");

      const { data: tasks } = await supabase
        .from("tasks")
        .select("*");

      const { data: notes } = await supabase
        .from("notes")
        .select("*");

      const { data: attendance } = await supabase
        .from("attendance")
        .select("*");

      const leaderboardData = profiles.map((profile) => {
        const userTasks = tasks.filter(
          (task) => task.user_id === profile.id
        );

        const userNotes = notes.filter(
          (note) => note.user_id === profile.id
        );

        const userAttendance = attendance.filter(
          (att) => att.user_id === profile.id
        );

        let totalPresent = 0;
        let totalAbsent = 0;

        userAttendance.forEach((att) => {
          totalPresent += att.present || 0;
          totalAbsent += att.absent || 0;
        });

        const attendancePercentage =
          totalPresent + totalAbsent > 0
            ? Math.round(
                (totalPresent /
                  (totalPresent + totalAbsent)) *
                  100
              )
            : 0;

        const score =
          userTasks.length * 10 +
          userNotes.length * 5 +
          attendancePercentage;

        return {
          id: profile.id,
          name: profile.full_name || "Unknown",
          department: profile.department,
          year: profile.year,
          tasks: userTasks.length,
          notes: userNotes.length,
          attendance: attendancePercentage,
          score,
        };
      });

      leaderboardData.sort(
        (a, b) => b.score - a.score
      );

      const ranked = leaderboardData.map(
        (student, index) => ({
          ...student,
          rank: index + 1,
          badge:
            index === 0
              ? "🥇 Gold"
              : index === 1
              ? "🥈 Silver"
              : index === 2
              ? "🥉 Bronze"
              : "🎓 Student",
        })
      );

      setStudents(ranked);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-gray-900">
      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">
          🏆 Dynamic Leaderboard
        </h1>

        {loading ? (
          <div className="text-center py-10 dark:text-white">
            Loading...
          </div>
        ) : (
          <>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-teal-600 text-white">
                  <tr>
                    <th className="p-4">Rank</th>
                    <th className="p-4">Student</th>
                    <th className="p-4">Department</th>
                    <th className="p-4">Score</th>
                    <th className="p-4">Attendance</th>
                    <th className="p-4">Notes</th>
                    <th className="p-4">Tasks</th>
                    <th className="p-4">Badge</th>
                  </tr>
                </thead>

                <tbody>
                  {students.map((student) => (
                    <tr
                      key={student.id}
                      className="border-b dark:border-gray-700 dark:text-white text-center"
                    >
                      <td className="p-4">
                        #{student.rank}
                      </td>

                      <td className="p-4 font-bold">
                        {student.name}
                      </td>

                      <td className="p-4">
                        {student.department}
                      </td>

                      <td className="p-4">
                        {student.score}
                      </td>

                      <td className="p-4">
                        {student.attendance}%
                      </td>

                      <td className="p-4">
                        {student.notes}
                      </td>

                      <td className="p-4">
                        {student.tasks}
                      </td>

                      <td className="p-4">
                        {student.badge}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {students.length > 0 && (
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-yellow-500 text-white p-5 rounded-xl">
                  <h3>🏆 Top Rank</h3>
                  <p className="text-2xl font-bold">
                    {students[0].name}
                  </p>
                </div>

                <div className="bg-teal-500 text-white p-5 rounded-xl">
                  <h3>📈 Highest Score</h3>
                  <p className="text-2xl font-bold">
                    {students[0].score}
                  </p>
                </div>

                <div className="bg-purple-500 text-white p-5 rounded-xl">
                  <h3>🎯 Attendance</h3>
                  <p className="text-2xl font-bold">
                    {students[0].attendance}%
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default Leaderboard;