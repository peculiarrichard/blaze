export const extractDateComponents = (date: string, time: string) => {
  const [year, month, day] = date.split("-");
  const [hour, minute] = time.split(":");

  const monthIndex = parseInt(month) - 1;
  const yearNumber = parseInt(year);
  const hourNumber = parseInt(hour);
  const minuteNumber = parseInt(minute);
  const dayNumber = parseInt(day);

  return new Date(yearNumber, monthIndex, dayNumber, hourNumber, minuteNumber);
};
