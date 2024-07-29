import Buttons from '../../utils/Buttons.js';
import { classSelector } from '../../utils/Selectors.js';
import Spinner from '../../utils/Spinner.js';
import displayToast from '../../utils/displayToast.js';
import getIndustry from '../../utils/getIndustry.js';
import searchBox from '../../utils/searchBox.js';
import TabsSections from '../utils/TabsSections.js';
import customerData from '../utils/customers/customerData.js';
import customerProfile from '../utils/customers/customerProfile.js';
import displayCustomerProfile from '../utils/customers/displayCustomerProfile.js';

import listOfallcustomers from '../utils/customers/listOfallcustomers.js';
import getProformas from '../utils/getProformas.js';
import getReceipts from '../utils/getReceips.js';
import getSalesinvoice from '../utils/getSalesinvoice.js';

const viewCustomers = (customer, receipts, allproforma, allinvoices) => {
  const industry = getIndustry();

  const customers = customerData(customer);

  document.addEventListener('click', (e) => {
    if (e.target.matches('.show-customers')) {
      const res = customers.filter((v) => v.type === 'customer');
      classSelector('allcustomers-list').innerHTML = listOfallcustomers(res);
    }

    if (e.target.matches('.show-referrers')) {
      const res = customers.filter((v) => v.type === 'referrer');
      classSelector('allcustomers-list').innerHTML = listOfallcustomers(res);
    }

    if (e.target.matches('.viewcustomers')) {
      localStorage.removeItem('editreceipts')
      if (customers) {
        const user_id = customers[0].user_id
        Spinner('hide-on-mobilespin');
        classSelector('viewcustomerwrapper').innerHTML = `

        <div class="viewcust-sidebar">
          ${searchBox('customersearch-class', 'Search Customers')}
          <div class="side-box-container">
                <button data-user_id="${user_id}" class="cust-rep-btn">CUSTOMERS REPORT</button>
            </div>
            <div class="referer-conteiner">
              <button class="show-customers">
              Show only customers
              </button>
              <button class="show-referrers">
              Show only referrers
              </button>
            </div>
            <div class="allcustomers-list">
            ${listOfallcustomers(
              customers.filter((v) => v.type === 'customer')
            )}
            </div>
        </div>
        <div class="viewcust-content">
            <div class="top-part">${customerProfile({})}</div>
            <div class="bottom-part-desktop"></div>
        </div>
        `;
        classSelector('noreload').classList.add('show');
        document.body.style.overflow = 'hidden';
        classSelector('hide-on-mobilespin').innerHTML = '';
        TabsSections();
      }
    }

    if (e.target.matches('.cust-rep-btn')) {
      const {user_id} = e.target.dataset
      window.location = `assets/pdf/customers.php?u=${user_id}`;
    }

    if (e.target.matches('.displaycustdetails')) {
      const { cust_id, user_id } = e.target.dataset;
      const usid = JSON.parse(localStorage.getItem('zsdf')).user_id;

      const invoice_exist = allinvoices.some(v => v.cust_id === cust_id)

      displayCustomerProfile(customers, user_id, usid, cust_id,invoice_exist);

      TabsSections();
      getProformas(allproforma, cust_id);
      getSalesinvoice(allinvoices, cust_id);
      getReceipts(receipts, cust_id);
    }

    if (e.target.matches('.editcust')) {
      const obj = e.target.dataset;

      const invoice_exist = allinvoices.some(v => v.cust_id === obj?.cust_id)
      classSelector('top-part').innerHTML = customerProfile({
        ...obj,
        invoice_exist,
        editing: true,

      });
      delete obj['debt'];
      localStorage.setItem('custinfo', JSON.stringify(obj));
    }

    if (e.target.matches('.acc-statement')) {
      const { cust_id } = e.target.dataset;

      window.location = `assets/pdf/accstatement.php?t=${cust_id}`;
    }

    if (e.target.matches('.delt-cust')) {
      if (confirm('Are you sure you want to delete ')) {
        const { cust_id, fullname } = e.target.dataset;

        const fd = new FormData();
        fd.append('data', JSON.stringify({ cust_id, fullname }));

        fetch(`router.php?controller=customer&task=delete_customer`, {
          method: 'Post',
          body: fd,
        })
          .then((resp) => resp.text())
          .then((data) => {
            console.log(data);
            if (data.indexOf('errors') != -1) {
              displayToast('bgdanger', data);
            } else {
              e.target.parentElement.parentElement.parentElement.remove();

              setTimeout(() => {
                localStorage.setItem('rend', 3);
              }, 2000);
            }
          });
      } else {
      }
    }

    if (e.target.matches('.save-customer')) {
      const data = JSON.parse(localStorage.getItem('custinfo'));

      if (data?.fullname.length < 1) {
        return displayToast('bgdanger', 'Fullname field required!');
      }

      const fd = new FormData();
      fd.append('data', JSON.stringify(data));

      //Spinner('save-cust-btn');

      fetch('router.php?controller=customer&task=update_customer', {
        method: 'Post',
        body: fd,
      })
        .then((resp) => resp.text())
        .then((data) => {
          if (data.indexOf('errors') != -1) {
            displayToast('bgdanger', data);
          } else {
            displayToast('lightgreen', data);
            const details = JSON.parse(localStorage.getItem('custinfo'));
            const invoice_exist = allinvoices.some(v => v.cust_id === details?.cust_id)
            classSelector('top-part').innerHTML = customerProfile({
              ...details,
              editing: false,
              invoice_exist
            });

            setTimeout(() => {
              localStorage.setItem('rend', 3);
            }, 2000);
          }
        });
    }
  });

  document.addEventListener('input', (e) => {
    if (e.target.matches('.customersearch-class')) {
      const { value } = e.target;
      if (value.length > 0) {
        const res = customers.filter((v) =>
          Object.values(v).join(' ').toLowerCase().includes(value.toLowerCase())
        );
        classSelector('allcustomers-list').innerHTML = listOfallcustomers(res);
      } else {
        classSelector('allcustomers-list').innerHTML =
          listOfallcustomers(customers);
      }
    }
  });

  return `
  ${Buttons([
    {
      btnclass: 'viewcustomers hide-on-mobile',
      btnname: 'CUSTOMERS ACCOUNTS',
    },
  ])}


  ${Buttons([
    {
      btnclass: 'viewcustomers-mobile hide-on-desktop',
      btnname: 'CUSTOMERS ACCOUNTS',
    },
  ])}

  `;
};

export default viewCustomers;
