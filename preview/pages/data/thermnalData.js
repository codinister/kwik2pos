import thermnal from '../thermnal/thermnal.js';
import inv_num from '../../utils/inv_num.js';

const thermnalData = (tax_id, sett, cust, user, tax, sales, payments) => {
  const invoice_no = inv_num(sett?.comp_name, tax_id);

  const obj = {
    settings: sett,
    customers: cust,
    users: user,
    taxes: tax,
    items: sales,
    invoice_no,
    payments,
  };

  document.querySelector('.contentroot').innerHTML = thermnal(obj);
};

export default thermnalData;
