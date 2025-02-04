import apiBaseUrl from '../utils/apiBaseUrl.js';
const url = new URLSearchParams(window.location.search);
import recieptsData from './data/recieptsData.js';

//ID
const pay_id = atob(url.get('pyid'));
const user_id = atob(url.get('usd'));
const code = url.get('cde');
const cust_id = atob(url.get('cusd'));
const tax_id = atob(url.get('txid'));


//URL
const settingsUrl = `settings&code=${code}`;
const customerUrl = `customer&cust_id=${cust_id}`;
const userUrl = `user&user_id=${user_id}`;
const paymentUrl = `payment&tax_id=${tax_id}`;

Promise.allSettled([
  fetch(apiBaseUrl(settingsUrl)).then((data) => data.json()),
  fetch(apiBaseUrl(customerUrl)).then((data) => data.json()),
  fetch(apiBaseUrl(userUrl)).then((data) => data.json()),
  fetch(apiBaseUrl(paymentUrl)).then((data) => data.json()),
]).then((data) => {

  const sett = data[0].value[0];
  const cust = data[1].value[0];
  const user = data[2].value[0];
  const payments = data[3].value;

  recieptsData(pay_id,tax_id, sett, cust, user, payments);
});

// http://localhost/kwikpos/preview/reciepts.html?pyid=148&usd=37&
// txid=790&cde=3n1krE1L37zTK4T9b1sII5iDc07Y4o2ZMzDFaW5WJkM6/Tw3bhLdzcZnxrznxAzBiA==&cusd=368


