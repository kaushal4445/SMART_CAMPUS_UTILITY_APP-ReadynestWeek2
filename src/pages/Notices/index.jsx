import { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";

function Notices() {
  const [noticeText, setNoticeText] = useState("");

  const [notices, setNotices] = useState(() => {
    const saved = localStorage.getItem("notices");
    return saved ? JSON.parse(saved) : [];
  });

  const addNotice = () => {
    if (!noticeText) return;

    const newNotice = {
      id: Date.now(),
      text: noticeText,
      pinned: false,
      date: new Date().toLocaleDateString(),
    };

    const updated = [newNotice, ...notices];

    setNotices(updated);
    localStorage.setItem(
      "notices",
      JSON.stringify(updated)
    );

    setNoticeText("");
  };

  const deleteNotice = (id) => {
    const updated = notices.filter(
      (item) => item.id !== id
    );

    setNotices(updated);

    localStorage.setItem(
      "notices",
      JSON.stringify(updated)
    );
  };

  const togglePin = (id) => {
    const updated = notices.map((item) =>
      item.id === id
        ? { ...item, pinned: !item.pinned }
        : item
    );

    setNotices(updated);

    localStorage.setItem(
      "notices",
      JSON.stringify(updated)
    );
  };

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-gray-900">
      <Sidebar />

      <main className="flex-1 p-6">

        <h1 className="text-4xl font-bold mb-6 dark:text-white">
          📢 Notice Board
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">

          <input
            type="text"
            placeholder="Enter Notice..."
            value={noticeText}
            onChange={(e) =>
              setNoticeText(e.target.value)
            }
            className="w-full border p-3 rounded-lg dark:bg-gray-700 dark:text-white"
          />

          <button
            onClick={addNotice}
            className="mt-4 bg-teal-600 text-white px-5 py-3 rounded-lg"
          >
            Add Notice
          </button>

        </div>

        <div className="space-y-4">

          {notices.map((notice) => (
            <div
              key={notice.id}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow"
            >
              <div className="flex justify-between items-center">

                <div>
                  <h3 className="font-bold dark:text-white">
                    {notice.pinned && "📌 "}
                    {notice.text}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {notice.date}
                  </p>
                </div>

                <div className="flex gap-2">

                  <button
                    onClick={() =>
                      togglePin(notice.id)
                    }
                    className="bg-yellow-500 text-white px-3 py-2 rounded"
                  >
                    📌
                  </button>

                  <button
                    onClick={() =>
                      deleteNotice(notice.id)
                    }
                    className="bg-red-500 text-white px-3 py-2 rounded"
                  >
                    Delete
                  </button>

                </div>

              </div>
            </div>
          ))}

        </div>

      </main>
    </div>
  );
}

export default Notices;