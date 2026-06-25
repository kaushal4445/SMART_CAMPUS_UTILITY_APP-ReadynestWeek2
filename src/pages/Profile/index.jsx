import { useState, useEffect } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import { supabase } from "../../config/supabase";
import { addActivity } from "../../utils/activityLogger";

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

      department:
        profile?.department ||
        "Computer Science",

      year:
        profile?.year ||
        "3rd Year",

      joined: new Date(
        authUser.created_at
      ).toLocaleDateString(),
    });

    fetchNotesCount(authUser.id);
    fetchTasksCount(authUser.id);

    setLoading(false);
  };

  const fetchNotesCount = async (userId) => {
    const { count } = await supabase
      .from("notes")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", userId);

    setNotesCount(count || 0);
  };

  const fetchTasksCount = async (userId) => {
    const { count } = await supabase
      .from("tasks")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", userId);

    setTasksCount(count || 0);
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) return;

    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: authUser.id,
        full_name: user.name,
        department: user.department,
        year: user.year,
      });

    if (error) {
      console.log(error);
      alert(error.message);
      return;
    }

    addActivity("👤 Profile Updated");

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-100 dark:bg-gray-900">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <h2 className="text-xl dark:text-white">
            Loading Profile...
          </h2>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-gray-900 transition-all duration-300">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow p-6">

          <h1 className="text-3xl font-bold mb-6">
            👤 My Profile
          </h1>

          {saved && (
            <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 border border-green-300">
              ✅ Profile saved successfully!
            </div>
          )}

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">

            <div className="bg-blue-500 text-white p-4 rounded-xl">
              <h3>Total Notes</h3>
              <p className="text-3xl font-bold">
                {notesCount}
              </p>
            </div>

            <div className="bg-green-500 text-white p-4 rounded-xl">
              <h3>Total Tasks</h3>
              <p className="text-3xl font-bold">
                {tasksCount}
              </p>
            </div>

            <div className="bg-purple-500 text-white p-4 rounded-xl">
              <h3>Joined</h3>
              <p className="text-lg font-bold">
                {user.joined}
              </p>
            </div>

          </div>

          <div className="space-y-4">

            <div>
              <label className="block mb-1 font-medium">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Email Address
              </label>

              <input
                type="email"
                value={user.email}
                disabled
                className="w-full border rounded-lg p-3 bg-gray-100 dark:bg-gray-700"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Department
              </label>

              <input
                type="text"
                name="department"
                value={user.department}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Academic Year
              </label>

              <input
                type="text"
                name="year"
                value={user.year}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Save Profile
            </button>

          </div>

        </div>
      </main>
    </div>
  );
}

export default Profile;