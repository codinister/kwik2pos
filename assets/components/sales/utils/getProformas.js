import { classSelector } from '../../utils/Selectors.js';
import Table from '../../utils/Table.js';
import { formatDate } from '../../utils/DateFormats.js';
import deleteAccessControl from '../utils/deleteAccessControl.js';
import getIndustry from '../../utils/getIndustry.js';
import getInvoiceDetails from '../../sales/utils/getInvoiceDetails.js';
import sendInvoiceWhatsapp from '../../sales/utils/customers/sendInvoiceWhatsapp.js';

const getProformas = async (proformadatas) => {
  const industry = getIndustry();

  if (proformadatas) {
    let proformadata = proformadatas;
    const arr = JSON.parse(localStorage.getItem('deletedproformas'));
    if (arr) {
      proformadata = proformadatas.filter((v) => !arr.includes(v.tax_id));
    }

    document.addEventListener('click', (e) => {
      if (e.target.matches('.whatsapp-proforma')) {
        sendInvoiceWhatsapp(e);
      }

      if (e.target.matches('.deleteproforma')) {
        e.stopImmediatePropagation();
        const { tax_id } = e.target.dataset;
        if (confirm('Are you sure you want to delete!')) {
          e.target.parentElement.parentElement.parentElement.remove();
          fetch(
            `router.php?controller=sales&task=delete_invoice&tax_id=${tax_id}`
          )
            .then((resp) => resp.text())
            .then((data) => {
              if (!localStorage.getItem('deletedproformas')) {
                localStorage.setItem('deletedproformas', JSON.stringify([]));
              }
              const arr = JSON.parse(localStorage.getItem('deletedproformas'));
              const newarr = [...arr, tax_id];
              localStorage.setItem('deletedproformas', JSON.stringify(newarr));
            });
        } else {
        }
      }





      if (e.target.matches('.dup-btn')) {
        e.stopImmediatePropagation();
        const { cust_id, tax_id, user_id } = e.target.dataset;

        getInvoiceDetails(cust_id, tax_id, user_id, 'duplicate', (data) => {

          const { products, taxes } = data;
          localStorage.setItem('prozdlist', JSON.stringify(products));
          localStorage.setItem('sales', JSON.stringify(taxes));
          localStorage.setItem('rend', 3);
          classSelector('noreload').classList.remove('show');
          document.body.style.overflow = 'scroll';
        });
      }






      //VIEW PROFORMA INVOICE
      if (e.target.matches('.viewthisproforma')) {
        e.stopImmediatePropagation();
        const { tax_id } = e.target.dataset;
        window.location = `assets/pdf/invoice.php?inv=${btoa(tax_id)}`;
      }

      if (e.target.matches('.editthisproforma')) {
        e.stopImmediatePropagation();
        const { cust_id, tax_id, user_id } = e.target.dataset;

        getInvoiceDetails(cust_id, tax_id, user_id, '', (data) => {
          const { products, taxes } = data;
          localStorage.setItem('prozdlist', JSON.stringify(products));
          localStorage.setItem('sales', JSON.stringify(taxes));
          localStorage.setItem('rend', 3);
          classSelector('noreload').classList.remove('show');
          document.body.style.overflow = 'scroll';
        });
      }
    });






    const invoiceHTMLList = (v) => {
      const user = v.firstname + ' ' + v.lastname;
      return `
        <ul class="invoice-table">   
        <li>
        <a href="javascript:void(0);" 
        data-tax_id = "${v.tax_id}" 
        class="viewthisproforma">
        ${v.profile}
        </a>
        </li>

        <li>${formatDate(v.createdAt)}</li>

        <li class="salesicons">
        <a href="javascript:void(0);">
        <i class="fa fa-pencil editthisproforma" 
        data-cust_id = "${v.cust_id}" 
        data-tax_id = "${v.tax_id}" 
        data-user_id = "${v.user_id}" 
        "></i>
        </a>


        <a href="javascript:void(0);"     class="whatsapp-small">
            <img 
              class="whatsapp-proforma"
              data-tax_id = ${v.tax_id}
              data-cust_name = ${v.fullname}
              data-phone = ${v.phone}
              src="assets/images/whatsapp.jpg" alt="whatsapp" 
            />
        </a>

        <a href="javascript:void(0);">
        ${deleteAccessControl(
          `<i class="fa fa-trash deleteproforma"   data-tax_id="${v.tax_id}"></i>`,
          v.user_id
        )}
        </a>

      <a href="javascript:void(0);" class="dup-btn"
      data-cust_id = "${v.cust_id}" 
      data-tax_id = "${v.tax_id}" 
      data-user_id = "${v.user_id}" 
      >
        DUPLICATE
      </a>
      </li>
      </ul>
  `;
    };

    const proformaLists = Object.values(
      proformadata
        .reduce((a, b) => {
          if (a[b.tax_id]) {
            a[b.tax_id].tax_id = b.tax_id;
          } else {
            a[b.tax_id] = b;
          }
          return a;
        }, {})
    )
      .map((v) => invoiceHTMLList(v))
      .join('');

    let invoicedesc = '';
    if (industry === 'roofing company') {
      invoicedesc = 'Profile';
    } else {
      invoicedesc = 'Invoice desc';
    }

    classSelector('proformainvoice').innerHTML = `
  ${Table(
    `<ul class="invoice-table ">   
    <li>${invoicedesc}</li>
    <li>Date</li>
    <li>Action</li>
    </ul>`,
    `${proformaLists}`,
    'proformaTableBodyClass'
  )}
  `;
  }
};

export default getProformas;
