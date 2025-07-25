import getLoginuser from '../state/sessionstorage/GET/getLoginuser.js';
import {
  durationInDays,
  durationInMonths,
  durationInYears,
  ymd,
} from './DateFormats.js';

const expDate = (durations, createdAt) => {
  const settings = getLoginuser('settings');

  const durationType = settings?.duration;

  let st = {
    Month: durationInMonths(createdAt, durations),
    Day: durationInDays(createdAt, durations),
    Year: durationInYears(createdAt, durations),
  };

  const exp_date = st[durationType];

  return ymd(exp_date);
};

export default expDate;
