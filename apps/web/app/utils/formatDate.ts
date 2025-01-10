export function formatDate(date: { year: number; month: number; day: number }): string {
  return `${String(date.year)}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;
}
