import { useState, useEffect } from "react";

function AddClassModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}) {
  const [formData, setFormData] = useState({
    subject: "",
    day: "Monday",
    time: "",
    room: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        subject: "",
        day: "Monday",
        time: "",
        room: "",
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.subject ||
      !formData.day ||
      !formData.time ||
      !formData.room
    ) {
      alert("Please fill all fields");
      return;
    }

    onSave(formData);

    setFormData({
      subject: "",
      day: "Monday",
      time: "",
      room: "",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6">
        
        <h2 className="text-2xl font-bold mb-4">
          {initialData ? "Edit Class" : "Add New Class"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Subject"
            value={formData.subject}
            onChange={(e) =>
              setFormData({
                ...formData,
                subject: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg"
          />

          <select
            value={formData.day}
            onChange={(e) =>
              setFormData({
                ...formData,
                day: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg"
          >
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
          </select>

          <input
            type="time"
            value={formData.time}
            onChange={(e) =>
              setFormData({
                ...formData,
                time: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Room Number"
            value={formData.room}
            onChange={(e) =>
              setFormData({
                ...formData,
                room: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg"
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              {initialData ? "Update" : "Save"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default AddClassModal;