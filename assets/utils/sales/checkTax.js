import getLoginuser from '../../state/statemanagement/sessionstorage/GET/getLoginuser.js';

const checkTax = () => {
  const sess = getLoginuser('settings');
  const obj = JSON.parse(sessionStorage.getItem('sales'));

  if (sess?.vat) {
    if (obj?.vat?.length > 0) {
      return `Income Tax: <input type="checkbox"  class="tax-inpt" />`;
    } else {
      return `Income Tax: <input type="checkbox" class="tax-inpt" />`;
    }
  } else {
    return '';
  }
};

export default checkTax;
