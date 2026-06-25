import { Plus } from "lucide-react";
import { useState, useEffect } from "react";

import Sidebar from "../../components/dashboard/Sidebar";
import AddClassModal from "../../components/timetable/AddClassModal";
import TimetableCalendar from "../../components/timetablecalendar/TimetableCalendar";

import { supabase } from "../../config/supabase";

function Timetable() {
  const [classes, setClasses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("timetable")
      .select("*")
      .eq("user_id", user.id)
      .order("id", { ascending: false });

    if (error) {
      console.log("FETCH ERROR:", error);
    } else {
      setClasses(data || []);
    }

    setLoading(false);
  };

  const addClass = async (newClass) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first");
      return;
    }

    const { error } = await supabase
      .from("timetable")
      .insert([
        {
          subject: newClass.subject,
          day: newClass.day,
          time: newClass.time,
          room: newClass.room,
          user_id: user.id,
        },
      ]);

    if (error) {
      console.log(error);
      alert(error.message);
    } else {
      fetchClasses();
      setIsModalOpen(false);
    }
  };

  const updateClass = async (updatedClass) => {
    const { error } = await supabase
      .from("timetable")
      .update({
        subject: updatedClass.subject,
        day: updatedClass.day,
        time: updatedClass.time,
        room: updatedClass.room,
      })
      .eq("id", updatedClass.id);

    if (error) {
      console.log(error);
      alert(error.message);
    } else {
      fetchClasses();
      setEditingClass(null);
    }
  };

  const deleteClass = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this class?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("timetable")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
      alert(error.message);
    } else {
      fetchClasses();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-100 dark:bg-gray-900">
        <h2 className="text-2xl font-bold dark:text-white">
          Loading Timetable...
        </h2>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-gray-900">
      <Sidebar />

      <main className="flex-1 p-4 md:p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold dark:text-white">
            📅 Timetable
          </h1>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
          >
            <Plus size={18} />
            Add Class
          </button>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-500 text-white p-4 rounded-xl shadow">
            <h3>Total Classes</h3>
            <p className="text-3xl font-bold">{classes.length}</p>
          </div>

          <div className="bg-green-500 text-white p-4 rounded-xl shadow">
            <h3>Monday Classes</h3>
            <p className="text-3xl font-bold">
              {classes.filter((c) => c.day === "Monday").length}
            </p>
          </div>

          <div className="bg-purple-500 text-white p-4 rounded-xl shadow">
            <h3>Tuesday Classes</h3>
            <p className="text-3xl font-bold">
              {classes.filter((c) => c.day === "Tuesday").length}
            </p>
          </div>

          <div className="bg-orange-500 text-white p-4 rounded-xl shadow">
            <h3>Rooms Used</h3>
            <p className="text-3xl font-bold">
              {new Set(classes.map((c) => c.room)).size}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100 dark:bg-gray-700">
              <tr>
                <th className="p-4 text-left">Subject</th>
                <th className="p-4 text-left">Day</th>
                <th className="p-4 text-left">Time</th>
                <th className="p-4 text-left">Room</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {classes.length > 0 ? (
                classes.map((cls) => (
                  <tr
                    key={cls.id}
                    className="border-t dark:border-gray-700"
                  >
                    <td className="p-4">{cls.subject}</td>
                    <td className="p-4">{cls.day}</td>
                    <td className="p-4">{cls.time}</td>
                    <td className="p-4">{cls.room}</td>

                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingClass(cls)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteClass(cls.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="p-8 text-center text-gray-500"
                  >
                    📅 No classes added yet.
                    <br />
                    Click "Add Class" to create your timetable.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Calendar */}
        <div className="mt-6">
          <TimetableCalendar />
        </div>

        {/* Add Modal */}
        <AddClassModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={addClass}
        />

        {/* Edit Modal */}
        <AddClassModal
          isOpen={!!editingClass}
          onClose={() => setEditingClass(null)}
          onSave={updateClass}
          initialData={editingClass}
        />
      </main>
    </div>
  );
}

export default Timetable;