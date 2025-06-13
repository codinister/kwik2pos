import industryCheck from './industryCheck.js';
import checkmarkFn from './products/checkmarkFn.js';

const typeOfProduct = (data) => {


  const prod_type = sessionStorage.getItem('prodType');



  let output = '';
  let fulldata = '';

  if (industryCheck('rentals')) {
    if (prod_type === 'stocks') {
      const res = data?.rentals.stocks;
      fulldata = res;
      output = checkmarkFn(res)
    }
    if (prod_type === 'rented') {
      const res = data?.rentals.rented;
      fulldata = res;
      output = checkmarkFn(res)
    }
    if (prod_type === 'available') {
      const res = data?.rentals.availables;
      fulldata = res;
      output = checkmarkFn(res)
    }
  }

  if (industryCheck('retails')) {
    output = data;
    fulldata = data;
  }

  if (industryCheck('service provider')) {
    output = data;
    fulldata = data;
  }

  if (industryCheck('roofing company')) {
    output = data;
    fulldata = data;
  }

  return { output, fulldata };
};

export default typeOfProduct;
