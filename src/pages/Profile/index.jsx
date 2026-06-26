import { useState, useEffect } from "react";
import { User, Mail, Building2, GraduationCap, StickyNote, CheckSquare, Calendar } from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import { supabase } from "../../config/supabase";
import { addActivity } from "../../utils/activityLogger";

function getInitials(name) {
  return name
    .trim()
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    department: "",
    year: "",
    joined: "",
  });

  const [notesCount, setNotesCount] = useState(0);
  const [tasksCount, setTasksCount] = useState(0);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);

    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) {
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authUser.id)
      .single();

    setUser({
      name:
        profile?.full_name ||
        authUser.user_metadata?.full_name ||
        authUser.email?.split("@")[0] ||
        "Student",
      email: authUser.email || "",
      department: profile?.department || "Computer Science",
      year: profile?.year || "3rd Year",
      joined: new Date(authUser.created_at).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
    });

    fetchNotesCount(authUser.id);
    fetchTasksCount(authUser.id);

    setLoading(false);
  };

  const fetchNotesCount = async (userId) => {
    const { count } = await supabase
      .from("notes")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);
    setNotesCount(count || 0);
  };

  const fetchTasksCount = async (userId) => {
    const { count } = await supabase
      .from("tasks")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);
    setTasksCount(count || 0);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setErrorMsg("");
    setSaving(true);

    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) {
      setSaving(false);
      return;
    }

    const { error } = await supabase.from("profiles").upsert({
      id: authUser.id,
      full_name: user.name,
      department: user.department,
      year: user.year,
    });

    setSaving(false);

    if (error) {
      console.log(error);
      setErrorMsg(error.message);
      return;
    }

    addActivity("Profile updated");
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">
        <Sidebar />
        <main className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <svg viewBox="0 0 24 24" className="h-7 w-7 animate-spin text-teal-600" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
              <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <p className="text-sm text-slate-500 dark:text-slate-400">Loading profile...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100 transition-colors duration-300 dark:bg-slate-950">
      <Sidebar />

      <main className="flex-1 p-4 md:p-8">
        <Topbar title="Profile" />

        <div className="mx-auto mt-6 max-w-4xl">
          {/* Header banner */}
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className="h-24 bg-gradient-to-r from-teal-600 to-teal-800" />
            <div className="flex flex-col items-center px-6 pb-6 sm:flex-row sm:items-end sm:gap-5">
              <span className="-mt-10 grid h-20 w-20 shrink-0 place-items-center rounded-full border-4 border-white bg-teal-50 font-display text-2xl font-bold text-teal-700 dark:border-slate-900 dark:bg-teal-900/40 dark:text-teal-300">
                {getInitials(user.name || "S")}
              </span>
              <div className="mt-3 text-center sm:mt-0 sm:pt-2 sm:text-left">
                <h1 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  {user.name}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
              </div>
              <div className="mt-3 flex items-center gap-2 sm:ml-auto sm:mt-0 sm:pt-2">
                <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
                  {user.department}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {user.year}
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-300">
                <StickyNote size={18} />
              </span>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Total Notes</p>
                <p className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  {notesCount}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300">
                <CheckSquare size={18} />
              </span>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Total Tasks</p>
                <p className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  {tasksCount}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-300">
                <Calendar size={18} />
              </span>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Member Since</p>
                <p className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  {user.joined}
                </p>
              </div>
            </div>
          </div>

          {/* Edit form */}
          <div className="mt-5 rounded-2xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Edit details
            </h2>

            {saved && (
              <div className="mt-4 flex items-center gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3.5 py-3 text-sm text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-400">
                <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none">
                  <path
                    d="m5 13 4 4 10-10"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Profile saved successfully
              </div>
            )}

            {errorMsg && (
              <div className="mt-4 flex items-center gap-2.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400">
                <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                {errorMsg}
              </div>
            )}

            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Full Name
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-400">
                    <User size={16} />
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 py-3 pl-10.5 pr-3.5 text-slate-900 transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-400">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-50 py-3 pl-10.5 pr-3.5 text-slate-500 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Department
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-400">
                    <Building2 size={16} />
                  </span>
                  <input
                    type="text"
                    name="department"
                    value={user.department}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 py-3 pl-10.5 pr-3.5 text-slate-900 transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Academic Year
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-400">
                    <GraduationCap size={16} />
                  </span>
                  <input
                    type="text"
                    name="year"
                    value={user.year}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 py-3 pl-10.5 pr-3.5 text-slate-900 transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 py-3 font-semibold text-white transition-all duration-200 hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-600/25 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
              >
                {saving && (
                  <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                )}
                {saving ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;