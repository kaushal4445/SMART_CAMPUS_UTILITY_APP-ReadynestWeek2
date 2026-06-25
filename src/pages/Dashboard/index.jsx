import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardList, CheckSquare, StickyNote, Calendar } from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";
import ScheduleTable from "../../components/dashboard/ScheduleTable";
import UpcomingTasks from "../../components/dashboard/UpcomingTasks";
import RecentNotices from "../../components/dashboard/RecentNotices";

import { supabase } from "../../config/supabase";

function GreetingIcon({ period }) {
  if (period === "morning") {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-amber-500" fill="none">
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.7" />
        <path
          d="M12 2.5v2.5M12 19v2.5M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2.5 12H5M19 12h2.5M4.2 19.8 6 18M18 6l1.8-1.8"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (period === "afternoon") {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-teal-500" fill="none">
        <circle cx="9" cy="13" r="4" stroke="currentColor" strokeWidth="1.7" />
        <path
          d="M9 5.5V7M2.5 13H4M14 13h1.5M3.8 8.3 5 9.3M14.2 8.3 13 9.3"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M13 16.5a5 5 0 0 0 7-7"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 text-indigo-400" fill="none">
      <path
        d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Dashboard() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("Student");
  const [notesCount, setNotesCount] = useState(0);
  const [tasksCount, setTasksCount] = useState(0);
  const [attendancePercent, setAttendancePercent] = useState(0);
  const [classesToday, setClassesToday] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    fetchProfile(user.id, user);
    fetchNotesCount(user.id);
    fetchTasksCount(user.id);
    fetchAttendance(user.id);
    fetchClassesToday(user.id);
  };

  const fetchProfile = async (userId, authUser) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.log("PROFILE ERROR:", error);
      setUserName(
        authUser?.user_metadata?.full_name ||
          authUser?.email?.split("@")[0] ||
          "Student"
      );
      return;
    }

    setUserName(
      data?.full_name ||
        authUser?.user_metadata?.full_name ||
        authUser?.email?.split("@")[0] ||
        "Student"
    );
  };

  const fetchClassesToday = async (userId) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = days[new Date().getDay()];

    const { data, error } = await supabase
      .from("timetable")
      .select("*")
      .eq("user_id", userId)
      .eq("day", today);

    if (error) {
      console.log("TIMETABLE ERROR:", error);
      return;
    }

    setClassesToday(data?.length || 0);
  };

  const fetchNotesCount = async (userId) => {
    const { count, error } = await supabase
      .from("notes")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    if (error) {
      console.log("NOTES COUNT ERROR:", error);
    } else {
      setNotesCount(count || 0);
    }
  };

  const fetchTasksCount = async (userId) => {
    const { count, error } = await supabase
      .from("tasks")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    if (error) {
      console.log("TASK COUNT ERROR:", error);
    } else {
      setTasksCount(count || 0);
    }
  };

  const fetchAttendance = async (userId) => {
    const { data, error } = await supabase
      .from("attendance")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.log("ATTENDANCE FETCH ERROR:", error);
      return;
    }

    if (!data || data.length === 0) {
      setAttendancePercent(0);
      return;
    }

    const totalPresent = data.reduce((sum, item) => sum + Number(item.present), 0);
    const totalClasses = data.reduce(
      (sum, item) => sum + Number(item.present) + Number(item.absent),
      0
    );

    const percentage =
      totalClasses > 0 ? Math.round((totalPresent / totalClasses) * 100) : 0;

    setAttendancePercent(percentage);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: "Good morning", period: "morning" };
    if (hour < 18) return { text: "Good afternoon", period: "afternoon" };
    return { text: "Good evening", period: "evening" };
  };

  const greeting = getGreeting();

  return (
    <div className="flex min-h-screen bg-slate-100 transition-colors duration-300 dark:bg-slate-950">
      <Sidebar />

      <main className="flex-1 p-4 md:p-8">
        <Topbar />

        {/* Greeting card */}
        <div className="mt-6 flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-slate-50 dark:bg-slate-800">
            <GreetingIcon period={greeting.period} />
          </span>
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              {greeting.text}, {userName}
            </h1>
            <p className="mt-1 text-slate-500 dark:text-slate-400">
              Welcome back to your Smart Campus dashboard. Let's make today
              productive.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Attendance"
            value={`${attendancePercent}%`}
            color="text-teal-600"
            icon={ClipboardList}
          />
          <StatCard
            title="Tasks Due"
            value={tasksCount}
            color="text-amber-500"
            icon={CheckSquare}
          />
          <StatCard
            title="Notes"
            value={notesCount}
            color="text-sky-500"
            icon={StickyNote}
          />
          <StatCard
            title="Classes Today"
            value={classesToday}
            color="text-violet-500"
            icon={Calendar}
          />
        </div>

        {/* Schedule + Tasks */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ScheduleTable />
          <UpcomingTasks />
        </div>

        {/* Notices */}
        <div className="mt-6">
          <RecentNotices />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;