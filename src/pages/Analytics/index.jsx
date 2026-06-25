import { useEffect, useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import { supabase } from "../../config/supabase";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// ── Custom tooltip for Pie ──────────────────────────────────────────────────
const PieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="analytics-tooltip">
        <span className="tooltip-label">{payload[0].name}</span>
        <span className="tooltip-value">{payload[0].value}</span>
      </div>
    );
  }
  return null;
};

// ── Custom tooltip for Bar ──────────────────────────────────────────────────
const BarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="analytics-tooltip">
        <span className="tooltip-label">{label}</span>
        <span className="tooltip-value">{payload[0].value}%</span>
      </div>
    );
  }
  return null;
};

// ── Stat Card ───────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, accent, subtext }) {
  return (
    <div className="stat-card" style={{ "--accent": accent }}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-body">
        <span className="stat-label">{label}</span>
        <span className="stat-value">{value}</span>
        {subtext && <span className="stat-sub">{subtext}</span>}
      </div>
      <div className="stat-glow" />
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────
function Analytics() {
  const [notes, setNotes] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }

    const [notesRes, tasksRes, attendanceRes] = await Promise.all([
      supabase.from("notes").select("*").eq("user_id", user.id),
      supabase.from("tasks").select("*").eq("user_id", user.id),
      supabase.from("attendance").select("*").eq("user_id", user.id),
    ]);

    if (notesRes.data) setNotes(notesRes.data);
    if (tasksRes.data) setTasks(tasksRes.data);
    if (attendanceRes.data) setAttendance(attendanceRes.data);
    setLoading(false);
  };

  const totalPresent = attendance.reduce((s, i) => s + Number(i.present), 0);
  const totalAbsent  = attendance.reduce((s, i) => s + Number(i.absent),  0);
  const attendancePercentage =
    totalPresent + totalAbsent > 0
      ? Math.round((totalPresent / (totalPresent + totalAbsent)) * 100)
      : 0;

  const productivityScore = tasks.length * 5 + notes.length * 2 + attendance.length * 10;

  const attendanceData =
    totalPresent + totalAbsent > 0
      ? [{ name: "Present", value: totalPresent }, { name: "Absent", value: totalAbsent }]
      : [{ name: "No Data", value: 1 }];

  const subjectData = attendance.map((item) => ({
    subject: item.subject,
    attendance:
      Number(item.present) + Number(item.absent) > 0
        ? Math.round((Number(item.present) / (Number(item.present) + Number(item.absent))) * 100)
        : 0,
  }));

  const PIE_COLORS  = ["#6EE7B7", "#F87171"];
  const atRisk      = attendancePercentage < 75;
  const healthColor = atRisk ? "#F87171" : "#6EE7B7";

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-100 dark:bg-gray-900">
        <h2 className="text-2xl font-bold dark:text-white">
          Loading Analytics...
        </h2>
      </div>
    );
  }

  return (
    <>
      <style>{`
        /* ── Reset & base ────────────────────────────── */
        .analytics-root {
          display: flex;
          min-height: 100vh;
          background: #0f1117;
          font-family: 'Inter', system-ui, sans-serif;
          color: #e2e8f0;
        }

        /* ── Loading ────────────────────────────────── */
        .analytics-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: #0f1117;
          color: #94a3b8;
          gap: 1rem;
        }
        .loading-ring {
          width: 48px; height: 48px;
          border: 3px solid #1e2535;
          border-top-color: #818cf8;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Main layout ─────────────────────────────── */
        .analytics-main {
          flex: 1;
          padding: 2.5rem 2rem;
          max-width: 1200px;
        }

        /* ── Page header ─────────────────────────────── */
        .page-header {
          display: flex;
          flex-direction: column;
          gap: .25rem;
          margin-bottom: 2.5rem;
        }
        .page-eyebrow {
          font-size: .7rem;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: #818cf8;
          font-weight: 600;
        }
        .page-title {
          font-size: 2rem;
          font-weight: 800;
          color: #f1f5f9;
          letter-spacing: -.02em;
          line-height: 1.15;
        }
        .page-title span {
          background: linear-gradient(90deg, #818cf8, #6ee7b7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Stat cards grid ─────────────────────────── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .stat-card {
          position: relative;
          overflow: hidden;
          background: #161b27;
          border: 1px solid #1e2535;
          border-radius: 16px;
          padding: 1.25rem 1.25rem 1.1rem;
          display: flex;
          flex-direction: column;
          gap: .6rem;
          transition: transform .2s, border-color .2s;
        }
        .stat-card:hover {
          transform: translateY(-3px);
          border-color: var(--accent);
        }
        .stat-glow {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          background: radial-gradient(circle at 80% 20%, var(--accent) 0%, transparent 65%);
          opacity: .07;
          pointer-events: none;
        }
        .stat-icon {
          font-size: 1.4rem;
          line-height: 1;
        }
        .stat-body {
          display: flex;
          flex-direction: column;
          gap: .15rem;
        }
        .stat-label {
          font-size: .7rem;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: #64748b;
          font-weight: 600;
        }
        .stat-value {
          font-size: 2rem;
          font-weight: 800;
          color: var(--accent);
          line-height: 1;
          letter-spacing: -.03em;
        }
        .stat-sub {
          font-size: .72rem;
          color: #475569;
          margin-top: .2rem;
        }

        /* ── Charts row ──────────────────────────────── */
        .charts-row {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 1.25rem;
          margin-bottom: 1.25rem;
        }
        @media (max-width: 860px) {
          .charts-row { grid-template-columns: 1fr; }
        }

        .chart-card {
          background: #161b27;
          border: 1px solid #1e2535;
          border-radius: 16px;
          padding: 1.5rem;
        }
        .chart-title {
          font-size: .85rem;
          font-weight: 700;
          letter-spacing: .06em;
          text-transform: uppercase;
          color: #94a3b8;
          margin-bottom: 1.25rem;
        }

        /* ── Pie legend ──────────────────────────────── */
        .pie-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .pie-legend {
          display: flex;
          gap: 1.5rem;
          margin-top: .75rem;
        }
        .legend-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          margin-top: 3px;
          flex-shrink: 0;
        }
        .legend-item {
          display: flex;
          align-items: flex-start;
          gap: .45rem;
          font-size: .78rem;
          color: #64748b;
        }
        .legend-item strong { color: #e2e8f0; display: block; font-size: .95rem; }

        /* ── Attendance health badge ─────────────────── */
        .health-badge {
          display: inline-flex;
          align-items: center;
          gap: .4rem;
          padding: .25rem .75rem;
          border-radius: 9999px;
          font-size: .72rem;
          font-weight: 700;
          letter-spacing: .06em;
          text-transform: uppercase;
          background: color-mix(in srgb, var(--hc) 12%, transparent);
          color: var(--hc);
          border: 1px solid color-mix(in srgb, var(--hc) 25%, transparent);
          margin-bottom: 1.25rem;
        }

        /* ── Insights card ───────────────────────────── */
        .insights-card {
          background: #161b27;
          border: 1px solid #1e2535;
          border-radius: 16px;
          padding: 1.5rem;
        }
        .insights-title {
          font-size: .85rem;
          font-weight: 700;
          letter-spacing: .06em;
          text-transform: uppercase;
          color: #94a3b8;
          margin-bottom: 1.25rem;
        }
        .insights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: .75rem;
        }
        .insight-row {
          display: flex;
          align-items: center;
          gap: .75rem;
          padding: .85rem 1rem;
          background: #0f1117;
          border-radius: 10px;
          border: 1px solid #1e2535;
        }
        .insight-icon {
          font-size: 1.1rem;
          flex-shrink: 0;
        }
        .insight-text {
          display: flex;
          flex-direction: column;
        }
        .insight-key {
          font-size: .68rem;
          text-transform: uppercase;
          letter-spacing: .08em;
          color: #475569;
          font-weight: 600;
        }
        .insight-val {
          font-size: 1.05rem;
          font-weight: 700;
          color: #e2e8f0;
          line-height: 1.2;
        }

        /* ── Recharts overrides ──────────────────────── */
        .analytics-tooltip {
          background: #1e2535;
          border: 1px solid #2d3748;
          border-radius: 8px;
          padding: .5rem .85rem;
          display: flex;
          flex-direction: column;
          gap: .1rem;
          font-size: .82rem;
        }
        .tooltip-label { color: #94a3b8; }
        .tooltip-value { color: #e2e8f0; font-weight: 700; font-size: 1rem; }
      `}</style>

      <div className="analytics-root">
        <Sidebar />

        <main className="analytics-main">
          {/* Header */}
          <div className="page-header">
            <span className="page-eyebrow">Performance overview</span>
            <h1 className="page-title">Your <span>Analytics</span></h1>
          </div>

          {/* Stat cards */}
          <div className="stats-grid">
            <StatCard icon="✅" label="Tasks" value={tasks.length} accent="#818cf8" subtext="tracked" />
            <StatCard icon="📒" label="Notes" value={notes.length} accent="#38bdf8" subtext="created" />
            <StatCard icon="📚" label="Subjects" value={attendance.length} accent="#a78bfa" subtext="monitored" />
            <StatCard
              icon="🎯"
              label="Attendance"
              value={`${attendancePercentage}%`}
              accent={healthColor}
              subtext={atRisk ? "Below 75% — at risk" : "Looking good"}
            />
            <StatCard icon="🚀" label="Score" value={productivityScore} accent="#f59e0b" subtext="productivity pts" />
          </div>

          {/* Charts */}
          <div className="charts-row">
            {/* Pie */}
            <div className="chart-card">
              <p className="chart-title">Attendance Split</p>
              <div className="pie-wrapper">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={attendanceData}
                      dataKey="value"
                      innerRadius={55}
                      outerRadius={90}
                      paddingAngle={3}
                      stroke="none"
                    >
                      {attendanceData.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>

                <div className="pie-legend">
                  {attendanceData[0].name !== "No Data" ? (
                    <>
                      <div className="legend-item">
                        <div className="legend-dot" style={{ background: "#6EE7B7" }} />
                        <div>
                          <strong>{totalPresent}</strong>
                          Present
                        </div>
                      </div>
                      <div className="legend-item">
                        <div className="legend-dot" style={{ background: "#F87171" }} />
                        <div>
                          <strong>{totalAbsent}</strong>
                          Absent
                        </div>
                      </div>
                    </>
                  ) : (
                    <span style={{ color: "#475569", fontSize: ".8rem" }}>No attendance data yet</span>
                  )}
                </div>
              </div>
            </div>

            {/* Bar */}
            <div className="chart-card">
              <p className="chart-title">Per-Subject Attendance</p>
              {subjectData.length > 0 ? (
                <>
                  <div
                    className="health-badge"
                    style={{ "--hc": healthColor }}
                  >
                    <span>{atRisk ? "⚠ At risk" : "✓ Healthy"}</span>
                    {attendancePercentage}% overall
                  </div>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={subjectData} barSize={28}>
                      <defs>
                        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#818cf8" stopOpacity={1} />
                          <stop offset="100%" stopColor="#6ee7b7" stopOpacity={0.8} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e2535" vertical={false} />
                      <XAxis
                        dataKey="subject"
                        tick={{ fill: "#64748b", fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fill: "#64748b", fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => `${v}%`}
                        domain={[0, 100]}
                      />
                      <Tooltip content={<BarTooltip />} cursor={{ fill: "#1e2535" }} />
                      <Bar dataKey="attendance" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </>
              ) : (
                <p style={{ color: "#475569", fontSize: ".85rem", marginTop: "4rem", textAlign: "center" }}>
                  No subject data yet. Add attendance records to see this chart.
                </p>
              )}
            </div>
          </div>

          {/* Insights */}
          <div className="insights-card">
            <p className="insights-title">Quick Insights</p>
            <div className="insights-grid">
              {[
                { icon: "✅", key: "Tasks logged",       val: tasks.length },
                { icon: "📒", key: "Notes written",      val: notes.length },
                { icon: "🎯", key: "Attendance rate",    val: `${attendancePercentage}%` },
                { icon: "📚", key: "Subjects tracked",   val: attendance.length },
                { icon: "🚀", key: "Productivity score", val: productivityScore },
              ].map(({ icon, key, val }) => (
                <div className="insight-row" key={key}>
                  <span className="insight-icon">{icon}</span>
                  <div className="insight-text">
                    <span className="insight-key">{key}</span>
                    <span className="insight-val">{val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Analytics;