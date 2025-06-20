import getLoginuser from '../state/statemanagement/sessionstorage/GET/getLoginuser.js';
import industryCheck from './industryCheck.js';

/*############################# 
    * Y-m-d Date Format
#############################*/
function ymd(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const mnt = Number(month) < 10 ? '0' + month : month;
  const dy = Number(day) < 10 ? '0' + day : day;
  return `${year}-${mnt}-${dy}`;
}

const durationInMonths = (createdAt, duration) => {
  if (duration > 0) {
    let date = new Date(ymd(createdAt));
    date.setMonth(date.getMonth() + Number(duration));
    return ymd(date);
  } else {
    return '1993-03-11';
  }
};

const durationInDays = (createdAt, duration) => {
  if (duration > 0) {
    let date = new Date(createdAt);
    date.setDate(date.getDate() + Number(duration));
    return ymd(date);
  } else {
    return '1993-03-11';
  }
};

const durationInYears = (createdAt, duration) => {
  if (duration > 0) {
    let date = new Date(createdAt);
    date.setFullYear(date.getFullYear() + Number(duration));
    return ymd(date);
  } else {
    return '1993-03-11';
  }
};

function dmy(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const mnt = Number(month) < 10 ? '0' + month : month;
  const dy = Number(day) < 10 ? '0' + day : day;
  return `${dy}-${mnt}-${year}`;
}

function ymdslash(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const mnt = Number(month) < 10 ? '0' + month : month;
  const dy = Number(day) < 10 ? '0' + day : day;
  return `${mnt}/${dy}/${year}`;
}

function ym(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const mnt = Number(month) < 10 ? '0' + month : month;
  return `${year}-${mnt}`;
}

function formatDate(dateObject) {
  const d = new Date(dateObject);
  const day = d.getDate();
  const months = d.getMonth();
  const mnth = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = mnth[months];
  const year = d.getFullYear();
  const days = day < 10 ? '0' + day : day;
  const monthx = Number(month) < 10 ? '0' + month : month;
  const date = days + ' ' + monthx + ' ' + year;
  return date;
}

const year = (date) => {
  const dt = new Date(date);
  return dt.getFullYear();
};

const month = (date) => {
  const dt = new Date(date);
  return dt.getMonth() + 1;
};

function formatMonth(m) {
  const d = new Date(m);
  const months = d.getMonth();
  const mnth = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = mnth[months];
  return month;
}

function daysleft(cdate, fdate) {
  const curdate = new Date(cdate);
  const futuredate = new Date(fdate);
  const newdate = futuredate.getTime() - curdate.getTime();
  const days = Math.floor(Number(newdate) / (1000 * 60 * 60 * 24));
  return days;
}

const daytodate = (date, day) => {
  const days = 1000 * 60 * 60 * 24;
  const calc = day * days;
  const calcdate = new Date(date).getTime() + Number(calc);
  const newdate = new Date(calcdate);
  return newdate;
};

const expdate_left = (duration, createdAt) => {
  if (industryCheck('rentals', 'service provider')) {
    const { user, settings } = JSON.parse(sessionStorage.getItem('zsdf'));

    const cur_date = new Date(user?.login_date);

    const durations = settings?.duration;

    const dur = {
      Month: durationInMonths(createdAt, duration),
      Day: durationInDays(createdAt, duration),
      Year: durationInYears(createdAt, duration),
    };

    const expdate = dur[durations];

    const exp_date = expdate === 'NaN-NaN-NaN' ? '1993-03-11' : expdate;

    const newdate = new Date(exp_date).getTime() - cur_date.getTime();
    const days = Math.floor(Number(newdate) / (1000 * 60 * 60 * 24));
    const calcdays = Number(days);

    if (calcdays > 0) {
      return calcdays;
    }
    else{
      return 0
    }
  } else {
    return 0;
  }
};

const expiry_date = (duration, createdAt) => {
  if (industryCheck('rentals')) {
    const sett = getLoginuser('user')
    const durations = sett?.duration;
    const dur = {
      Month: durationInMonths(ymd(createdAt), duration),
      Day: durationInDays(ymd(createdAt), duration),
      Year: durationInYears(ymd(createdAt), duration),
    };

    const expdate = dur[durations];
    const expd = expdate === 'NaN-NaN-NaN' ? '1993-03-11' : expdate;

    return expd;
  } else {
    return '';
  }
};

const dateValidator = (d) => {
  const date = new Date(d);
  if (date.getDay() > 0) return true;
  else return false;
};

const datetoms = (date) => {
  const dt = new Date(date).getTime();
  return dt;
};

export {
  ymd,
  dmy,
  formatDate,
  ym,
  year,
  month,
  daysleft,
  ymdslash,
  formatMonth,
  daytodate,
  expdate_left,
  expiry_date,
  dateValidator,
  datetoms,
  durationInMonths,
  durationInDays,
  durationInYears,
};
