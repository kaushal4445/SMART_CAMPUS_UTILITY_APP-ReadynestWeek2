import { useState, useEffect } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import { supabase } from "../../config/supabase";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

const fetchNotes = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", user.id)
    .order("id", { ascending: false });

  if (error) {
    console.log(error);
  } else {
    setNotes(data);
  }
};
  
const addNote = async () => {
  if (!title || !content) return;

  // Get logged in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("Please login first");
    return;
  }
console.log("CURRENT USER:", user);
console.log("USER ID:", user.id);
  const { data, error } = await supabase
    .from("notes")
    .insert([
      {
        title,
        content,
        file_name: file ? file.name : null,
        user_id: user.id, // Save user id
      },
    ])
    .select();

  console.log("INSERT DATA:", data);
  console.log("INSERT ERROR:", error);

  if (!error) {
    setTitle("");
    setContent("");
    setFile(null);
    fetchNotes();
  }
};
  const deleteNote = async (id) => {
    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("id", id);

    if (!error) {
      fetchNotes();
    }
  };

  const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];

  if (!selectedFile) return;

  setFile(selectedFile);
};

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-gray-900">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow p-6">

          <h1 className="text-3xl font-bold mb-6">
            📒 Notes Manager
          </h1>

          <div className="space-y-4 mb-8">

            <input
              type="text"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg p-3 dark:bg-gray-700"
            />

            <textarea
              rows="4"
              placeholder="Write your note..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border rounded-lg p-3 dark:bg-gray-700"
            />

            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border rounded-lg p-3 dark:bg-gray-700"
            />

            {file && (
              <div className="text-green-500">
                📎 {file.name}
              </div>
            )}

            <button
              onClick={addNote}
              className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-lg"
            >
              Add Note
            </button>

          </div>

          <div className="grid md:grid-cols-2 gap-4">

            {notes.length === 0 ? (
              <div className="col-span-2 text-center text-gray-500 py-10">
                No Notes Added Yet 📭
              </div>
            ) : (
              notes.map((note) => (
                <div
                  key={note.id}
                  className="border rounded-xl p-4 dark:border-gray-700 bg-slate-50 dark:bg-gray-700"
                >
                  <h3 className="text-xl font-bold">
                    {note.title}
                  </h3>

                  <p className="mt-2">
                    {note.content}
                  </p>

                  {note.file_name && (
                    <p className="mt-3 text-blue-500">
                      📎 {note.file_name}
                    </p>
                  )}

                  <p className="text-sm text-gray-500 mt-4">
                    Created: {new Date(note.created_at).toLocaleDateString()}
                  </p>

                  <button
                    onClick={() => deleteNote(note.id)}
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}

          </div>

        </div>
      </main>
    </div>
  );
}

export default Notes;