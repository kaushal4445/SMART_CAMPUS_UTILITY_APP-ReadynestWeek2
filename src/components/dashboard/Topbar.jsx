import { Link } from "react-router-dom";
import { Bell, Search } from "lucide-react";

function getInitials(name) {
  return name
    .trim()
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Topbar({ title = "Dashboard", userName = "Student", avatarUrl }) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
      {/* Left Side */}
      <div>
        <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
          {title}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">{today}</p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {/* Quick search */}
        <Link
          to="/search"
          className="hidden items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-400 transition hover:border-teal-300 hover:text-slate-600 sm:flex dark:border-slate-700 dark:hover:border-teal-700 dark:hover:text-slate-300"
        >
          <Search size={15} />
          Search
        </Link>

        {/* Notification Bell */}
        <Link
          to="/notifications"
          className="relative grid h-10 w-10 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="Notifications"
        >
          <Bell size={19} />
          <span className="absolute right-1.5 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-red-500 text-[10px] font-semibold text-white ring-2 ring-white dark:ring-slate-900">
            3
          </span>
        </Link>

        {/* Profile */}
        <Link to="/profile" className="relative shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={userName}
              className="h-10 w-10 rounded-full border-2 border-slate-200 object-cover dark:border-slate-700"
            />
          ) : (
            <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-slate-200 bg-teal-50 text-sm font-semibold text-teal-700 dark:border-slate-700 dark:bg-teal-900/30 dark:text-teal-300">
              {getInitials(userName)}
            </span>
          )}
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
        </Link>
      </div>
    </div>
  );
}

export default Topbar;