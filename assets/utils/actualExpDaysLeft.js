import { expdate_left } from './DateFormats.js';

const actualExpDaysLeft = (duration, createdAt) => {
  const exp_days_left =
    expdate_left(duration, createdAt) > 0
      ? 14 / expdate_left(duration, createdAt)
      : 0;

  return Math.floor(exp_days_left);
};

export default actualExpDaysLeft;
