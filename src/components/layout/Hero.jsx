import { Link } from "react-router-dom";

function AttendanceRing() {
  const pct = 92;
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14 shrink-0">
      <circle
        cx="32"
        cy="32"
        r={r}
        fill="none"
        stroke="#E2E8F0"
        strokeWidth="6"
      />
      <circle
        cx="32"
        cy="32"
        r={r}
        fill="none"
        stroke="#0D9488"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c - (pct / 100) * c}
        transform="rotate(-90 32 32)"
      />
      <text
        x="32"
        y="36"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill="#0F172A"
      >
        {pct}%
      </text>
    </svg>
  );
}

function DashboardMock() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* ambient backdrop */}
      <div
        aria-hidden="true"
        className="absolute -inset-10 -z-10 rounded-[3rem] bg-gradient-to-br from-teal-200/60 via-teal-100/40 to-amber-100/40 blur-2xl"
      />

      {/* back card: timetable strip */}
      <div className="hero-float-slow absolute -left-4 top-10 w-[88%] rotate-[-6deg] rounded-2xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-900/5 sm:-left-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Today
        </p>
        <ul className="mt-2 space-y-2 text-sm">
          <li className="flex items-center gap-2 text-slate-700">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
            9:00 — Data Structures
          </li>
          <li className="flex items-center gap-2 text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
            11:00 — Linear Algebra
          </li>
        </ul>
      </div>

      {/* front card: attendance + notice */}
      <div className="hero-float relative ml-auto w-[92%] rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/10">
        <div className="flex items-center gap-4">
          <AttendanceRing />
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Attendance on track
            </p>
            <p className="text-xs text-slate-500">Across 6 subjects</p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
          </span>
          <p className="text-xs font-medium text-amber-800">
            New notice: Fee deadline extended
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5">
          <p className="text-xs font-medium text-slate-600">
            Assignment · DBMS Lab
          </p>
          <span className="text-xs font-semibold text-teal-600">
            Due tomorrow
          </span>
        </div>
      </div>

      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes heroFloatSlow {
          0%, 100% { transform: rotate(-6deg) translateY(0); }
          50% { transform: rotate(-6deg) translateY(8px); }
        }
        .hero-float { animation: heroFloat 6s ease-in-out infinite; }
        .hero-float-slow { animation: heroFloatSlow 7s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hero-float, .hero-float-slow { animation: none; }
        }
      `}</style>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:gap-12 lg:px-10 lg:py-28">
        {/* Left Content */}
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1.5 text-xs font-semibold text-teal-700">
            Built for one campus, every day
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Smart <span className="text-teal-600">Campus</span>
            <br />
            Utility App
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-slate-600 lg:mx-0">
            Attendance, assignments, timetable, notes, and notices — out of
            six different apps and into one place that actually fits how
            your week runs.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              to="/login"
              className="rounded-full bg-slate-900 px-7 py-3.5 text-center font-semibold text-white shadow-lg shadow-slate-900/10 transition-all duration-200 hover:bg-teal-600 hover:shadow-teal-600/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              Get Started
            </Link>

            <a
              href="#features"
              className="rounded-full border border-slate-300 px-7 py-3.5 text-center font-semibold text-slate-700 transition hover:border-teal-600 hover:text-teal-700"
            >
              See features
            </a>
          </div>

          <div className="mt-10 flex items-center justify-center gap-8 lg:justify-start">
            <div>
              <p className="font-display text-2xl font-bold text-slate-900">6</p>
              <p className="text-xs text-slate-500">tools in one app</p>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div>
              <p className="font-display text-2xl font-bold text-slate-900">1</p>
              <p className="text-xs text-slate-500">login, zero clutter</p>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div>
              <p className="font-display text-2xl font-bold text-slate-900">24/7</p>
              <p className="text-xs text-slate-500">always up to date</p>
            </div>
          </div>
        </div>

        {/* Right Content: product mockup, not a stock photo */}
        <DashboardMock />
      </div>
    </section>
  );
}

export default Hero;