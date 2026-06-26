import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search as SearchIcon,
  X,
  ArrowRight,
  StickyNote,
  CheckSquare,
  ClipboardList,
  Calendar,
  Bell,
} from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import { supabase } from "../../config/supabase";

const typeConfig = {
  note: { label: "Note", icon: StickyNote, accent: "text-sky-600 bg-sky-50", path: "/notes" },
  task: { label: "Task", icon: CheckSquare, accent: "text-amber-600 bg-amber-50", path: "/assignments" },
  attendance: { label: "Attendance", icon: ClipboardList, accent: "text-teal-600 bg-teal-50", path: "/attendance" },
  class: { label: "Class", icon: Calendar, accent: "text-violet-600 bg-violet-50", path: "/timetable" },
  notice: { label: "Notice", icon: Bell, accent: "text-rose-600 bg-rose-50", path: "/notices" },
};

function SkeletonRow() {
  return (
    <div className="flex items-center gap-3.5 rounded-xl border border-slate-200/80 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="h-9 w-9 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-16 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
        <div className="h-3.5 w-48 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
      </div>
    </div>
  );
}

function Search() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState("all");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const [notesRes, tasksRes, attendanceRes, timetableRes, noticesRes] =
      await Promise.all([
        supabase.from("notes").select("*").eq("user_id", user.id),
        supabase.from("tasks").select("*").eq("user_id", user.id),
        supabase.from("attendance").select("*").eq("user_id", user.id),
        supabase.from("timetable").select("*").eq("user_id", user.id),
        supabase.from("notices").select("*"),
      ]);

    const allResults = [
      ...(notesRes.data || []).map((item) => ({ type: "note", title: item.title })),
      ...(tasksRes.data || []).map((item) => ({
        type: "task",
        title: item.title || item.task || item.name || "Untitled Task",
      })),
      ...(attendanceRes.data || []).map((item) => ({
        type: "attendance",
        title: item.subject || item.course || "Unknown Subject",
      })),
      ...(timetableRes.data || []).map((item) => ({ type: "class", title: item.subject })),
      ...(noticesRes.data || []).map((item) => ({ type: "notice", title: item.title })),
    ];

    setResults(allResults);
    setLoading(false);
  };

  const handleResultClick = (item) => {
    const config = typeConfig[item.type];
    if (!config) return;
    navigate(config.path, { state: { searchTerm: item.title } });
  };

  const filteredResults = results.filter((item) => {
    const matchesQuery = item.title?.toLowerCase().includes(query.toLowerCase());
    const matchesType = activeType === "all" || item.type === activeType;
    return matchesQuery && matchesType;
  });

  const countByType = (type) =>
    type === "all" ? results.length : results.filter((r) => r.type === type).length;

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">
      <Sidebar />

      <main className="flex-1 p-4 md:p-8">
        <Topbar title="Search" />

        <div className="mx-auto mt-6 max-w-3xl">
          {/* Search input */}
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
              <SearchIcon size={18} />
            </span>
            <input
              type="text"
              placeholder="Search notes, tasks, attendance, classes, notices..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white py-4 pl-12 pr-10 text-slate-900 placeholder:text-slate-400 transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute inset-y-0 right-3.5 flex items-center text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Filter chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveType("all")}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                activeType === "all"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "border border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:text-slate-300"
              }`}
            >
              All ({countByType("all")})
            </button>
            {Object.entries(typeConfig).map(([key, cfg]) => (
              <button
                key={key}
                onClick={() => setActiveType(key)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                  activeType === key
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                    : "border border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:text-slate-300"
                }`}
              >
                <cfg.icon size={12} />
                {cfg.label} ({countByType(key)})
              </button>
            ))}
          </div>

          {/* Results */}
          <div className="mt-5">
            {loading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <SkeletonRow key={i} />
                ))}
              </div>
            ) : filteredResults.length > 0 ? (
              <>
                <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
                  {filteredResults.length} result{filteredResults.length !== 1 && "s"}
                </p>
                <div className="space-y-3">
                  {filteredResults.map((item, index) => {
                    const config = typeConfig[item.type];
                    const Icon = config?.icon;
                    return (
                      <div
                        key={index}
                        onClick={() => handleResultClick(item)}
                        className="group flex items-center gap-3.5 rounded-xl border border-slate-200/80 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-lg hover:shadow-slate-900/5 cursor-pointer dark:border-slate-800 dark:bg-slate-900"
                      >
                        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${config?.accent}`}>
                          {Icon && <Icon size={16} />}
                        </span>
                        <div className="flex-1">
                          <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
                            {config?.label}
                          </p>
                          <h3 className="font-medium text-slate-900 dark:text-white">
                            {item.title}
                          </h3>
                        </div>
                        <ArrowRight
                          size={16}
                          className="shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-teal-600 dark:text-slate-600"
                        />
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200/80 bg-white py-14 text-center dark:border-slate-800 dark:bg-slate-900">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
                  <SearchIcon size={20} />
                </span>
                <p className="mt-3 font-medium text-slate-700 dark:text-slate-300">
                  No results found
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Try a different search term or category.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Search;