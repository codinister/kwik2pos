import getLoginuser from '../state/sessionstorage/GET/getLoginuser.js';

const getCurrency = () => {
  const sett = getLoginuser('settings');
  return sett?.currency;
};

export default getCurrency;
