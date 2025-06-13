import {
  durationInDays,
  durationInMonths,
  durationInYears,
  ymd,
} from './DateFormats.js';

const expDate = (durationType, durations, createdAt) => {
  let st = {
    Month: durationInMonths(createdAt, durations),
    Day: durationInDays(createdAt, durations),
    Year: durationInYears(createdAt, durations),
  };

  const exp_date = st[durationType];

  return ymd(exp_date);
};

export default expDate;
