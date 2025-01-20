

const durationInMonths = (createdAt, duration) => {
  let date = new Date(createdAt);
  date.setMonth(date.getMonth() + duration);
  return date;
};


const durationInDays = (createdAt, duration) => {
  let date = new Date(createdAt);
  date.setDate(date.getDate() + duration);
  return date;
};


const durationInYears = (createdAt, duration) => {
  let date = new Date(createdAt);
  date.setFullYear(date.getFullYear() + duration);
  return date;
};
