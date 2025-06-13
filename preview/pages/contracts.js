import apiBaseUrl from '../utils/apiBaseUrl.js';
const url = new URLSearchParams(window.location.search);
import contractData from './data/contractData.js';

//ID
const tax_id = atob(url.get('txd'));
const user_id = atob(url.get('usd'));
const code = url.get('cde');
const cust_id = atob(url.get('cusd'));

//URL
const settingsUrl = `settings&code=${code}`;
const customerUrl = `customer&cust_id=${cust_id}`;
const userUrl = `user&user_id=${user_id}`;
const taxUrl = `tax&tax_id=${tax_id}`;
const salesUrl = `sales&tax_id=${tax_id}`;
const contractUrl = `contracts&tax_id=${tax_id}`;

Promise.allSettled([
  fetch(apiBaseUrl(settingsUrl)).then((data) => data.json()),
  fetch(apiBaseUrl(customerUrl)).then((data) => data.json()),
  fetch(apiBaseUrl(userUrl)).then((data) => data.json()),
  fetch(apiBaseUrl(taxUrl)).then((data) => data.json()),
  fetch(apiBaseUrl(salesUrl)).then((data) => data.json()),
  fetch(apiBaseUrl(contractUrl)).then((data) => data.json()),
]).then((data) => {
  const sett = data[0].value[0];
  const cust = data[1].value[0];
  const user = data[2].value[0];
  const tax = data[3].value[0];
  const sales = data[4].value;
  const contract = data[5].value[0] || {
    title: '',
    refferedtoas: '',
    contractnumber: '',
    otherinfo: '',
  };

  contractData(tax_id, sett, cust, user, tax, sales, contract);
});

//http://localhost/kwikpos/preview/contracts.html?txd=787&usd=37&cde=3n1krE1L37zTK4T9b1sII5iDc07Y4o2ZMzDFaW5WJkM6/Tw3bhLdzcZnxrznxAzBiA==&cusd=365
