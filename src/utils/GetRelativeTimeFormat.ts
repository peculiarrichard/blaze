export function getRelativeTimeFormat(time: any) {
  const formatter = new Intl.RelativeTimeFormat("en", { style: "short" });
  const currentTime = new Date();

  if (typeof time === "string") {
    time = new Date(time);
  }

  if (!(time instanceof Date) || isNaN(time.getTime())) {
    throw new Error("Invalid time format");
  }

  const diff = (time.getTime() - currentTime.getTime()) / 1000;
  const absDiff = Math.abs(diff);

  const oneSecond = 1;
  const oneMinute = oneSecond * 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;
  const oneMonth = oneDay * 30;
  const oneYear = oneMonth * 12;

  if (absDiff < oneSecond * 300) return "now";
  if (absDiff < oneMinute) return formatter.format(Math.ceil(diff), "seconds");
  if (absDiff < oneHour) return formatter.format(Math.ceil(diff / oneMinute), "minutes");
  if (absDiff < oneDay) return formatter.format(Math.ceil(diff / oneHour), "hours");
  if (absDiff < oneMonth) return formatter.format(Math.ceil(diff / oneDay), "days");
  if (absDiff < oneYear) return formatter.format(Math.ceil(diff / oneMonth), "months");
  return formatter.format(Math.ceil(diff / oneYear), "years");
}
