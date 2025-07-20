export const generateDateQuery = (dateRange) => {
  if (!dateRange || dateRange.length !== 2) return "";

  const [from, to] = dateRange;
  const from_date = from?.format("YYYY-MM-DD");
  const to_date = to?.format("YYYY-MM-DD");

  if (!from_date || !to_date) return "";

  return `from_date=${from_date}&to_date=${to_date}`;
};
