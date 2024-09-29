const pluralize = (value: number, unit: string) => {
  return value === 1 ? `${value} ${unit} ago` : `${value} ${unit}s ago`;
};

export const getDaysAgoQuiz = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffInSeconds = diff / 1000;
  const diffInMinutes = diffInSeconds / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;
  const diffInWeeks = diffInDays / 7;

  if (diffInSeconds < 60) {
    return `1 minute ago`;
  } else if (diffInMinutes < 60) {
    return pluralize(Math.floor(diffInMinutes), "minute");
  } else if (diffInHours < 24) {
    return pluralize(Math.floor(diffInHours), "hour");
  } else if (diffInDays <= 21) {
    return pluralize(Math.floor(diffInDays), "day");
  } else {
    return pluralize(Math.floor(diffInWeeks), "week");
  }
};
