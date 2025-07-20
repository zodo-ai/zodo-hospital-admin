export function formatDate(isoString) {
  const date = new Date(isoString);
  // Convert to local date and time
  const readableDate = date.toLocaleString();
  return readableDate;
}
