import { classSelector } from '../Selectors.js';
import Table from '../Table.js';
import { formatDate } from '../DateFormats.js';
import deleteAccessControl from './deleteAccessControl.js';
import getInvoiceDetails from './getInvoiceDetails.js';
import sendInvoiceWhatsapp from './customers/sendInvoiceWhatsapp.js';
import roleAccess from '../roleAccess.js';
import inv_num from '../inv_num.js';
import getLoginuser from '../../state/statemanagement/sessionstorage/GET/getLoginuser.js';

const getSalesinvoice = async (allinvoicess) => {
  if (allinvoicess) {
    let allinvoices = allinvoicess;
    const arr = JSON.parse(sessionStorage.getItem('deletedinvoices'));
    if (arr) {
      allinvoices = allinvoicess.filter((v) => !arr.includes(v.ss_id));
    }

    document.addEventListener('click', (e) => {
      if (e.target.matches('.whatsapp-invoice')) {
        sendInvoiceWhatsapp(e);
      }

      if (e.target.matches('.deleteSalesInvoice')) {
        e.stopImmediatePropagation();
        const { ss_id } = e.target.dataset;
        if (confirm('Are you sure you want to delete!')) {
          e.target.parentElement.parentElement.parentElement.parentElement.remove();
          fetch(
            `router.php?controller=sales&task=delete_invoice&ss_id=${ss_id}`
          )
            .then((resp) => resp.text())
            .then((data) => {
              if (!sessionStorage.getItem('deletedinvoices')) {
                sessionStorage.setItem('deletedinvoices', JSON.stringify([]));
              }
              const arr = JSON.parse(sessionStorage.getItem('deletedinvoices'));
              const newarr = [...arr, ss_id];
              sessionStorage.setItem('deletedinvoices', JSON.stringify(newarr));
            });
        } else {
        }
      }



      if (e.target.matches('.editthissalesinvoice')) {
        e.stopImmediatePropagation();
        const { cust_id, ss_id, user_id } = e.target.dataset;
        getInvoiceDetails(cust_id, ss_id, user_id, '', (data) => {
          const { products, taxes } = data;
          sessionStorage.setItem('prozdlist', JSON.stringify(products));
          sessionStorage.setItem('sales', JSON.stringify(taxes));
          sessionStorage.setItem('rend', 3);
          classSelector('noreload').classList.remove('show');
          document.body.style.overflow = 'scroll';
        });
      }
    });

    const data = Object.values(
      allinvoices.reduce((a, b) => {
        if (a[b.ss_id]) {
          a[b.ss_id].ss_id = b.ss_id;
        } else {
          a[b.ss_id] = b;
        }
        return a;
      }, {})
    );

    const invoiceHTMLList = (v) => {
      const { user_id} = getLoginuser('user')

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

      const us = user_id === v.user_id ? true : false;

      if (roleAccess() || us) {
        editInvoice = `<a href="javascript:void(0);">
        <i class="fa fa-pencil editthissalesinvoice" 
        data-cust_id = "${v.cust_id}" 
        data-ss_id = "${v.ss_id}" 
        data-user_id = "${v.user_id}" 
        ></i>
        </a>`;
      }

      const user = v.firstname + ' ' + v.lastname;
      const profile = v.profile ? v.profile : inv_num(v.ss_id);
      return `
        <tr class="sales-invoice-table">   
        <td>
        <a href="javascript:void(0);" 
        data-cust_id = "${v.cust_id}" 
        data-ss_id = "${v.ss_id}" 
        data-user_id = "${v.user_id}" 
        class="preview-invoice">
        ${profile}
        </a>
        </td>

        <td>${formatDate(v.createdAt)}</td>

        <td class="salesicons">
        <div class="salesiconsinner ${hide_if_balance_is_zero}">

         <table class="actions-btn">
          <tbody>
          <tr>

          <td>

        ${editInvoice}
        </td>

        <td>

        <a href="javascript:void(0);">${deleteAccessControl(
          `<i class="fa fa-trash deleteSalesInvoice" data-ss_id="${v.ss_id}"></i>`,
          v.user_id
        )}
        </a>

        </td>

        </tr>
        </tbody>
        </table>




        </div>
        </td>


        </tr>
  `;
    };

    const tableBodyList = data.map((v) => invoiceHTMLList(v)).join('');

    classSelector('salesinvoice').innerHTML = `
    ${Table(
      'sales-inv-table',
      'dd2',
      `<tr class="sales-invoice-table">   
      <td>Profile</td>
      <td>Date</td>
      <td>Action</td>
      </tr>`,
      `${tableBodyList}`,
      'invoiceTableBodyClass'
    )}
  `;
  }
};

export default getSalesinvoice;
