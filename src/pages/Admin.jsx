import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import { supabase } from "../config/supabase";

function Admin() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notices, setNotices] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingNotice, setAddingNotice] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    await Promise.all([
      fetchNotices(),
      fetchUsers(),
    ]);

    setLoading(false);
  };

  const fetchNotices = async () => {
    const { data, error } = await supabase
      .from("notices")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setNotices(data || []);
  };

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setUsers(data || []);
  };

  const addNotice = async () => {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    setAddingNotice(true);

    try {
      const { error: noticeError } = await supabase
        .from("notices")
        .insert([{ title, description }]);

      if (noticeError) throw noticeError;

      const { error: notificationError } = await supabase
        .from("notifications")
        .insert([{ message: `🔔 New Notice: ${title}` }]);

      if (notificationError) throw notificationError;

      alert("✅ Notice Added Successfully");

      setTitle("");
      setDescription("");

      await fetchNotices();
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setAddingNotice(false);
    }
  };

  const deleteNotice = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmDelete) return;

    try {
      const { data, error } = await supabase
        .from("notices")
        .delete()
        .eq("id", id)
        .select();

      if (error) throw error;

      alert("✅ Notice Deleted Successfully");

      await fetchNotices();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("profiles")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("User Deleted Successfully");

    fetchUsers();
  };

if (loading) {
  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-gray-900">
      <Sidebar />

      <main className="flex-1 p-6 animate-pulse">

        {/* Header */}
        <div className="h-10 w-72 bg-gray-300 dark:bg-gray-700 rounded-xl mb-8"></div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow"
            >
              <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-600 rounded"></div>
            </div>
          ))}
        </div>

        {/* Add Notice Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-8">
          <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>

          <div className="space-y-4">
            <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>

            <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>

            <div className="h-12 w-40 bg-gray-400 dark:bg-gray-600 rounded-lg"></div>
          </div>
        </div>

        {/* Notices Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-8">
          <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="border dark:border-gray-700 rounded-xl p-4 mb-4 flex justify-between items-center"
            >
              <div>
                <div className="h-5 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 w-72 bg-gray-200 dark:bg-gray-600 rounded"></div>
              </div>

              <div className="h-10 w-24 bg-red-300 dark:bg-red-800 rounded-lg"></div>
            </div>
          ))}
        </div>

        {/* Users Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="h-8 w-56 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="border dark:border-gray-700 rounded-xl p-4 mb-4 flex justify-between items-center"
            >
              <div>
                <div className="h-5 w-40 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-600 rounded"></div>
              </div>

              <div className="h-10 w-28 bg-red-300 dark:bg-red-800 rounded-lg"></div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-gray-900">
      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold dark:text-white mb-6">
          👑 Admin Panel
        </h1>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-xl shadow">
            <h2 className="font-bold text-xl">📢 Manage Notices</h2>
            <p className="text-gray-500 mt-2">{notices.length} Total Notices</p>
          </div>

          <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-xl shadow">
            <h2 className="font-bold text-xl">👥 View Users</h2>
            <p className="text-gray-500 mt-2">{users.length} Registered Users</p>
          </div>

          <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-xl shadow">
            <h2 className="font-bold text-xl">📊 Reports</h2>
            <p className="text-gray-500 mt-2">Coming Soon</p>
          </div>

        </div>

        {/* Add Notice */}
        <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow p-6 mb-8">

          <h2 className="text-2xl font-bold mb-4">➕ Add Notice</h2>

          <div className="space-y-4">

            <input
              type="text"
              placeholder="Notice Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg p-3 dark:bg-gray-700 dark:border-gray-600"
            />

            <textarea
              placeholder="Notice Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full border rounded-lg p-3 dark:bg-gray-700 dark:border-gray-600"
            />

            <button
              onClick={addNotice}
              disabled={addingNotice}
              className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white px-5 py-3 rounded-lg transition-all"
            >
              {addingNotice ? "⏳ Adding Notice..." : "➕ Add Notice"}
            </button>

          </div>

        </div>

        {/* Notices */}
        <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow p-6 mb-8">

          <h2 className="text-2xl font-bold mb-4">📢 All Notices</h2>

          {notices.length > 0 ? (
            <div className="space-y-4">
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className="border dark:border-gray-700 rounded-xl p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold text-lg">{notice.title}</h3>
                    <p className="text-gray-500 dark:text-gray-300">{notice.description}</p>
                  </div>

                  <button
                    onClick={() => deleteNotice(notice.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No notices found.</p>
          )}

        </div>

        {/* Users */}
        <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow p-6">

          <h2 className="text-2xl font-bold mb-4">👥 Registered Users</h2>

          {users.length > 0 ? (
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="border dark:border-gray-700 rounded-xl p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold text-lg">
                      {user.full_name || "Unknown User"}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-300">
                      Department: {user.department || "N/A"}
                    </p>
                    <p className="text-gray-500 dark:text-gray-300">
                      Year: {user.year || "N/A"}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete User
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No users found.</p>
          )}

        </div>

      </main>
    </div>
  );
}

export default Admin;