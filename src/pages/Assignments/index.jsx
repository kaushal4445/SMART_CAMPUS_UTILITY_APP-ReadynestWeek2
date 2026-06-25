import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/dashboard/Sidebar";
import { addActivity } from "../../utils/activityLogger";
import { supabase } from "../../config/supabase";

function Assignments() {
  const location = useLocation();

  const searchTerm =
    location.state?.searchTerm?.toLowerCase() || "";

  const [assignments, setAssignments] = useState([]);

  const [form, setForm] = useState({
    title: "",
    dueDate: "",
    reminder: "",
    priority: "Medium",
  });

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setAssignments(data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = async () => {
    if (!form.title || !form.dueDate) {
      alert("Please fill Title and Due Date");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first");
      return;
    }

    const { error } = await supabase
      .from("tasks")
      .insert([
        {
          user_id: user.id,
          title: form.title,
          description: "",
          due_date: form.dueDate,
          status: form.priority,
        },
      ]);

    if (error) {
      console.log(error);
      alert(error.message);
      return;
    }

    addActivity(`📝 Assignment Added: ${form.title}`);

    setForm({
      title: "",
      dueDate: "",
      reminder: "",
      priority: "Medium",
    });

    fetchAssignments();
  };

  const handleDelete = async (id) => {
    const deletedAssignment = assignments.find(
      (item) => item.id === id
    );

    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    addActivity(
      `🗑️ Assignment Deleted: ${deletedAssignment?.title}`
    );

    fetchAssignments();
  };

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-gray-900">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow p-6">

          <h1 className="text-3xl font-bold mb-6">
            📝 Assignment Tracker
          </h1>

          {/* Form */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Assignment Title"
              className="border rounded-lg p-3 dark:bg-gray-700 dark:border-gray-600"
            />

            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="border rounded-lg p-3 dark:bg-gray-700 dark:border-gray-600"
            />

            <input
              type="datetime-local"
              name="reminder"
              value={form.reminder}
              onChange={handleChange}
              className="border rounded-lg p-3 dark:bg-gray-700 dark:border-gray-600"
            />

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="border rounded-lg p-3 dark:bg-gray-700 dark:border-gray-600"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

          </div>

          <button
            onClick={handleAdd}
            className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-lg mb-6"
          >
            Add Assignment
          </button>

          {/* Statistics */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">

            <div className="bg-green-500 text-white p-4 rounded-xl shadow">
              <h3 className="text-sm">
                Total Assignments
              </h3>
              <p className="text-2xl font-bold">
                {assignments.length}
              </p>
            </div>

            <div className="bg-red-500 text-white p-4 rounded-xl shadow">
              <h3 className="text-sm">
                High Priority
              </h3>
              <p className="text-2xl font-bold">
                {
                  assignments.filter(
                    (item) => item.status === "High"
                  ).length
                }
              </p>
            </div>

            <div className="bg-blue-500 text-white p-4 rounded-xl shadow">
              <h3 className="text-sm">
                Due Tasks
              </h3>
              <p className="text-2xl font-bold">
                {assignments.length}
              </p>
            </div>

          </div>

          {/* Assignment List */}
          <div className="space-y-4">

            {assignments.length > 0 ? (
              assignments.map((item) => {
                const isMatched =
                  searchTerm &&
                  item.title?.toLowerCase() === searchTerm;

                return (
                  <div
                    key={item.id}
                    className={`rounded-xl p-5 flex justify-between items-center shadow border
                    ${
                      isMatched
                        ? "bg-yellow-100 border-yellow-500 dark:bg-yellow-900"
                        : "bg-slate-50 dark:bg-gray-700 dark:border-gray-600"
                    }`}
                  >
                    <div>

                      <h3 className="text-lg font-bold">
                        {item.title}
                      </h3>

                      {isMatched && (
                        <p className="text-yellow-600 font-semibold">
                          🔍 Search Result
                        </p>
                      )}

                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        📅 Due: {item.due_date}
                      </p>

                      <span
                        className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                          item.status === "High"
                            ? "bg-red-100 text-red-600"
                            : item.status === "Medium"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {item.status}
                      </span>

                    </div>

                    <button
                      onClick={() =>
                        handleDelete(item.id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>
                );
              })
            ) : (
              <div className="text-center py-10">
                <h2 className="text-xl font-bold text-gray-500">
                  No Assignments Yet 📚
                </h2>

                <p className="text-gray-400 mt-2">
                  Add your first assignment above.
                </p>
              </div>
            )}

          </div>

        </div>
      </main>
    </div>
  );
}

export default Assignments;