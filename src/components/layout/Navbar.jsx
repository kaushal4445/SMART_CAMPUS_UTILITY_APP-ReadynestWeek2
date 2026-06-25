import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const navLinks = [
  { label: "Home", to: "/", type: "route" },
  { label: "Features", to: "#features", type: "hash" },
  { label: "About", to: "#about", type: "hash" },
  { label: "Contact", to: "#contact", type: "hash" },
];

function Logomark() {
  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 shadow-sm shadow-teal-900/20">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
        aria-hidden="true"
      >
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
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll while the mobile panel is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const linkBase =
    "relative font-medium text-slate-600 transition-colors hover:text-slate-900 " +
    "after:absolute after:-bottom-1.5 after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2 " +
    "after:rounded-full after:bg-teal-500 after:transition-all after:duration-300 hover:after:w-full";

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5"
          onClick={() => setMenuOpen(false)}
        >
          <Logomark />
          <span className="font-display text-xl font-semibold tracking-tight text-slate-900">
            Smart <span className="text-teal-600">Campus</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) =>
            link.type === "route" ? (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `${linkBase} ${isActive ? "text-slate-900 after:w-full" : ""}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ) : (
              <li key={link.label}>
                <a href={link.to} className={linkBase}>
                  {link.label}
                </a>
              </li>
            )
          )}
        </ul>

        {/* Desktop Login Button */}
        <Link
          to="/login"
          className="hidden items-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-600/25 md:inline-flex focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
        >
          Login
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="relative flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span
            className={`absolute h-[1.5px] w-6 rounded-full bg-slate-900 transition-all duration-300 ${
              menuOpen ? "rotate-45" : "-translate-y-2"
            }`}
          />
          <span
            className={`absolute h-[1.5px] w-6 rounded-full bg-slate-900 transition-all duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute h-[1.5px] w-6 rounded-full bg-slate-900 transition-all duration-300 ${
              menuOpen ? "-rotate-45" : "translate-y-2"
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-slate-200/80 bg-white transition-all duration-300 md:hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link, i) =>
            link.type === "route" ? (
              <li key={link.label} style={{ transitionDelay: `${i * 40}ms` }}>
                <Link
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2.5 font-medium text-slate-700 transition hover:bg-teal-50 hover:text-teal-700"
                >
                  {link.label}
                </Link>
              </li>
            ) : (
              <li key={link.label} style={{ transitionDelay: `${i * 40}ms` }}>
                <a
                  href={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2.5 font-medium text-slate-700 transition hover:bg-teal-50 hover:text-teal-700"
                >
                  {link.label}
                </a>
              </li>
            )
          )}
          <li className="mt-2 px-3">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="block rounded-full bg-slate-900 px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-teal-600"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;