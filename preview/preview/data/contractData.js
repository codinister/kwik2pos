import inv_num from '../../utils/inv_num.js';
import spagency from '../contracts/spagency.js';

const contractData = (tax_id, sett, cust, user, tax, sell, contract) => {

  const sales = sell.map(v => {
    const durations = Number(v.total) / Number(v.unit_price)
    return {...v, duration: Math.floor(durations)}
  })



  let fullname = '';
  let signatures = '';
  if (tax_id) {
    fullname = user?.firstname + ' ' + user?.lastname;
    signatures = user?.signature;
  } else {
    fullname = '';
    signatures = '';
  }

  const invoice_no = inv_num(sett?.comp_name, tax_id);
  let industry = sett?.industry;
  const comp_name = sett?.comp_name.toLowerCase();

  if (comp_name === 'emagweb solutions') {
    industry = 'emagweb solutions';
  }
  if (comp_name === 's.p agency') {
    industry = 'spagency';
  }

  const durations = Math.max(...sales.map((v) => v.duration));


  const obj = {
    settings: sett,
    customers: cust,
    users: user,
    taxes: tax,
    items: sales,
    fullname,
    signatures,
    invoice_no,
    durations,
    contract
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

export default contractData;
