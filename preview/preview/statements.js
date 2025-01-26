import apiBaseUrl from '../utils/apiBaseUrl.js';
const url = new URLSearchParams(window.location.search);
import statementData from './data/statementData.js';

//ID
const code = url.get('cde');
const cust_id = url.get('cusd');

//URL
const settingsUrl = `settings&code=${code}`;
const salesUrl = `sales_by_custid&cust_id=${cust_id}`;
const paymentUrl = `payment_by_custid&cust_id=${cust_id}`;


Promise.allSettled([
  fetch(apiBaseUrl(settingsUrl)).then((data) => data.json()),
  fetch(apiBaseUrl(salesUrl)).then((data) => data.json()),
  fetch(apiBaseUrl(paymentUrl)).then((data) => data.json())
]).then((data) => {
  const settings = data[0].value[0];
  const invoices = data[1].value;
  const receipts = data[2].value;

  const obj = {
    settings,
    invoices,
    receipts
  }
return console.log(obj)

  statementData(obj);
});

// http://localhost/kwikpos/preview/statements.html?cusd=368&cde=3n1krE1L37zTK4T9b1sII5iDc07Y4o2ZMzDFaW5WJkM6/Tw3bhLdzcZnxrznxAzBiA==



