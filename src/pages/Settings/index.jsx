import { useEffect, useState } from "react";
import { CheckSquare, Bell, History, Trash2, AlertTriangle } from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

const dataActions = [
  {
    key: "assignments",
    icon: CheckSquare,
    title: "Clear Assignments",
    description: "Removes all locally saved assignment entries.",
  },
  {
    key: "notices",
    icon: Bell,
    title: "Clear Notices",
    description: "Removes cached notice board announcements.",
  },
  {
    key: "activities",
    icon: History,
    title: "Clear Activity Log",
    description: "Removes your recorded activity history.",
  },
];

function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 2800);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-lg shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300">
        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none">
          <path
            d="m5 13 4 4 10-10"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {message}
    </div>
  );
}

function ResetModal({ open, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-800">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
          <AlertTriangle size={20} />
        </span>

        <h3 className="mt-4 font-display text-lg font-bold text-slate-900 dark:text-white">
          Reset entire app?
        </h3>
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
          This permanently deletes all locally stored data — assignments,
          notices, activity, and preferences. This can't be undone.
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
            Reset everything
          </button>
        </div>
      </div>
    </div>
  );
}

function Settings() {
  const [toast, setToast] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const clearKey = (key, label) => {
    localStorage.removeItem(key);
    setToast(`${label} cleared`);
  };

  const resetApp = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">
      <Sidebar />

      <main className="flex-1 space-y-6 p-4 md:p-8">
        <Topbar title="Settings" />

        {/* Data management */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
            Data Management
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Clear locally cached data for individual features.
          </p>

          <div className="mt-5 divide-y divide-slate-100 dark:divide-slate-800">
            {dataActions.map(({ key, icon: Icon, title, description }) => (
              <div
                key={key}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div className="flex items-center gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-300">
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {title}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => clearKey(key, title.replace("Clear ", ""))}
                  className="shrink-0 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-400 hover:text-teal-700 dark:border-slate-600 dark:text-slate-200 dark:hover:border-teal-600 dark:hover:text-teal-400"
                >
                  Clear
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Danger zone */}
        <div className="rounded-2xl border border-red-200 bg-red-50/40 p-6 dark:border-red-900/40 dark:bg-red-950/20">
          <div className="flex items-center gap-2.5">
            <AlertTriangle size={18} className="text-red-600 dark:text-red-400" />
            <h2 className="font-display text-lg font-bold text-red-700 dark:text-red-400">
              Danger Zone
            </h2>
          </div>
          <p className="mt-1 text-sm text-red-600/80 dark:text-red-400/70">
            This action is irreversible. All locally stored app data will be
            permanently deleted.
          </p>

          <button
            onClick={() => setModalOpen(true)}
            className="mt-4 flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            <Trash2 size={16} />
            Reset entire app
          </button>
        </div>
      </main>

      <Toast message={toast} onClose={() => setToast("")} />
      <ResetModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onConfirm={resetApp}
      />
    </div>
  );
}

export default Settings;