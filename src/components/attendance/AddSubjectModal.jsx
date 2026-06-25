import { useState, useEffect } from "react";

function AddSubjectModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}) {
  const [formData, setFormData] = useState({
    subject: "",
    present: "",
    absent: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        subject: "",
        present: "",
        absent: "",
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...formData,
      present: Number(formData.present),
      absent: Number(formData.absent),
    });

    onClose();
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">

        <h2 className="text-2xl font-bold mb-4">
          {initialData
            ? "Edit Subject"
            : "Add Subject"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Subject Name"
            value={formData.subject}
            onChange={(e) =>
              setFormData({
                ...formData,
                subject: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Present Classes"
            value={formData.present}
            onChange={(e) =>
              setFormData({
                ...formData,
                present: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Absent Classes"
            value={formData.absent}
            onChange={(e) =>
              setFormData({
                ...formData,
                absent: e.target.value,
              })
            }
            className="w-full border p-3 rounded-lg"
          />

          <div className="flex justify-end gap-2">

            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-teal-600 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default AddSubjectModal;