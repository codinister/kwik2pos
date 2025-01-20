import inv_num from '../../utils/inv_num.js';
import emagweb from '../invoices/emagweb/emagweb.js';
import rentals from '../invoices/rentals/rentals.js';
import retail from '../invoices/retail/retail.js';
import roofing from '../invoices/roofing/roofing.js';
import services from '../invoices/services/services.js';
import spagency from '../invoices/spagency/spagency.js';

const invoiceData = (tax_id, sett, cust, user, tax, sales) => {
  let fullname = '';
  let signatures = '';
  if (tax_id) {
    fullname = user?.firstname + ' ' + user?.lastname;
    signatures = user?.signature;
  } else {
    fullname = '';
    signatures = '';
  }

  const server = '';
  const cashier = '';

  let bank = '';
  if (tax?.addbank === 1) {
    bank = `
    
    
      <table>
    <tbody>
      <tr>
        <td>
          <h4>PAYMENT DETAILS</h4>
        </td>
      </tr>
      <tr>
        <td>
         BANK
        </td>
        <td>
         ${sett?.comp_bank}
        </td>
      </tr>
      <tr>
        <td>
         ACCOUNT NAME
        </td>
        <td>
        ${sett?.acc_name}
        </td>
      </tr>
      <tr>
        <td>
         ACCOUNT NO#
        </td>
        <td>
        ${sett?.bank_acc}
        </td>
      </tr>
    </tbody>
    </table>


    `;
  }

  const invoice_no = inv_num(sett?.comp_name, tax_id);
  let industry = sett?.industry;
  const comp_name = sett?.comp_name.toLowerCase();
  const receipt_type = sett?.receipt_type;

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
    server,
    cashier,
    bank,
    invoice_no,
    durations,
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

export default invoiceData;
