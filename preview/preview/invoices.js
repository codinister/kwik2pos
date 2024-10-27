import apiBaseUrl from '../utils/apiBaseUrl.js';
const url = new URLSearchParams(window.location.search);
import inv_num from '../utils/inv_num.js';
import emagweb from './invoices/emagweb/emagweb.js';
import rentals from './invoices/rentals/rentals.js';
import retail from './invoices/retail/retail.js';
import roofing from './invoices/roofing/roofing.js';
import services from './invoices/services/services.js';
import spagency from './invoices/spagency/spagency.js';
import thermnal from './invoices/thermnal/thermnal.js';

//ID
const tax_id = url.get('txd');
const user_id = url.get('usd');
const code = url.get('cde');
const cust_id = url.get('cusd');

//URL
const settingsUrl = `settings&code=${code}`;
const customerUrl = `customer&cust_id=${cust_id}`;
const userUrl = `user&user_id=${user_id}`;
const taxUrl = `tax&tax_id=${tax_id}`;
const salesUrl = `sales&tax_id=${tax_id}`;

Promise.allSettled([
  fetch(apiBaseUrl(settingsUrl)).then((data) => data.json()),
  fetch(apiBaseUrl(customerUrl)).then((data) => data.json()),
  fetch(apiBaseUrl(userUrl)).then((data) => data.json()),
  fetch(apiBaseUrl(taxUrl)).then((data) => data.json()),
  fetch(apiBaseUrl(salesUrl)).then((data) => data.json()),
]).then((data) => {
  const sett = data[0].value[0];
  const cust = data[1].value[0];
  const user = data[2].value[0];
  const tax = data[3].value[0];
  const sales = data[4].value;

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

  const invoice_no = inv_num(tax_id);
  let industry = sett?.industry;
  const comp_name = sett?.comp_name.toLowerCase();
  const receipt_type = sett?.receipt_type;

  if (comp_name === 'emagweb solutions') {
    industry = 'emagweb solutions';
  }
  if (comp_name === 's.p agency') {
    industry = 'spagency';
  }



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
  };

  switch (industry) {
    case 'service provider':
      if (receipt_type === 'THERMNAL') {
        output = thermnal(obj);
      } else {
        document.querySelector('.root').innerHTML = services(obj);
      }
      break;

    case 'retails':
      if (receipt_type === 'THERMNAL') {
        output = thermnal(obj);
      } else {
        document.querySelector('.root').innerHTML = retail(obj);
      }
      break;
    case 'roofing company':
      if (receipt_type === 'THERMNAL') {
        output = thermnal(obj);
      } else {
        document.querySelector('.root').innerHTML = roofing(obj);
      }
      break;

    case 'rentals':
      if (receipt_type === 'THERMNAL') {
        output = thermnal(obj);
      } else {
        document.querySelector('.root').innerHTML = rentals(obj);
      }
      break;

    case 'spagency':
      if (receipt_type === 'THERMNAL') {
        output = thermnal(obj);
      } else {
        document.querySelector('.root').innerHTML = spagency(obj);
      }
      break;

    case 'emagweb solutions':
      if (receipt_type === 'THERMNAL') {
        output = thermnal(obj);
      } else {
        document.querySelector('.root').innerHTML = emagweb(obj);
      }
      break;

    default:
      break;
  }
});

//http://localhost/kwikpos/preview/invoices.html?txd=787&usd=37&cde=3n1krE1L37zTK4T9b1sII5iDc07Y4o2ZMzDFaW5WJkM6/Tw3bhLdzcZnxrznxAzBiA==&cusd=365
