import amountToWords from '../../utils/ToWords.js';
import inv_num from '../../utils/inv_num.js';
import emagweb from '../reciepts/emagweb/emagweb.js';
import rentals from '../reciepts/rentals/rentals.js';
import retail from '../reciepts/retail/retail.js';
import roofing from '../reciepts/roofing/roofing.js';
import services from '../reciepts/services/services.js';
import spagency from '../reciepts/spagency/spagency.js';

const recieptsData = (pay_id, tax_id, sett, cust, user, payments) => {
  const pay = Object.values([...payments]).filter(
    (v) => v.pay_id === pay_id
  )[0];

  const allPayments = [...payments].reduce((a, b) => {
    return Number(a) + Number(b.payment);
  }, 0);

  //GET TAXES
  const pay_type = pay?.pay_type;
  const bank_acc_number = pay?.bank_acc_number;
  const payment = pay?.payment;
  const balance = Number(pay?.total) - Number(allPayments);

  let paytype = pay_type;
  if (pay_type === 'Cheque') {
    paytype = pay_type + '  (' + bank_acc_number + ')';
  }

  const rec_no = inv_num(sett?.comp_name, pay_id);
  const change = balance < 0 ? Math.abs(balance) : 0;

  const amntinwords = amountToWords(Number(payment));

  let industry = '';
  if (sett?.comp_name.toLowerCase() === 'emagweb solutions') {
    industry = 'emagweb solutions';
  }

  if (sett?.comp_name.toLowerCase() === 's.p agency') {
    industry = 'spagency';
  }

  const obj = {
    settings: sett,
    customers: cust,
    users: user,
    payment: pay,
    balance,
    pay_type: paytype,
    rec_no,
    change,
    amntinwords,
  };

  switch (industry) {
    case 'service provider':
      document.querySelector('.contentroot').innerHTML = services(obj);

      break;

    case 'retails':
      document.querySelector('.contentroot').innerHTML = retail(obj);

      break;
    case 'roofing company':
      document.querySelector('.contentroot').innerHTML = roofing(obj);

      break;

    case 'rentals':
      document.querySelector('.contentroot').innerHTML = rentals(obj);

      break;

    case 'spagency':
      document.querySelector('.contentroot').innerHTML = spagency(obj);

      break;

    case 'emagweb solutions':
      document.querySelector('.contentroot').innerHTML = emagweb(obj);

      break;

    default:
      break;
  }
};

export default recieptsData;
