const MONTHS = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec",
];

// Parses strings like "Jun 2025" or "2025" into a sortable number (YYYYMM).
// "Present" sorts after any real date.
export function monthYearToSortable(value: string): number {
  const v = value.trim().toLowerCase();
  if (v === "present") return 999999;

  const parts = v.split(/\s+/);
  if (parts.length === 2) {
    const monthIndex = MONTHS.indexOf(parts[0].slice(0, 3));
    const year = parseInt(parts[1], 10);
    if (!Number.isNaN(year) && monthIndex >= 0) {
      return year * 100 + monthIndex + 1;
    }
  }
  const year = parseInt(v, 10);
  if (!Number.isNaN(year)) return year * 100;
  return 0;
}
