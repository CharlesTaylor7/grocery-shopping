
function toStartOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

const MS_PER_DAY = 1000 * 60 * 60 * 24;

// normalize date to midnight to compare calendar days accurately
export function ago(time: Date | undefined | null): string {
  if (!(time instanceof Date)) return "?";


  const startOfItemDate = toStartOfDay(time);
  const startOfNow = toStartOfDay(new Date());

  // round for DST
  const diffInDays = Math.round((startOfNow.getTime() - startOfItemDate.getTime()) / MS_PER_DAY);

  if (diffInDays <= 0) return "today";
  return `${diffInDays}d ago`;
}
