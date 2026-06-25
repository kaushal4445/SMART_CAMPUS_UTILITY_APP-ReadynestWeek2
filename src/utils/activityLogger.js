export const addActivity = (action) => {
  const activities =
    JSON.parse(localStorage.getItem("activities")) || [];

  activities.unshift({
    id: Date.now(),
    action,
    time: new Date().toLocaleString(),
  });

  localStorage.setItem(
    "activities",
    JSON.stringify(activities)
  );
};