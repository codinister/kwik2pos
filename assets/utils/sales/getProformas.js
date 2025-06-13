import { classSelector } from '../Selectors.js';
import Table from '../Table.js';
import { formatDate } from '../DateFormats.js';
import deleteAccessControl from './deleteAccessControl.js';
import getInvoiceDetails from './getInvoiceDetails.js';
import sendInvoiceWhatsapp from './customers/sendInvoiceWhatsapp.js';
import inv_num from '../inv_num.js';
import industryCheck from '../industryCheck.js';

const getProformas = async (proformadatas) => {


  if (proformadatas) {
    let proformadata = proformadatas;
    const arr = JSON.parse(sessionStorage.getItem('deletedproformas'));
    if (arr) {
      proformadata = proformadatas.filter((v) => !arr.includes(v.ss_id));
    }

    document.addEventListener('click', (e) => {
      if (e.target.matches('.whatsapp-proforma')) {
        sendInvoiceWhatsapp(e);
      }

      if (e.target.matches('.deleteproforma')) {
        e.stopImmediatePropagation();
        const { ss_id } = e.target.dataset;
        if (confirm('Are you sure you want to delete!')) {
          e.target.parentElement.parentElement.parentElement.remove();
          fetch(
            `router.php?controller=sales&task=delete_invoice&ss_id=${ss_id}`
          )
            .then((resp) => resp.text())
            .then((data) => {
              if (!sessionStorage.getItem('deletedproformas')) {
                sessionStorage.setItem('deletedproformas', JSON.stringify([]));
              }
              const arr = JSON.parse(sessionStorage.getItem('deletedproformas'));
              const newarr = [...arr, ss_id];
              sessionStorage.setItem('deletedproformas', JSON.stringify(newarr));
            });
        } else {
        }
      }

      if (e.target.matches('.dup-btn')) {
        e.stopImmediatePropagation();
        const { cust_id, ss_id, user_id } = e.target.dataset;
        const crypto = self?.crypto?.randomUUID
          ? self.crypto.randomUUID()
          : 'UUID not available';

        getInvoiceDetails(cust_id, ss_id, user_id, 'duplicate', (data) => {
          const { products, taxes } = data;
          sessionStorage.setItem('prozdlist', JSON.stringify(products));

          taxes['uuid'] = crypto;

          sessionStorage.setItem('sales', JSON.stringify(taxes));
          sessionStorage.setItem('rend', 3);
          classSelector('noreload').classList.remove('show');
          document.body.style.overflow = 'scroll';
        });
      }

      if (e.target.matches('.editthisproforma')) {
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

    const invoiceHTMLList = (v) => {
      const user = v.firstname + ' ' + v.lastname;
      const profile = v.profile ? v.profile : inv_num(v.ss_id);
      return `
        <tr class="invoice-table">   
        <td>
        <a href="javascript:void(0);" 
        data-cust_id = "${v.cust_id}" 
        data-ss_id = "${v.ss_id}" 
        data-user_id = "${v.user_id}"
        class="preview-invoice"
        >
        ${profile}
        </a>
        </td>

        <td>${formatDate(v.createdAt)}</td>

        <td class="salesicons">

          <table class="actions-btn">
          <tbody>
          <tr>

          <td>
                  <a href="javascript:void(0);">
                  <i class="fa fa-pencil editthisproforma" 
                  data-cust_id = "${v.cust_id}" 
                  data-ss_id = "${v.ss_id}" 
                  data-user_id = "${v.user_id}" 
                  "></i>
                  </a>
          </td>




        <td>
        <a href="javascript:void(0);">
        ${deleteAccessControl(
          `<i class="fa fa-trash deleteproforma"   data-ss_id="${v.ss_id}"></i>`,
          v.user_id
        )}
        </a>
        </td>

        <td>
      <a href="javascript:void(0);" class="dup-btn"
      data-cust_id = "${v.cust_id}" 
      data-ss_id = "${v.ss_id}" 
      data-user_id = "${v.user_id}" 
      >
        DUPLICATE
      </a>
      </td>

      </tr>
      </tbody>
      </table>
      </td>
      </tr>
  `;
    };

    const proformaLists = Object.values(
      proformadata.reduce((a, b) => {
        if (a[b.ss_id]) {
          a[b.ss_id].ss_id = b.ss_id;
        } else {
          a[b.ss_id] = b;
        }
        return a;
      }, {})
    )
      .map((v) => invoiceHTMLList(v))
      .join('');

    let invoicedesc = '';
    if (industryCheck('roofing company')) {
      invoicedesc = 'Profile';
    } else {
      invoicedesc = 'Invoice desc';
    }

    classSelector('proformainvoice').innerHTML = `
  ${Table(
    'proforma-inv-table',
    'dd4',
    `<tr class="invoice-table ">   
    <td>${invoicedesc}</td>
    <td>Date</td>
    <td>Action</td>
    </tr>`,
    `${proformaLists}`,
    'proformaTableBodyClass'
  )}
  `;
  }
};

export default getProformas;
