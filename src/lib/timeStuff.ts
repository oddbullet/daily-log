const date = new Date();

// Formatted to MM-DD-YYYY
function getLocalDate(): string {
  const stringDate = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${month}-${stringDate}-${year}`;
}

function getLocalTime(): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
}

function getMonth(): string {
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export { date, getLocalDate, getLocalTime, getMonth };
