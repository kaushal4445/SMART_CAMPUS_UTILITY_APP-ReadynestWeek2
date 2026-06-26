import { History, Clock } from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
        <History size={24} />
      </span>
      <p className="mt-4 font-medium text-slate-700 dark:text-slate-300">
        No activity yet
      </p>
      <p className="mt-1 max-w-xs text-sm text-slate-500 dark:text-slate-400">
        Things you do across Smart Campus — submissions, updates, logins —
        will show up here as a timeline.
      </p>
    </div>
  );
}

function Activity() {
  const activities = JSON.parse(localStorage.getItem("activities")) || [];

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">
      <Sidebar />

      <main className="flex-1 p-4 md:p-8">
        <Topbar title="Activity" />

        <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
            Activity Timeline
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            A running log of what's happened in your account.
          </p>

          {activities.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="relative mt-7 pl-1">
              <span
                aria-hidden="true"
                className="absolute left-4 top-4 bottom-4 w-px bg-slate-200 dark:bg-slate-800"
              />

              <div className="space-y-7">
                {activities.map((item) => (
                  <div key={item.id} className="relative flex gap-4">
                    <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-teal-50 text-teal-600 ring-4 ring-white dark:bg-teal-900/30 dark:text-teal-300 dark:ring-slate-900">
                      <History size={14} />
                    </span>

                    <div className="pt-1">
                      <p className="font-medium text-slate-900 dark:text-white">
                        {item.action}
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <Clock size={12} />
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Activity;