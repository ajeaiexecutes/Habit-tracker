export function getMonthDays(year: number, month: number) {
  const date = new Date(year, month + 1, 0); // last day of month
  const totalDays = date.getDate();

  return Array.from({ length: totalDays }, (_, i) => i + 1);
}
