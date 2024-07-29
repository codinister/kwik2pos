import { classSelector } from '../../utils/Selectors.js';
import Table from '../../utils/Table.js';
import { formatDate } from '../../utils/DateFormats.js';
import deleteAccessControl from '../utils/deleteAccessControl.js';
import getInvoiceDetails from './getInvoiceDetails.js';
import sendInvoiceWhatsapp from '../../sales/utils/customers/sendInvoiceWhatsapp.js';

const getSalesinvoice = async (allinvoicess, cust_id) => {
  if (allinvoicess) {
    let allinvoices = allinvoicess;
    const arr = JSON.parse(localStorage.getItem('deletedinvoices'));
    if (arr) {
      allinvoices = allinvoicess.filter((v) => !arr.includes(v.tax_id));
    }

    document.addEventListener('click', (e) => {
      if (e.target.matches('.whatsapp-invoice')) {
        sendInvoiceWhatsapp(e);
      }

      if (e.target.matches('.deleteSalesInvoice')) {
        e.stopImmediatePropagation();
        const { tax_id } = e.target.dataset;
        if (confirm('Are you sure you want to delete!')) {
          e.target.parentElement.parentElement.parentElement.parentElement.remove();
          fetch(
            `router.php?controller=sales&task=delete_invoice&tax_id=${tax_id}`
          )
            .then((resp) => resp.text())
            .then((data) => {
              if (!localStorage.getItem('deletedinvoices')) {
                localStorage.setItem('deletedinvoices', JSON.stringify([]));
              }
              const arr = JSON.parse(localStorage.getItem('deletedinvoices'));
              const newarr = [...arr, tax_id];
              localStorage.setItem('deletedinvoices', JSON.stringify(newarr));
            });
        } else {
        }
      }

      if (e.target.matches('.viewthissalesinvoice')) {
        e.stopImmediatePropagation();
        const { cust_id, tax_id, user_id } = e.target.dataset;

        window.location = `assets/pdf/invoice.php?inv=${btoa(tax_id)}`;
      }

      if (e.target.matches('.editthissalesinvoice')) {
        e.stopImmediatePropagation();
        const { cust_id, tax_id, user_id } = e.target.dataset;
        getInvoiceDetails(cust_id, tax_id, user_id, '', (data) => {
          const { products, taxes } = data;
          localStorage.setItem('prozdlist', JSON.stringify(products));
          localStorage.setItem('taxes', JSON.stringify(taxes));
          localStorage.setItem('rend', 3);
          classSelector('noreload').classList.remove('show');
          document.body.style.overflow = 'scroll';
        });
      }
    });

    const data = Object.values(
      allinvoices
        .filter((v) => v.cust_id === cust_id)
        .reduce((a, b) => {
          if (a[b.tax_id]) {
            a[b.tax_id].tax_id = b.tax_id;
          } else {
            a[b.tax_id] = b;
          }
          return a;
        }, {})
    );

    const invoiceHTMLList = (v) => {
      const { user_id } = JSON.parse(localStorage.getItem('zsdf'));

      let hide_if_balance_is_zero = '';
      if (v.balance <= 0) {
        hide_if_balance_is_zero = 'hide';
      }

      let editInvoice = `
      <a href="javascript:void(0);">
      <i class="fa fa-lock" 
      ></i>
      </a>
      `;

      if (user_id === v.user_id) {
        editInvoice = `<a href="javascript:void(0);">
        <i class="fa fa-pencil editthissalesinvoice" 
        data-cust_id = "${v.cust_id}" 
        data-tax_id = "${v.tax_id}" 
        data-user_id = "${v.user_id}" 
        ></i>
        </a>`;
      }

      const user = v.firstname + ' ' + v.lastname;
      return `
        <ul class="sales-invoice-table">   
        <li>
        <a href="javascript:void(0);" 
        data-cust_id = "${v.cust_id}" 
        data-tax_id = "${v.tax_id}" 
        data-user_id = "${v.user_id}" 
        class="viewthissalesinvoice">
        ${v.profile}
        </a>
        </li>

        <li>${formatDate(v.createdAt)}</li>

        <li class="salesicons">
        <div class="salesiconsinner ${hide_if_balance_is_zero}">

        ${editInvoice}


        <a href="javascript:void(0);"     class="whatsapp-small">
            <img 
              class="whatsapp-invoice"
              data-tax_id = ${v.tax_id}
              data-cust_name = ${v.fullname}
              data-phone = ${v.phone}
              src="assets/images/whatsapp.jpg" alt="whatsapp" 
            />
        </a>

        <a href="javascript:void(0);">${deleteAccessControl(
          `<i class="fa fa-trash deleteSalesInvoice" data-tax_id="${v.tax_id}"></i>`,
          v.user_id
        )}
        </a>
        </div>
        </li>


        </ul>
  `;
    };

    const tableBodyList = data.map((v) => invoiceHTMLList(v)).join('');

    classSelector('salesinvoice').innerHTML = `
    ${Table(
      `<ul class="sales-invoice-table">   
      <li>Profile</li>
      <li>Date</li>
      <li>Action</li>
      </ul>`,
      `${tableBodyList}`,
      'invoiceTableBodyClass'
    )}
  `;
  }
};

export default getSalesinvoice;
