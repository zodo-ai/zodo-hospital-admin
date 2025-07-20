export const categorizeSlots = (slots) => {
  const morning = [];
  const afternoon = [];
  const evening = [];

  slots.forEach((slot) => {
    const hour = parseInt(slot.startTime.split(":")[0], 10);

    if (hour >= 5 && hour < 12) {
      morning.push(slot);
    } else if (hour >= 12 && hour < 17) {
      afternoon.push(slot);
    } else if (hour >= 17 && hour < 21) {
      evening.push(slot);
    }
  });

  return { morning, afternoon, evening };
};
