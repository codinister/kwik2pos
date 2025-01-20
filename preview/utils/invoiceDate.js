import {
  formatDate,
  durationInMonths,
  durationInDays,
  durationInYears,
} from './DateFormats.js';

const invoiceDate = (duration, durations, createdAt) => {


  let st = {
    Month: durationInMonths(createdAt, durations),
    Day: durationInDays(createdAt, durations),
    Year: durationInYears(createdAt, durations),
  };

  const exp_date = st[duration];

  if (durations) {
    return `
    START DATE:${formatDate(createdAt)}
  <br />
  END DATE: ${formatDate(exp_date)}
  `;
  } else {
    return `
  DATE:${formatDate(createdAt)}
  `;
  }
};

export default invoiceDate;
