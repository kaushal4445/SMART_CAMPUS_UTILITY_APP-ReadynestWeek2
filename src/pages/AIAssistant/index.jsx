import { useState } from "react";
import {
  Sparkles,
  BookOpen,
  ListChecks,
  MessageCircleQuestion,
  ClipboardCheck,
} from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

const quickTopics = ["DBMS", "Java", "Operating Systems", "Computer Networks"];

function ResultSection({ icon: Icon, title, children }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/60">
      <div className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300">
          <Icon size={16} />
        </span>
        <h3 className="font-display font-semibold text-slate-900 dark:text-white">
          {title}
        </h3>
      </div>
      <div className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {children}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-teal-50 text-teal-500 dark:bg-teal-900/30 dark:text-teal-300">
        <Sparkles size={24} />
      </span>
      <p className="mt-4 font-medium text-slate-700 dark:text-slate-300">
        Enter a topic to get started
      </p>
      <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
        Generate a quick definition, key points, viva questions, and a short
        quiz — all from one topic.
      </p>
    </div>
  );
}

function AIAssistant() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const generateContent = () => {
    if (!topic.trim() || loading) return;

    setLoading(true);
    setTimeout(() => {
      setResult({
        topic,
        definition: `${topic} is an important concept in Computer Science.`,
        keyPoints: [
          `Introduction to ${topic}`,
          `Features of ${topic}`,
          `Advantages of ${topic}`,
          `Applications of ${topic}`,
        ],
        viva: [
          `What is ${topic}?`,
          `Explain the advantages of ${topic}.`,
          `Where is ${topic} used?`,
        ],
        quiz: [
          `Define ${topic}.`,
          `Explain any two features.`,
          `Mention real-world applications.`,
        ],
      });
      setLoading(false);
    }, 500);
  };

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">
      <Sidebar />

      <main className="flex-1 p-4 md:p-8">
        <Topbar title="AI Study Assistant" />

        <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-300">
              <Sparkles size={18} />
            </span>
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Generate study material
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Notes, viva questions, and a quiz — in seconds.
              </p>
            </div>
          </div>

          {/* Input */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Enter a topic (DBMS, Java, OS...)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generateContent()}
              className="flex-1 rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
            <button
              onClick={generateContent}
              disabled={!topic.trim() || loading}
              className="flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-5 py-3 font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {loading ? (
                <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                  <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              ) : (
                <Sparkles size={16} />
              )}
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>

          {/* Quick topics */}
          <div className="mt-3 flex flex-wrap gap-2">
            {quickTopics.map((t) => (
              <button
                key={t}
                onClick={() => setTopic(t)}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600 transition hover:border-teal-300 hover:text-teal-700 dark:border-slate-700 dark:text-slate-300"
              >
                {t}
              </button>
            ))}
          </div>

          {/* Result */}
          <div className="mt-6">
            {!result ? (
              <EmptyState />
            ) : (
              <div className="space-y-4">
                <p className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  {result.topic}
                </p>

                <ResultSection icon={BookOpen} title="Definition">
                  <p>{result.definition}</p>
                </ResultSection>

                <ResultSection icon={ListChecks} title="Key Points">
                  <ul className="space-y-1.5">
                    {result.keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </ResultSection>

                <ResultSection icon={MessageCircleQuestion} title="Viva Questions">
                  <ol className="space-y-1.5">
                    {result.viva.map((q, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="font-semibold text-teal-600 dark:text-teal-400">
                          {i + 1}.
                        </span>
                        {q}
                      </li>
                    ))}
                  </ol>
                </ResultSection>

                <ResultSection icon={ClipboardCheck} title="Quiz">
                  <ol className="space-y-1.5">
                    {result.quiz.map((q, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="font-semibold text-teal-600 dark:text-teal-400">
                          {i + 1}.
                        </span>
                        {q}
                      </li>
                    ))}
                  </ol>
                </ResultSection>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AIAssistant;