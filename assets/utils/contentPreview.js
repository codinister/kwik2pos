import contractData from '../../preview/pages/data/contractData.js';
import invoiceData from '../../preview/pages/data/invoiceData.js';
import stocksData from '../../preview/pages/data/stocksData.js';
import recieptsData from '../../preview/pages/data/recieptsData.js';
import apiBaseUrl from './apiBaseUrl.js';
import { classSelector } from './Selectors.js';
import {
  rentalsFilter,
  retailsFilter,
  roofingFilter,
  serviceFilter,
} from '../state/serverside/read/products/productFilter.js';
import checkmarkFn2 from './products/checkmarkFn2.js';
import industryCheck from './industryCheck.js';

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
        const sett = JSON.parse(sessionStorage.getItem('sinpt'));
        const cust = data[0].value[0];
        const user = data[1].value[0];
        const payments = data[2].value;

        recieptsData(pay_id, tax_id, sett, cust, user, payments);

        document.body.style.overflow = 'hidden';
        classSelector('contentmodal').classList.add('show');
      });
    }

    if (e.target.matches('.preview-contract')) {
      const { tax_id, cust_id, user_id } = e.target.dataset;

      //URL
      const customerUrl = `customer&cust_id=${cust_id}`;
      const userUrl = `user&user_id=${user_id}`;
      const taxUrl = `tax&tax_id=${tax_id}`;
      const salesUrl = `sales&tax_id=${tax_id}`;
      const contractUrl = `contracts&tax_id=${tax_id}`;

      Promise.allSettled([
        fetch(apiBaseUrl(customerUrl)).then((data) => data.json()),
        fetch(apiBaseUrl(userUrl)).then((data) => data.json()),
        fetch(apiBaseUrl(taxUrl)).then((data) => data.json()),
        fetch(apiBaseUrl(salesUrl)).then((data) => data.json()),
        fetch(apiBaseUrl(contractUrl)).then((data) => data.json()),
      ]).then((data) => {
        const sett = JSON.parse(sessionStorage.getItem('sinpt'));
        const cust = data[0].value[0];
        const user = data[1].value[0];
        const tax = data[2].value[0];
        const sales = data[3].value;
        const contract = data[4].value[0] || {
          title: '',
          refferedtoas: '',
          contractnumber: '',
          otherinfo: '',
        };

        contractData(tax_id, sett, cust, user, tax, sales, contract);

        document.body.style.overflow = 'hidden';
        classSelector('contentmodal').classList.add('show');
      });
    }

    if (e.target.matches('.generatepreview')) {
      //URL
      const baseURL = 'router.php?controller=productsprofile&task';
      Promise.allSettled([
        fetch(`${baseURL}=getStocks`).then((resp) => resp.json()),
        fetch(`${baseURL}=getSoldProducts`).then((resp) => resp.json()),
      ]).then((value) => {
        const sett = JSON.parse(sessionStorage.getItem('sinpt'));


        const products = value[0].value;
        const sales = value[1].value;

        const obj = JSON.parse(sessionStorage.getItem('checkmark'));
        const prodType = obj?.prodType;

        if (industryCheck('rentals')) {
          const { stocks, rented, availables } = rentalsFilter(products, sales);

          if (prodType === 'stocks') {
            const data = checkmarkFn2(stocks);
            stocksData(sett, data, prodType);
          }

          if (prodType === 'available') {
            const data = checkmarkFn2(availables);
            stocksData(sett, data, prodType);
          }

          if (prodType === 'rented') {
            console.log('rented')
            const data = checkmarkFn2(rented);
            stocksData(sett, data, prodType);
          }
        }
        if (industryCheck('retails')) {
          const retails = retailsFilter(products, sales);
          const data = checkmarkFn2(retails);
          stocksData(sett, data, prodType);
        }
        if (industryCheck('service provider')) {
          const service = serviceFilter(products);
          const data = checkmarkFn2(service);
          stocksData(sett, data, prodType);
        }
        if (industryCheck('roofing company')) {
          const roofing = roofingFilter(products);
          const data = checkmarkFn2(roofing);
          stocksData(sett, data, prodType);
        }

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
        const sett = JSON.parse(sessionStorage.getItem('sinpt'));
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
