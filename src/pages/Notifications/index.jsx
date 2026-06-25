import { useEffect, useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import { supabase } from "../../config/supabase";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
    } else {
      setNotifications(data || []);
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-gray-900">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow p-6">

          <h1 className="text-3xl font-bold mb-6">
            🔔 Notifications
          </h1>

          {loading ? (
            <div className="text-center py-10 text-gray-500">
              Loading Notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              🎉 No Notifications
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-4 shadow-sm"
                >
                  <p className="font-medium">
                    {item.message}
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(
                      item.created_at
                    ).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default Notifications;