import { classSelector } from '../../utils/Selectors.js';
import displayToast from '../../utils/displayToast.js';
import Contract from '../sales/Contract.js';
import sendInvoiceWhatsapp from '../utils/customers/sendInvoiceWhatsapp.js';
import sendReceiptWhatsapp from '../utils/customers/sendReceiptWhatsapp.js';

const transactionfeedback = (txx) => {
  document.addEventListener('change', (e) => {
    if (e.target.matches('.invoicenote')) {
      e.stopImmediatePropagation();
      const tx = JSON.parse(localStorage.getItem('taxes'));
      tx['note'] = e.target.value;
      localStorage.setItem('taxes', JSON.stringify(tx));
    }

    if (e.target.matches('.addcontract')) {
      const { cust_name, tax_id, cust_id, total } = txx;

      if (e.target.checked) {
        document.querySelector('.contract-box').innerHTML = Contract(
          cust_name,
          tax_id,
          cust_id,
          total
        );
      } else {
        document.querySelector('.contract-box').innerHTML = '';
      }
    }

    if (e.target.matches('.addnote')) {
      if (e.target.checked) {
        document.querySelector('.note-box').innerHTML = `
          <div class="addnote">
      
          <textarea class="invoicenote"></textarea>
          <label>Add note</label>
    
          <a href="javascript:void(0);" class="addinvnote">ADD NOTE</a>
          </div>
          `;
      } else {
        document.querySelector('.note-box').innerHTML = '';
      }

      setTimeout(() => {
        if (classSelector('invoicenote')) {
          const tx = JSON.parse(localStorage.getItem('taxes'));
          classSelector('invoicenote').innerHTML = tx?.note;
        }
      }, 1000);
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.matches('.closebx')) {
      localStorage.removeItem('prozdlist');
      localStorage.removeItem('taxes');
      localStorage.setItem('rend', 3);
    }

    if (e.target.matches('.previewpdf')) {
      e.stopImmediatePropagation();
      const { tax_id, pay_id } = e.target.dataset;

      if (pay_id?.length > 0) {
        localStorage.removeItem('contract');
        localStorage.removeItem('taxes');
        localStorage.removeItem('prozdlist');
        const url = 'assets/pdf/receipt.php?rec=' + btoa(pay_id);
        window.location = url;
      } else {
        localStorage.removeItem('contract');
        localStorage.removeItem('taxes');
        localStorage.removeItem('prozdlist');
        const url = 'assets/pdf/invoice.php?inv=' + btoa(tax_id);
        window.location = url;
      }
    }

    if (e.target.matches('.whatsapp')) {
      e.stopImmediatePropagation();
      if (e.target.dataset.pay_id?.length > 0) {
        sendReceiptWhatsapp(e);
      } else {
        sendInvoiceWhatsapp(e);
      }
    }

    if (e.target.matches('.addinvnote')) {
      e.stopImmediatePropagation();

      const tx = JSON.parse(localStorage.getItem('taxes'));

      const fd = new FormData();
      fd.append('note', tx?.note);
      fd.append('tax_id', txx?.tax_id);

      fetch('router.php?controller=sales&task=addInvoiceNote', {
        method: 'Post',
        body: fd,
      })
        .then((resp) => resp.text())
        .then((data) => {
          if (data.indexOf('errors') != -1) {
            displayToast('bgdanger', data);
          } else {
            displayToast('lightgreen', data);
            //window.location = `assets/pdf/invoice.php?inv=${txx?.tax_id}`;
          }
        });
    }
  });

  const enableContract = () => {
    const { role_id } = JSON.parse(localStorage.getItem('zsdf'));
    const { comp_name } = JSON.parse(localStorage.getItem('sinpt'));

    if (comp_name.toLowerCase() == 's.p agency') {
      if (role_id == 1 || role_id == 111 || role_id == 5) {
        return `<div>
      <input type="checkbox"  class="addcontract" /> 
      <label>Add contract </label> 
      </div>`;
      }
    }

    return '';
  };

  return `
  <duv class="feedbackwrapper">

      <div class="feedbackbtns">
          <a href="javascript:void(0);"
          class="previewpdf"
          data-cust_id = "${txx?.cust_id}" 
          data-tax_id = "${txx?.tax_id}" 
          data-user_id = "${txx?.user_id}" 
          data-pay_id = "${txx?.pay_id}" 
          >${txx?.pay_id ? 'VIEW RECEIPT' : 'VIEW INVOICE'}</a>

          ${
            txx?.cust_phone
              ? `
          <a href="javascript:void(0);"
          class="whatsappbx"

          ><img 
          data-cust_id = "${txx?.cust_id}" 
          data-tax_id = "${txx?.tax_id}" 
          data-user_id = "${txx?.user_id}" 
          data-pay_id = "${txx?.pay_id}" 
          data-cust_name = "${txx?.cust_name}"
          data-phone = "${txx?.cust_phone}"
          
          class="whatsapp" src="assets/images/whatsapp.jpg" alt="whatsapp" /></a>`
              : ''
          }
          <a href="javascript:void(0);" class="closebx">CLOSE</a>
      </div>

      <div class="checkboxex-wrapper">
          ${enableContract()}
        <div>
        <input type="checkbox"  class="addnote" /> 
        <label>Add note </label> 
        </div>
      </div>


      <div class="contract-box"></div>

      <div class="note-box">

      </div>



  </div>
  `;
};

export default transactionfeedback;
