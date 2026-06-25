import { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";

function CGPA() {
  const [subjects, setSubjects] = useState([
    {
      name: "",
      credits: "",
      grade: "",
    },
  ]);

  const addSubject = () => {
    setSubjects([
      ...subjects,
      {
        name: "",
        credits: "",
        grade: "",
      },
    ]);
  };

  const handleChange = (
    index,
    field,
    value
  ) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  const calculateCGPA = () => {
    let totalCredits = 0;
    let totalPoints = 0;

    subjects.forEach((sub) => {
      const credits = Number(sub.credits);

      const gradeMap = {
        O: 10,
        A: 9,
        B: 8,
        C: 7,
        D: 6,
        F: 0,
      };

      const gradePoint =
        gradeMap[sub.grade] || 0;

      totalCredits += credits;
      totalPoints +=
        credits * gradePoint;
    });

    return totalCredits > 0
      ? (
          totalPoints / totalCredits
        ).toFixed(2)
      : 0;
  };

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-gray-900">
      <Sidebar />

      <main className="flex-1 p-6">

        <h1 className="text-3xl font-bold mb-6 dark:text-white">
          🎓 CGPA Calculator
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">

          {subjects.map((subject, index) => (
            <div
              key={index}
              className="grid md:grid-cols-3 gap-4 mb-4"
            >
              <input
                type="text"
                placeholder="Subject"
                value={subject.name}
                onChange={(e) =>
                  handleChange(
                    index,
                    "name",
                    e.target.value
                  )
                }
                className="border p-3 rounded-lg dark:bg-gray-700 dark:text-white"
              />

              <input
                type="number"
                placeholder="Credits"
                value={subject.credits}
                onChange={(e) =>
                  handleChange(
                    index,
                    "credits",
                    e.target.value
                  )
                }
                className="border p-3 rounded-lg dark:bg-gray-700 dark:text-white"
              />

              <select
                value={subject.grade}
                onChange={(e) =>
                  handleChange(
                    index,
                    "grade",
                    e.target.value
                  )
                }
                className="border p-3 rounded-lg dark:bg-gray-700 dark:text-white"
              >
                <option value="">
                  Select Grade
                </option>
                <option>O</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
                <option>F</option>
              </select>
            </div>
          ))}

          <div className="flex gap-4">

            <button
              onClick={addSubject}
              className="bg-blue-500 text-white px-5 py-3 rounded-lg"
            >
              Add Subject
            </button>

            <button
              className="bg-teal-600 text-white px-5 py-3 rounded-lg"
            >
              CGPA: {calculateCGPA()}
            </button>

          </div>

        </div>

      </main>
    </div>
  );
}

export default CGPA;