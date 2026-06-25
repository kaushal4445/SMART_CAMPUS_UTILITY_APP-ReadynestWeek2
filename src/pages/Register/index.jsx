import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import { supabase } from "../../config/supabase";

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName || !email || !password) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      });

      if (error) {
        setErrorMsg(error.message);
        return;
      }

      if (data?.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      setFullName("");
      setEmail("");
      setPassword("");

      navigate("/dashboard");
    } catch (err) {
      console.error("REGISTER ERROR:", err);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join Smart Campus in a few seconds"
    >
      <form onSubmit={handleRegister} className="space-y-5" noValidate>
        {errorMsg && (
          <div className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700">
            <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
              <path
                d="M12 8v5M12 16h.01"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            {errorMsg}
          </div>
        )}

        {/* Full name */}
        <div>
          <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-slate-700">
            Full name
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-400">
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none">
                <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
                <path
                  d="M5.5 20a6.5 6.5 0 0 1 13 0"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <input
              id="fullName"
              type="text"
              placeholder="Your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="name"
              className="w-full rounded-lg border border-slate-300 py-3 pl-10.5 pr-3.5 text-slate-900 placeholder:text-slate-400 transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
            Email
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-400">
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none">
                <path
                  d="M3 6h18v12H3V6Zm0 0 9 7 9-7"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <input
              id="email"
              type="email"
              placeholder="you@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full rounded-lg border border-slate-300 py-3 pl-10.5 pr-3.5 text-slate-900 placeholder:text-slate-400 transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
            Password
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-400">
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none">
                <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className="w-full rounded-lg border border-slate-300 py-3 pl-10.5 pr-11 text-slate-900 placeholder:text-slate-400 transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-3.5 flex items-center text-slate-400 transition hover:text-slate-600"
            >
              {showPassword ? (
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none">
                  <path
                    d="M3 3l18 18M10.6 10.6a2.5 2.5 0 0 0 3.5 3.5M9.5 5.4A10.4 10.4 0 0 1 12 5c5 0 9 4 10.5 7-0.6 1.2-1.5 2.5-2.7 3.7M6.2 6.6C4 8.1 2.5 10.3 1.5 12c1.5 3 5.5 7 10.5 7 1.2 0 2.4-.2 3.5-.6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none">
                  <path
                    d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 py-3 font-semibold text-white transition-all duration-200 hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-600/25 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
        >
          {loading && (
            <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
              <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          )}
          {loading ? "Creating account..." : "Create account"}
        </button>

        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-teal-600 hover:text-teal-700 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Register;