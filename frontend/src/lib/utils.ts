export function formatDate(date: Date) {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (now.getTime() > date.getTime()) {
    return {
      text: formatter.format(-diffDays, "days"),
      hasPassed: true,
      diffDays,
    };
  }
  return {
    text: formatter.format(diffDays, "days"),
    hasPassed: false,
    diffDays,
  };
}
