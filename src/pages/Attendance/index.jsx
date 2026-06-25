import { useState, useEffect } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import AddSubjectModal from "../../components/attendance/AddSubjectModal";
import { supabase } from "../../config/supabase";

function Attendance() {
  const [subjects, setSubjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("attendance")
      .select("*")
      .eq("user_id", user.id)
      .order("id", { ascending: false });

    if (error) {
      console.log("FETCH ERROR:", error);
    } else {
      setSubjects(data);
    }
  };

  const addSubject = async (newSubject) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first");
      return;
    }

    const { error } = await supabase
      .from("attendance")
      .insert([
        {
          subject: newSubject.subject,
          present: newSubject.present,
          absent: newSubject.absent,
          user_id: user.id,
        },
      ]);

    if (error) {
      console.log(error);
      alert(error.message);
    } else {
      fetchAttendance();
      setIsModalOpen(false);
    }
  };

  const updateSubject = async (updatedSubject) => {
    const { error } = await supabase
      .from("attendance")
      .update({
        subject: updatedSubject.subject,
        present: updatedSubject.present,
        absent: updatedSubject.absent,
      })
      .eq("id", updatedSubject.id);

    if (error) {
      console.log(error);
      alert(error.message);
    } else {
      fetchAttendance();
      setEditingSubject(null);
    }
  };

  const deleteSubject = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subject?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("attendance")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
      alert(error.message);
    } else {
      fetchAttendance();
    }
  };

  const overallAttendance =
    subjects.length > 0
      ? Math.round(
          (subjects.reduce(
            (sum, sub) => sum + Number(sub.present),
            0
          ) /
            subjects.reduce(
              (sum, sub) =>
                sum +
                Number(sub.present) +
                Number(sub.absent),
              0
            )) *
            100
        )
      : 0;

  const totalClasses = subjects.reduce(
    (sum, sub) =>
      sum +
      Number(sub.present) +
      Number(sub.absent),
    0
  );

  const getProgressColor = (percentage) => {
    if (percentage >= 75) return "bg-green-500";
    if (percentage >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-gray-900">
      <Sidebar />

      <main className="flex-1 p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold dark:text-white">
            📋 Attendance Tracker
          </h1>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
          >
            Add Subject
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-500 text-white p-5 rounded-xl shadow">
            <h3>Total Subjects</h3>
            <p className="text-3xl font-bold">
              {subjects.length}
            </p>
          </div>

          <div className="bg-green-500 text-white p-5 rounded-xl shadow">
            <h3>Overall Attendance</h3>
            <p className="text-3xl font-bold">
              {overallAttendance}%
            </p>
          </div>

          <div className="bg-purple-500 text-white p-5 rounded-xl shadow">
            <h3>Total Classes</h3>
            <p className="text-3xl font-bold">
              {totalClasses}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
            Overall Attendance
          </h2>

          <p className="text-5xl font-bold text-teal-600 mt-2">
            {overallAttendance}%
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100 dark:bg-gray-700">
              <tr>
                <th className="p-4 text-left">Subject</th>
                <th className="p-4 text-left">Present</th>
                <th className="p-4 text-left">Absent</th>
                <th className="p-4 text-left">Attendance</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {subjects.map((sub) => {
                const total =
                  Number(sub.present) +
                  Number(sub.absent);

                const percentage =
                  total > 0
                    ? Math.round(
                        (Number(sub.present) /
                          total) *
                          100
                      )
                    : 0;

                return (
                  <tr
                    key={sub.id}
                    className="border-t dark:border-gray-700"
                  >
                    <td className="p-4 font-medium">
                      {sub.subject}
                    </td>

                    <td className="p-4">
                      {sub.present}
                    </td>

                    <td className="p-4">
                      {sub.absent}
                    </td>

                    <td className="p-4 min-w-[220px]">
                      <div className="flex justify-between mb-1">
                        <span>{percentage}%</span>

                        <span
                          className={`font-medium ${
                            percentage >= 75
                              ? "text-green-600"
                              : percentage >= 60
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {percentage >= 75
                            ? "Good"
                            : percentage >= 60
                            ? "Warning"
                            : "Critical"}
                        </span>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${getProgressColor(
                            percentage
                          )}`}
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            setEditingSubject(sub)
                          }
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteSubject(sub.id)
                          }
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {subjects.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center p-6 text-gray-500"
                  >
                    No subjects added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <AddSubjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={addSubject}
        />

        <AddSubjectModal
          isOpen={!!editingSubject}
          onClose={() => setEditingSubject(null)}
          onSave={updateSubject}
          initialData={editingSubject}
        />
      </main>
    </div>
  );
}

export default Attendance;