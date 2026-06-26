import { useState } from "react";
import jsPDF from "jspdf";
import { CheckSquare, StickyNote, Zap, FileDown } from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

function AttendanceRing({ percent }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 72 72" className="h-16 w-16">
      <circle cx="36" cy="36" r={r} fill="none" stroke="#E2E8F0" strokeWidth="7" />
      <circle
        cx="36"
        cy="36"
        r={r}
        fill="none"
        stroke="#0D9488"
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c - (percent / 100) * c}
        transform="rotate(-90 36 36)"
      />
      <text x="36" y="40" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0F172A">
        {percent}%
      </text>
    </svg>
  );
}

function SummaryTile({ icon: Icon, accent, label, value }) {
  return (
    <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${accent}`}>
        <Icon size={18} />
      </span>
      <div>
        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
        <p className="font-display text-xl font-bold text-slate-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}

function Reports() {
  const [generating, setGenerating] = useState(false);

  const notes = JSON.parse(localStorage.getItem("notes") || "[]");
  const assignments = JSON.parse(localStorage.getItem("assignments") || "[]");
  const attendance = JSON.parse(localStorage.getItem("attendance") || "[]");

  const totalPresent = attendance.reduce((sum, item) => sum + item.present, 0);
  const totalAbsent = attendance.reduce((sum, item) => sum + item.absent, 0);

  const attendancePercentage =
    totalPresent + totalAbsent > 0
      ? Math.round((totalPresent / (totalPresent + totalAbsent)) * 100)
      : 0;

  const productivityScore =
    assignments.length * 5 + notes.length * 2 + attendance.length * 10;

  const generatePDF = () => {
    setGenerating(true);

    const doc = new jsPDF();

    // Header band
    doc.setFillColor(13, 148, 136);
    doc.rect(0, 0, 210, 32, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont(undefined, "bold");
    doc.text("Smart Campus Report", 20, 18);
    doc.setFontSize(10);
    doc.setFont(undefined, "normal");
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 20, 26);

    // Section title
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(13);
    doc.setFont(undefined, "bold");
    doc.text("Student Summary", 20, 48);

    // Rows
    const rows = [
      ["Assignments", `${assignments.length}`],
      ["Notes", `${notes.length}`],
      ["Attendance", `${attendancePercentage}%`],
      ["Productivity Score", `${productivityScore}`],
    ];

    let y = 62;
    rows.forEach(([label, value]) => {
      doc.setFont(undefined, "normal");
      doc.setFontSize(11);
      doc.setTextColor(100, 116, 139);
      doc.text(label, 20, y);

      doc.setFont(undefined, "bold");
      doc.setTextColor(15, 23, 42);
      doc.text(value, 150, y);

      doc.setDrawColor(226, 232, 240);
      doc.line(20, y + 4, 190, y + 4);

      y += 14;
    });

    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.setFont(undefined, "normal");
    doc.text("Smart Campus Utility App", 20, 285);

    doc.save("SmartCampusReport.pdf");
    setGenerating(false);
  };

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">
      <Sidebar />

      <main className="flex-1 p-4 md:p-8">
        <Topbar title="Reports" />

        <div className="mx-auto mt-6 max-w-3xl">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Student Summary Report
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              A snapshot of your activity across Smart Campus.
            </p>

            {/* Attendance highlight */}
            <div className="mt-5 flex items-center gap-4 rounded-xl border border-teal-100 bg-teal-50/50 p-5 dark:border-teal-900/30 dark:bg-teal-950/20">
              <AttendanceRing percent={attendancePercentage} />
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  Overall attendance
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Based on {totalPresent + totalAbsent} recorded classes
                </p>
              </div>
            </div>

            {/* Stat tiles */}
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <SummaryTile
                icon={CheckSquare}
                accent="bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300"
                label="Assignments"
                value={assignments.length}
              />
              <SummaryTile
                icon={StickyNote}
                accent="bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-300"
                label="Notes"
                value={notes.length}
              />
              <SummaryTile
                icon={Zap}
                accent="bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-300"
                label="Productivity Score"
                value={productivityScore}
              />
            </div>

            <button
              onClick={generatePDF}
              disabled={generating}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 py-3.5 font-semibold text-white transition-all duration-200 hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-600/25 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto sm:px-6"
            >
              <FileDown size={17} />
              {generating ? "Preparing PDF..." : "Download PDF Report"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Reports;