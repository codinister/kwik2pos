import invoiceData from '../../../preview/preview/data/invoiceData.js';
import recieptsData from '../../../preview/preview/data/recieptsData.js';
import apiBaseUrl from './apiBaseUrl.js';
import { classSelector } from './Selectors.js';

const contentPreview = () => {
  document.addEventListener('click', (e) => {
    if (e.target.matches('.preview-reciept')) {
      const { tax_id, user_id, cust_id, pay_id } = e.target.dataset;


      //URL
      const customerUrl = `customer&cust_id=${cust_id}`;
      const userUrl = `user&user_id=${user_id}`;
      const paymentUrl = `payment&tax_id=${tax_id}`;

      Promise.allSettled([
        fetch(apiBaseUrl(customerUrl)).then((data) => data.json()),
        fetch(apiBaseUrl(userUrl)).then((data) => data.json()),
        fetch(apiBaseUrl(paymentUrl)).then((data) => data.json()),
      ]).then((data) => {
        const sett = JSON.parse(localStorage.getItem('sinpt'));
        const cust = data[0].value[0];
        const user = data[1].value[0];
        const payments = data[2].value;

        recieptsData(pay_id, tax_id, sett, cust, user, payments);

        document.body.style.overflow = 'hidden';
        classSelector('contentmodal').classList.add('show');
      });
    }
    if (e.target.matches('.preview-invoice')) {
      const { tax_id, cust_id, user_id } = e.target.dataset;

      //URL
      const customerUrl = `customer&cust_id=${cust_id}`;
      const taxUrl = `tax&tax_id=${tax_id}`;
      const salesUrl = `sales&tax_id=${tax_id}`;
      const userUrl = `user&user_id=${user_id}`;

      Promise.allSettled([
        fetch(apiBaseUrl(customerUrl)).then((data) => data.json()),
        fetch(apiBaseUrl(userUrl)).then((data) => data.json()),
        fetch(apiBaseUrl(taxUrl)).then((data) => data.json()),
        fetch(apiBaseUrl(salesUrl)).then((data) => data.json()),
      ]).then((data) => {
        const sett = JSON.parse(localStorage.getItem('sinpt'));
        const cust = data[0].value[0];
        const user = data[1].value[0];
        const tax = data[2].value[0];
        const sales = data[3].value;

        invoiceData(tax_id, sett, cust, user, tax, sales);

        document.body.style.overflow = 'hidden';
        classSelector('contentmodal').classList.add('show');
      });
    }
    if (e.target.matches('.preview-stock')) {
      document.body.style.overflow = 'hidden';
      classSelector('contentmodal').classList.add('show');
    }
  });
};

export default contentPreview;
