import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Timetable from "./pages/Timetable";
import Attendance from "./pages/Attendance";
import Tasks from "./pages/Tasks";
import Notes from "./pages/Notes";
import Notices from "./pages/Notices";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Assignments from "./pages/Assignments";
import Analytics from "./pages/Analytics";
import Notifications from "./pages/Notifications";
import Activity from "./pages/Activity";
import Achievements from "./pages/Achievements";
import GoalTracker from "./pages/GoalTracker";
import Search from "./pages/Search";
import ExportPage from "./pages/Export";
import AIAssistant from "./pages/AIAssistant";
import Leaderboard from "./pages/Leaderboard";
import Reports from "./pages/Reports";
import CGPA from "./pages/CGPA";
import Admin from "./pages/Admin";
import AdminRoute from "./components/AdminRoute";


function App() {


  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
<Route
  path="/tasks"
  element={
    <ProtectedRoute>
      <Assignments />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin"
  element={
    <AdminRoute>
      <Admin />
    </AdminRoute>
  }
/>
      <Route path="/ai-assistant" element={<AIAssistant />} />
      <Route path="/timetable" element={<Timetable />} />
      <Route path="/assignments" element={<ProtectedRoute><Assignments /></ProtectedRoute>} />
      <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/cgpa" element={<CGPA />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/export" element={<ExportPage />} />
      <Route path="/notices" element={<Notices />} />
      <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/goals" element={<GoalTracker />} />
      <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
      <Route path="/activity" element={<Activity />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;