export const formatTime = (time) => {
  if (!time) return "";

  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;

  return `${hour}:${m.toString().padStart(2, "0")}${period}`;
};
