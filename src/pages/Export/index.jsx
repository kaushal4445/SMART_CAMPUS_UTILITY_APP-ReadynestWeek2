import Sidebar from "../../components/dashboard/Sidebar";

function ExportPage() {

  const exportNotes = () => {
    const notes =
      localStorage.getItem("notes") || "[]";

    const blob = new Blob([notes], {
      type: "application/json",
    });

    const url =
      window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "notes.json";

    a.click();
  };

  const exportAssignments = () => {
    const assignments = JSON.parse(
      localStorage.getItem("assignments") || "[]"
    );

    const csv = [
      ["Title", "Due Date", "Priority"],
      ...assignments.map((a) => [
        a.title,
        a.dueDate,
        a.priority,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url =
      window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "assignments.csv";

    a.click();
  };

  const exportAttendance = () => {
    const attendance = JSON.parse(
      localStorage.getItem("attendance") || "[]"
    );

    const csv = [
      ["Subject", "Present", "Absent"],
      ...attendance.map((a) => [
        a.subject,
        a.present,
        a.absent,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url =
      window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "attendance.csv";

    a.click();
  };

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-gray-900">
      <Sidebar />

      <main className="flex-1 p-6">

        <h1 className="text-3xl font-bold mb-6 dark:text-white">
          📊 Export Center
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          <button
            onClick={exportNotes}
            className="bg-blue-500 text-white p-6 rounded-xl shadow"
          >
            📒 Export Notes
          </button>

          <button
            onClick={exportAssignments}
            className="bg-green-500 text-white p-6 rounded-xl shadow"
          >
            📝 Export Assignments
          </button>

          <button
            onClick={exportAttendance}
            className="bg-purple-500 text-white p-6 rounded-xl shadow"
          >
            📊 Export Attendance
          </button>

        </div>

      </main>
    </div>
  );
}

export default ExportPage;