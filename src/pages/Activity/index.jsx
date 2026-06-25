import Sidebar from "../../components/dashboard/Sidebar";

function Activity() {
  const activities =
    JSON.parse(localStorage.getItem("activities")) || [];

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-gray-900">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow p-6">

          <h1 className="text-3xl font-bold mb-6">
            📜 Activity Timeline
          </h1>

          {activities.length === 0 ? (
            <p>No Activities Yet</p>
          ) : (
            activities.map((item) => (
              <div
                key={item.id}
                className="border-l-4 border-teal-500 pl-4 mb-4"
              >
                <h3 className="font-semibold">
                  {item.action}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.time}
                </p>
              </div>
            ))
          )}

        </div>
      </main>
    </div>
  );
}

export default Activity;