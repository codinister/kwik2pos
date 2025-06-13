const checkWithholdingtax = () => {
  const sess = JSON.parse(sessionStorage.getItem('sinpt'));
  const obj = JSON.parse(sessionStorage.getItem('sales'));

  if (sess?.withholdingtax) {
    if (obj?.withholdingchecked) {
      return `Withholding Tax: <input type="checkbox" checked class="with-tax-inpt" />`;
    } else {
      return `Withholding Tax: <input type="checkbox" class="with-tax-inpt" />`;
    }
  } else {
    return '';
  }
};

export default checkWithholdingtax;
