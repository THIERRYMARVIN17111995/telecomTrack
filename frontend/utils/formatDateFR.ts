export function formatDateFR(isoDate: string): string {
  const date = new Date(isoDate);

  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
