import { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";

function AIAssistant() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");

  const generateContent = () => {
    if (!topic) return;

    setResult(`
📘 Topic: ${topic}

Definition:
${topic} is an important concept in Computer Science.

Key Points:
• Introduction to ${topic}
• Features of ${topic}
• Advantages of ${topic}
• Applications of ${topic}

Viva Questions:
1. What is ${topic}?
2. Explain the advantages of ${topic}.
3. Where is ${topic} used?

Quiz:
1. Define ${topic}.
2. Explain any two features.
3. Mention real-world applications.
    `);
  };

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-gray-900">
      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">
          🤖 AI Study Assistant
        </h1>

        <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow p-6">

          <input
            type="text"
            placeholder="Enter Topic (DBMS, Java, OS...)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full border rounded-lg p-3 mb-4 dark:bg-gray-700"
          />

          <button
            onClick={generateContent}
            className="bg-teal-600 text-white px-5 py-3 rounded-lg"
          >
            Generate Study Material
          </button>

          {result && (
            <div className="mt-6 whitespace-pre-wrap bg-slate-100 dark:bg-gray-700 p-4 rounded-lg">
              {result}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default AIAssistant;