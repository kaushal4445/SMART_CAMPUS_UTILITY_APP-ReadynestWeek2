import { Link } from "react-router-dom";

const features = [
  {
    title: "Attendance",
    description: "Track your attendance easily with live percentage.",
    icon: (
      <path
        d="M4 19h3v-7H4v7Zm6.5 0h3V8h-3v11ZM17 19h3v-4h-3v4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    title: "Assignments",
    description: "Manage assignments and never miss deadlines.",
    icon: (
      <>
        <rect
          x="5"
          y="4"
          width="14"
          height="17"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
        />
        <path
          d="M9 3.5h6v2H9v-2ZM9 10h6M9 14h6M9 18h3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    title: "Timetable",
    description: "View your daily and weekly class schedule.",
    icon: (
      <>
        <rect
          x="4"
          y="5"
          width="16"
          height="15"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
        />
        <path
          d="M4 9h16M8 3v3M16 3v3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M8 13h2M11 13h2M14 13h2M8 16h2M11 16h2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    title: "Notes",
    description: "Store and access study materials anytime.",
    icon: (
      <>
        <path
          d="M6 4h9l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M14 4v4h5M9 12h6M9 15.5h6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    title: "Notice Board",
    description: "Get the latest campus announcements instantly.",
    icon: (
      <>
        <path
          d="M5 11v4a1 1 0 0 0 1 1h2l3 4v-9"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M11 7 19 4v12l-8-3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
          fill="none"
        />
        <path d="M19 9h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Profile",
    description: "Manage your student profile securely.",
    icon: (
      <>
        <circle
          cx="12"
          cy="8"
          r="3.2"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
        />
        <path
          d="M5.5 20a6.5 6.5 0 0 1 13 0"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
      </>
    ),
  },
];

function Features() {
  return (
    <section id="features" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-600">
            What's inside
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            Our Features
          </h2>
          <p className="mt-3 text-slate-500">
            Everything you need to manage your campus life, in one place.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-slate-900/5"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-teal-50 text-teal-600 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                <svg viewBox="0 0 24 24" className="h-6 w-6">
                  {feature.icon}
                </svg>
              </span>

              <h3 className="mt-5 font-display text-xl font-semibold text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-slate-500">
                {feature.description}
              </p>

              <Link
                to="/login"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                Open
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;