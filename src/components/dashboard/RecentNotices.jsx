import { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";

function RecentNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("notices")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.log("NOTICES ERROR:", error);
    } else {
      setNotices(data || []);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">
        📢 Recent Notices
      </h2>

      {loading ? (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          Loading notices...
        </div>
      ) : notices.length === 0 ? (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          No notices available.
        </div>
      ) : (
        <div className="space-y-4">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="border-b dark:border-gray-700 pb-4"
            >
              <h3 className="font-semibold text-lg dark:text-white">
                {notice.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {notice.description}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                {new Date(
                  notice.created_at
                ).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentNotices;