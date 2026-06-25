import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: 5000,
    suffix: "+",
    title: "Students",
    icon: (
      <path
        d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    value: 150,
    suffix: "+",
    title: "Faculty",
    icon: (
      <path
        d="M12 3 3 7l9 4 9-4-9-4ZM6 9.5V15c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V9.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    value: 50,
    suffix: "+",
    title: "Departments",
    icon: (
      <path
        d="M4 21V8l8-5 8 5v13M9 21v-6h6v6M4 21h16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    value: 99,
    suffix: "%",
    title: "Satisfaction",
    icon: (
      <path
        d="m5 13 4 4 10-10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
];

function useCountUp(target, active) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      setValue(target);
      return;
    }

    const duration = 1200;
    const start = performance.now();

    let frame;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return value;
}

function StatItem({ stat }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp(stat.value, active);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-3 px-6 py-10 text-center lg:py-0"
    >
      <span className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-teal-300">
        <svg viewBox="0 0 24 24" className="h-5 w-5">
          {stat.icon}
        </svg>
      </span>

      <p className="font-display text-4xl font-bold text-white md:text-5xl">
        {count.toLocaleString()}
        {stat.suffix}
      </p>

      <p className="text-sm font-medium uppercase tracking-wider text-slate-400">
        {stat.title}
      </p>
    </div>
  );
}

function Stats() {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-4">
      {/* subtle dot-grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-10 max-w-xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
            Across campus
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
            Trusted by the people who run your day
          </h2>
        </div>

        <div className="grid grid-cols-2 divide-y divide-white/10 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {stats.map((stat) => (
            <StatItem key={stat.title} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;