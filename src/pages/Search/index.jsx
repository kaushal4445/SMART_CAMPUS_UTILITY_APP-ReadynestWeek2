import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/dashboard/Sidebar";
import { supabase } from "../../config/supabase";

function Search() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
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

    const [
      notesRes,
      tasksRes,
      attendanceRes,
      timetableRes,
      noticesRes,
    ] = await Promise.all([
      supabase
        .from("notes")
        .select("*")
        .eq("user_id", user.id),

      supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id),

      supabase
        .from("attendance")
        .select("*")
        .eq("user_id", user.id),

      supabase
        .from("timetable")
        .select("*")
        .eq("user_id", user.id),

      supabase
        .from("notices")
        .select("*"),
    ]);

    const allResults = [
      ...(notesRes.data || []).map((item) => ({
        type: "📝 Note",
        title: item.title,
      })),

      ...(tasksRes.data || []).map((item) => ({
        type: "✅ Task",
        title:
          item.title ||
          item.task ||
          item.name ||
          "Untitled Task",
      })),

      ...(attendanceRes.data || []).map((item) => ({
        type: "🎯 Attendance",
        title:
          item.subject ||
          item.course ||
          "Unknown Subject",
      })),

      ...(timetableRes.data || []).map((item) => ({
        type: "📅 Class",
        title: item.subject,
      })),

      ...(noticesRes.data || []).map((item) => ({
        type: "📢 Notice",
        title: item.title,
      })),
    ];

    setResults(allResults);
    setLoading(false);
  };

const handleResultClick = (item) => {
  switch (item.type) {
    case "📝 Note":
      navigate("/notes", {
        state: {
          searchTerm: item.title,
        },
      });
      break;

    case "✅ Task":
      navigate("/tasks", {
        state: {
          searchTerm: item.title,
        },
      });
      break;

    case "🎯 Attendance":
      navigate("/attendance", {
        state: {
          searchTerm: item.title,
        },
      });
      break;

    case "📅 Class":
      navigate("/timetable", {
        state: {
          searchTerm: item.title,
        },
      });
      break;

    case "📢 Notice":
      navigate("/notices", {
        state: {
          searchTerm: item.title,
        },
      });
      break;

    default:
      break;
  }
};
  const filteredResults = results.filter((item) =>
    item.title
      ?.toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-gray-900">
      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">
          🔍 Global Search
        </h1>

        <input
          type="text"
          placeholder="Search notes, tasks, attendance, classes, notices..."
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          className="w-full border rounded-lg p-4 mb-6 dark:bg-gray-700 dark:text-white"
        />

        {loading ? (
          <div className="text-center py-10 dark:text-white">
            Loading...
          </div>
        ) : (
          <div className="space-y-3">
            {filteredResults.length > 0 ? (
              filteredResults.map(
                (item, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      handleResultClick(item)
                    }
                    className="bg-white dark:bg-gray-800 dark:text-white rounded-xl p-4 shadow cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
                  >
                    <span className="text-sm text-teal-600 font-bold">
                      {item.type}
                    </span>

                    <div className="flex justify-between items-center mt-1">
                      <h3 className="font-semibold text-lg">
                        {item.title}
                      </h3>

                      <span className="text-teal-500 text-xl font-bold">
                        →
                      </span>
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center text-gray-500 dark:text-gray-400">
                No results found.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default Search;