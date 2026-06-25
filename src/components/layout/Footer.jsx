import { Link } from "react-router-dom";

function IconBadge({ children }) {
  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/5 text-teal-400">
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5">
        {children}
      </svg>
    </span>
  );
}

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Features", to: "#features" },
  { label: "About", to: "#about" },
  { label: "Contact", to: "#contact" },
];

const productLinks = [
  "Attendance",
  "Assignments",
  "Timetable",
  "Notes",
  "Notice Board",
];

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-900 pt-16 text-slate-300">
      {/* subtle dot-grid texture, echoes Stats section */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-700">
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
                  <path
                    d="M20 9v5"
                    stroke="white"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="font-display text-xl font-semibold tracking-tight text-white">
                Smart <span className="text-teal-400">Campus</span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-400">
              One platform for attendance, assignments, notes and timetable —
              built so your day runs from a single tab, not six.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.to.startsWith("#") ? (
                    <a
                      href={link.to}
                      className="text-slate-400 transition hover:text-teal-400"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.to}
                      className="text-slate-400 transition hover:text-teal-400"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Product / Features */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Inside the app
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {productLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#features"
                    className="text-slate-400 transition hover:text-teal-400"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href="mailto:support@smartcampus.com"
                  className="flex items-center gap-3 text-slate-400 transition hover:text-teal-400"
                >
                  <IconBadge>
                    <path
                      d="M3 6h18v12H3V6Zm0 0 9 7 9-7"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </IconBadge>
                  support@smartcampus.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 text-slate-400 transition hover:text-teal-400"
                >
                  <IconBadge>
                    <path
                      d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </IconBadge>
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <IconBadge>
                  <path
                    d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <circle
                    cx="12"
                    cy="9.5"
                    r="2.2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    fill="none"
                  />
                </IconBadge>
                India
              </li>
            </ul>
          </div>
        </div>

        <div className="my-10 h-px bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-4 pb-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            © 2026 Smart Campus Utility App. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
            </span>
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;