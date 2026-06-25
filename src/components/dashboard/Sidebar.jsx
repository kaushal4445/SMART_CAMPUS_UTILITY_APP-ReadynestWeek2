import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";
import {
  Search as SearchIcon,
  FileDown,
  Bot,
  Award,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Calendar,
  CheckSquare,
  ClipboardList,
  Bell,
  StickyNote,
  User,
  Settings,
  Shield,
  Sun,
  Moon,
  BellRing,
  BarChart3,
  History,
  LogOut,
  Trophy,
  Target,
  Menu,
  X,
} from "lucide-react";
import { supabase } from "../../config/supabase";

const sections = [
  {
    label: "Overview",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
      { icon: SearchIcon, label: "Search", path: "/search" },
      { icon: BarChart3, label: "Analytics", path: "/analytics" },
    ],
  },
  {
    label: "Academics",
    items: [
      { icon: Calendar, label: "Timetable", path: "/timetable" },
      { icon: ClipboardList, label: "Attendance", path: "/attendance" },
      { icon: GraduationCap, label: "CGPA", path: "/cgpa" },
      { icon: FileText, label: "Reports", path: "/reports" },
    ],
  },
  {
    label: "Productivity",
    items: [
      { icon: CheckSquare, label: "Tasks", path: "/assignments" },
      { icon: StickyNote, label: "Notes", path: "/notes" },
      { icon: Target, label: "Goals", path: "/goals" },
      { icon: History, label: "Activity", path: "/activity" },
    ],
  },
  {
    label: "Community",
    items: [
      { icon: Bell, label: "Notices", path: "/notices" },
      { icon: Trophy, label: "Achievements", path: "/achievements" },
      { icon: Award, label: "Leaderboard", path: "/leaderboard" },
      { icon: BellRing, label: "Notifications", path: "/notifications" },
    ],
  },
  {
    label: "Tools",
    items: [
      { icon: Bot, label: "AI Assistant", path: "/ai-assistant" },
      { icon: FileDown, label: "Export", path: "/export" },
    ],
  },
  {
    label: "Account",
    items: [
      { icon: User, label: "Profile", path: "/profile" },
      { icon: Settings, label: "Settings", path: "/settings" },
      { icon: Shield, label: "Admin", path: "/admin" },
    ],
  },
];

function BrandMark() {
  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-700">
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="M12 4 3 8l9 4 9-4-9-4Z"
          stroke="white"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M7 10.5V16c0 1 2.2 2.2 5 2.2s5-1.2 5-2.2v-5.5"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M20 9v5" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useTheme();

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-xl bg-teal-600 p-2.5 text-white shadow-lg shadow-teal-600/30 lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 flex min-h-screen w-64 flex-col
          bg-slate-900 text-white dark:bg-slate-950
          transition-transform duration-300 lg:static
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between gap-2.5 border-b border-white/10 p-5">
          <div className="flex items-center gap-2.5">
            <BrandMark />
            <span className="font-display text-lg font-semibold tracking-tight">
              Smart Campus
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-5">
          {sections.map((section) => (
            <div key={section.label}>
              <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {section.label}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg border-l-2 px-3 py-2.5 text-sm transition-all duration-200 ${
                        isActive
                          ? "border-teal-400 bg-teal-500/10 font-medium text-teal-300"
                          : "border-transparent text-slate-300 hover:bg-white/5 hover:text-white"
                      }`
                    }
                  >
                    <item.icon size={17} />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Theme Toggle */}
        <div className="px-3 pt-2">
          <button
            onClick={toggleTheme}
            className="flex w-full items-center justify-between rounded-lg bg-white/5 px-3 py-2.5 text-sm text-slate-300 transition hover:bg-white/10"
          >
            <span className="flex items-center gap-2.5">
              {darkMode ? <Moon size={16} /> : <Sun size={16} />}
              {darkMode ? "Dark mode" : "Light mode"}
            </span>
            <span
              className={`relative h-5 w-9 rounded-full transition-colors ${
                darkMode ? "bg-teal-600" : "bg-slate-600"
              }`}
            >
              <span
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                  darkMode ? "translate-x-4" : "translate-x-0.5"
                }`}
              />
            </span>
          </button>
        </div>

        {/* Logout */}
        <div className="px-3 py-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 border-t border-white/10 px-5 py-3.5 text-xs text-slate-500">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-400" />
          </span>
          Smart Campus v1.0
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}
    </>
  );
}

export default Sidebar;