function StatCard({ title, value, color = "text-teal-600", icon: Icon }) {
  const iconBg = `${color.replace("text-", "bg-")}/10`;

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {title}
        </h3>

        {Icon && (
          <span
            className={`grid h-9 w-9 place-items-center rounded-lg ${iconBg} ${color}`}
          >
            <Icon size={17} />
          </span>
        )}
      </div>

      <p className="mt-3 font-display text-3xl font-bold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

export default StatCard;