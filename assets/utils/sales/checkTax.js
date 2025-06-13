const checkTax = () => {
  const sess = JSON.parse(sessionStorage.getItem('sinpt'));
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
