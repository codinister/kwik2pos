
import getLoginuser from '../state/statemanagement/sessionstorage/GET/getLoginuser.js'
const getCurrency = () => {
  const cur = getLoginuser('settings')

  if (cur?.currency) {
    return cur?.currency;
  } else {
    return 'GHS';
  }
};

export default getCurrency;
