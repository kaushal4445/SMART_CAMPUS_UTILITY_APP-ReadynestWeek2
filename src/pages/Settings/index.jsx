import Sidebar from "../../components/dashboard/Sidebar";

function Settings() {

  const clearAssignments = () => {
    localStorage.removeItem("assignments");
    alert("Assignments Cleared");
  };

  const clearNotices = () => {
    localStorage.removeItem("notices");
    alert("Notices Cleared");
  };

  const clearActivities = () => {
    localStorage.removeItem("activities");
    alert("Activities Cleared");
  };

  const resetApp = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset all data?"
    );

    if (confirmReset) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-gray-900">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow p-6">

          <h1 className="text-3xl font-bold mb-6">
            ⚙️ Settings
          </h1>

          <div className="space-y-4">

            <button
              onClick={clearAssignments}
              className="w-full bg-yellow-500 text-white p-3 rounded-lg"
            >
              Clear Assignments
            </button>

            <button
              onClick={clearNotices}
              className="w-full bg-orange-500 text-white p-3 rounded-lg"
            >
              Clear Notices
            </button>

            <button
              onClick={clearActivities}
              className="w-full bg-blue-500 text-white p-3 rounded-lg"
            >
              Clear Activities
            </button>

            <button
              onClick={resetApp}
              className="w-full bg-red-600 text-white p-3 rounded-lg"
            >
              Reset Entire App
            </button>

          </div>
        </div>
      </main>
    </div>
  );
}

export default Settings;