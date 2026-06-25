import Sidebar from "../../components/dashboard/Sidebar";
import jsPDF from "jspdf";

function Reports() {
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

  const totalAbsent = attendance.reduce(
    (sum, item) => sum + item.absent,
    0
  );

  const attendancePercentage =
    totalPresent + totalAbsent > 0
      ? Math.round(
          (totalPresent /
            (totalPresent + totalAbsent)) *
            100
        )
      : 0;

  const productivityScore =
    assignments.length * 5 +
    notes.length * 2 +
    attendance.length * 10;

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text(
      "Smart Campus Report",
      20,
      20
    );

    doc.setFontSize(14);

    doc.text(
      `Assignments: ${assignments.length}`,
      20,
      50
    );

    doc.text(
      `Notes: ${notes.length}`,
      20,
      65
    );

    doc.text(
      `Attendance: ${attendancePercentage}%`,
      20,
      80
    );

    doc.text(
      `Productivity Score: ${productivityScore}`,
      20,
      95
    );

    doc.save("SmartCampusReport.pdf");
  };

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-gray-900">
      <Sidebar />

      <main className="flex-1 p-6">

        <h1 className="text-3xl font-bold mb-6 dark:text-white">
          📄 Report Generator
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-4 dark:text-white">
            Student Summary Report
          </h2>

          <div className="space-y-3 dark:text-white">

            <p>
              📝 Assignments:
              {" "}
              {assignments.length}
            </p>

            <p>
              📒 Notes:
              {" "}
              {notes.length}
            </p>

            <p>
              🎯 Attendance:
              {" "}
              {attendancePercentage}%
            </p>

            <p>
              🚀 Productivity Score:
              {" "}
              {productivityScore}
            </p>

          </div>

          <button
            onClick={generatePDF}
            className="mt-6 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700"
          >
            Download PDF Report
          </button>

        </div>

      </main>
    </div>
  );
}

export default Reports;