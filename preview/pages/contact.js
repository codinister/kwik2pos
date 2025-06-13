import apiBaseUrl from '../utils/apiBaseUrl.js';
const url = new URLSearchParams(window.location.search);
import contactData from './data/contactData.js';

//ID
const user_id = atob(url.get('usd'));
const code = url.get('cde');

//URL
const settingsUrl = `settings&code=${code}`;
const customerUrl = `contacts&user_id=${user_id}&code=${code}`;

Promise.allSettled([
  fetch(apiBaseUrl(settingsUrl)).then((data) => data.json()),
  fetch(apiBaseUrl(customerUrl)).then((data) => data.json()),
]).then((data) => {
  const sett = data[0].value[0];
  const cust = data[1].value;

  contactData(sett, cust);
});

// http://localhost/kwikpos/preview/contacts.html?usd=&cde=3n1krE1L37zTK4T9b1sII5iDc07Y4o2ZMzDFaW5WJkM6/Tw3bhLdzcZnxrznxAzBiA==
