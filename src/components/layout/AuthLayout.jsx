import { Link } from "react-router-dom";

function Logomark({ light }) {
  return (
    <span
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
        light
          ? "bg-white/15"
          : "bg-gradient-to-br from-teal-500 to-teal-700"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="M12 4 3 8l9 4 9-4-9-4Z"
          stroke="white"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M7 10.5V16c0 1 2.2 2.2 5 2.2s5-1.2 5-2.2v-5.5"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M20 9v5" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function MiniDashboard() {
  return (
    <div className="relative mx-auto mt-10 w-full max-w-xs">
      <div className="hero-float-slow absolute -left-2 top-6 w-[85%] rotate-[-5deg] rounded-xl border border-white/10 bg-white/10 p-3.5 backdrop-blur-sm">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-white/50">
          Today
        </p>
        <div className="mt-2 flex items-center gap-2 text-xs text-white/80">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-300" />
          9:00 — Data Structures
        </div>
      </div>

      <div className="hero-float relative ml-auto w-[88%] rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-teal-200">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
              <path
                d="M4 19h3v-7H4v7Zm6.5 0h3V8h-3v11ZM17 19h3v-4h-3v4Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div>
            <p className="text-xs font-semibold text-white">92% attendance</p>
            <p className="text-[10px] text-white/50">Across 6 subjects</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes heroFloatSlow { 0%,100% { transform: rotate(-5deg) translateY(0); } 50% { transform: rotate(-5deg) translateY(6px); } }
        .hero-float { animation: heroFloat 6s ease-in-out infinite; }
        .hero-float-slow { animation: heroFloatSlow 7s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hero-float, .hero-float-slow { animation: none; }
        }
      `}</style>
    </div>
  );
}

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-900/10 lg:grid-cols-2">
        {/* Left Side */}
        <div className="relative hidden flex-col justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-teal-800 p-12 text-white lg:flex">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          <div className="relative">
            <div className="flex items-center gap-2.5">
              <Logomark light />
              <span className="font-display text-xl font-semibold tracking-tight">
                Smart Campus
              </span>
            </div>

            <h1 className="mt-12 font-display text-4xl font-bold leading-tight">
              Everything campus,
              <br />
              one login away.
            </h1>

            <p className="mt-4 max-w-sm text-slate-300">
              Attendance, assignments, timetable, notes and notices — in one
              modern platform built for your day.
            </p>

            <MiniDashboard />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col justify-center p-8 sm:p-12">
          <Link to="/" className="mb-8 flex items-center gap-2.5 lg:hidden">
            <Logomark />
            <span className="font-display text-lg font-semibold tracking-tight text-slate-900">
              Smart Campus
            </span>
          </Link>

          <h2 className="font-display text-3xl font-bold text-slate-900">
            {title}
          </h2>
          <p className="mt-2 text-slate-500">{subtitle}</p>

          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;