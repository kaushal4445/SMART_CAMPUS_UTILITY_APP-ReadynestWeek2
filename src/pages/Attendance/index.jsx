import { useState, useEffect } from "react";
import { Plus, BookOpen, ClipboardList, Layers, Pencil, Trash2, AlertTriangle } from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import AddSubjectModal from "../../components/attendance/AddSubjectModal";
import { supabase } from "../../config/supabase";

function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 2800);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-lg shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
      {message}
    </div>
  );
}

function DeleteModal({ subject, onCancel, onConfirm }) {
  if (!subject) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-800">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
          <AlertTriangle size={20} />
        </span>
        <h3 className="mt-4 font-display text-lg font-bold text-slate-900 dark:text-white">
          Delete {subject.subject}?
        </h3>
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
          This removes all attendance records for this subject. This can't be undone.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg border border-slate-300 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function StatTile({ icon: Icon, accent, label, value }) {
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

function statusInfo(percentage) {
  if (percentage >= 75) return { label: "Good", text: "text-emerald-700 dark:text-emerald-400", bar: "bg-emerald-500", pill: "bg-emerald-50 dark:bg-emerald-900/30" };
  if (percentage >= 60) return { label: "Warning", text: "text-amber-700 dark:text-amber-400", bar: "bg-amber-500", pill: "bg-amber-50 dark:bg-amber-900/30" };
  return { label: "Critical", text: "text-rose-700 dark:text-rose-400", bar: "bg-rose-500", pill: "bg-rose-50 dark:bg-rose-900/30" };
}

function Attendance() {
  const [subjects, setSubjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState("");

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
      setToast("Please login first");
      return;
    }

    const { error } = await supabase.from("attendance").insert([
      {
        subject: newSubject.subject,
        present: newSubject.present,
        absent: newSubject.absent,
        user_id: user.id,
      },
    ]);

    if (error) {
      console.log(error);
      setToast(error.message);
    } else {
      fetchAttendance();
      setIsModalOpen(false);
      setToast("Subject added");
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
      setToast(error.message);
    } else {
      fetchAttendance();
      setEditingSubject(null);
      setToast("Subject updated");
    }
  };

  const deleteSubject = async (id) => {
    const { error } = await supabase.from("attendance").delete().eq("id", id);

    if (error) {
      console.log(error);
      setToast(error.message);
    } else {
      fetchAttendance();
      setToast("Subject deleted");
    }
    setDeleteTarget(null);
  };

  const totalPresent = subjects.reduce((sum, sub) => sum + Number(sub.present), 0);
  const totalAbsent = subjects.reduce((sum, sub) => sum + Number(sub.absent), 0);
  const totalClasses = totalPresent + totalAbsent;

  const overallAttendance =
    totalClasses > 0 ? Math.round((totalPresent / totalClasses) * 100) : 0;

  const ringColor = overallAttendance >= 75 ? "#10B981" : overallAttendance >= 60 ? "#F59E0B" : "#F43F5E";
  const r = 30;
  const c = 2 * Math.PI * r;

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">
      <Sidebar />

      <main className="flex-1 p-4 md:p-8">
        <Topbar title="Attendance" />

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              Attendance Tracker
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Keep an eye on every subject, one place.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            <Plus size={16} />
            Add Subject
          </button>
        </div>

        {/* Stat tiles */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatTile
            icon={BookOpen}
            accent="bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-300"
            label="Total Subjects"
            value={subjects.length}
          />
          <StatTile
            icon={ClipboardList}
            accent="bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-300"
            label="Overall Attendance"
            value={`${overallAttendance}%`}
          />
          <StatTile
            icon={Layers}
            accent="bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-300"
            label="Total Classes"
            value={totalClasses}
          />
        </div>

        {/* Overview card with ring */}
        <div className="mt-5 flex flex-col items-center gap-6 rounded-2xl border border-slate-200/80 bg-white p-6 sm:flex-row dark:border-slate-800 dark:bg-slate-900">
          <svg viewBox="0 0 72 72" className="h-20 w-20 shrink-0">
            <circle cx="36" cy="36" r={r} fill="none" stroke="#E2E8F0" strokeWidth="7" />
            <circle
              cx="36"
              cy="36"
              r={r}
              fill="none"
              stroke={ringColor}
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={c - (overallAttendance / 100) * c}
              transform="rotate(-90 36 36)"
            />
            <text x="36" y="41" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0F172A">
              {overallAttendance}%
            </text>
          </svg>

          <div className="flex flex-1 flex-col gap-1 text-center sm:text-left">
            <p className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Attendance overview
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {totalPresent} classes attended, {totalAbsent} missed, across{" "}
              {subjects.length} subjects.
            </p>
          </div>

          <div className="flex gap-6 sm:ml-auto">
            <div className="text-center">
              <p className="font-display text-lg font-bold text-emerald-600 dark:text-emerald-400">{totalPresent}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Present</p>
            </div>
            <div className="text-center">
              <p className="font-display text-lg font-bold text-rose-600 dark:text-rose-400">{totalAbsent}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Absent</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-400 dark:border-slate-800">
              <tr>
                <th className="p-4">Subject</th>
                <th className="p-4">Present</th>
                <th className="p-4">Absent</th>
                <th className="p-4">Attendance</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {subjects.map((sub) => {
                const total = Number(sub.present) + Number(sub.absent);
                const percentage = total > 0 ? Math.round((Number(sub.present) / total) * 100) : 0;
                const status = statusInfo(percentage);

                return (
                  <tr key={sub.id} className="border-t border-slate-100 dark:border-slate-800">
                    <td className="p-4 font-medium text-slate-900 dark:text-white">{sub.subject}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-300">{sub.present}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-300">{sub.absent}</td>
                    <td className="min-w-[220px] p-4">
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-slate-700 dark:text-slate-200">{percentage}%</span>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${status.pill} ${status.text}`}>
                          {status.label}
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                        <div
                          className={`h-2 rounded-full ${status.bar} transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => setEditingSubject(sub)}
                          aria-label="Edit"
                          className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-teal-600 dark:text-slate-400 dark:hover:bg-slate-800"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(sub)}
                          aria-label="Delete"
                          className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 transition hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-900/20"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {subjects.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-10 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
                        <ClipboardList size={20} />
                      </span>
                      <p className="font-medium text-slate-600 dark:text-slate-300">No subjects yet</p>
                      <p className="text-sm text-slate-400">Add your first subject to start tracking.</p>
                    </div>
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

        <DeleteModal
          subject={deleteTarget}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={() => deleteSubject(deleteTarget.id)}
        />
      </main>

      <Toast message={toast} onClose={() => setToast("")} />
    </div>
  );
}

export default Attendance;