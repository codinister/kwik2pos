import displayToast from '../../../utils/displayToast.js';
import Spinner from '../../../utils/Spinner.js';
import { classSelector } from '../../../utils/Selectors.js';
import transactionfeedback from '../../../utils/sales/transactionFeedback.js';
import Buttons from '../../../utils/Buttons.js';
import itemsValidation from '../../../utils/sales/itemsValidation.js';
import paymentValidation from '../../../utils/sales/paymentValidation.js';
import bankAccValidation from '../../../utils/sales/bankAccValidation.js';
import termnalReceipt from '../../../utils/sales/termnalReceipt.js';
import smsSuperAdmin from '../../../utils/sales/smsSuperAdmin.js'

const saveInvoice = () => {
  const termnal = termnalReceipt();

  document.addEventListener('click', (e) => {
    if (e.target.matches('.saveinvoice')) {
      e.stopImmediatePropagation();

      //Get all the necessary invoice information
      const items = itemsValidation();
      const sales = bankAccValidation();
      const payment = paymentValidation();

      //No item validation
      if (sales?.length < 1) {
        return displayToast('bgdanger', 'Add an item to continue!');
      }

      const unitppricelength = Object.values(items)
        .map((v) => v.unit_price)
        .filter(Boolean).length;

      //Unit price checker
      if (unitppricelength < 1) {
        return displayToast('bgdanger', 'Unit price field required!');
      }

      //Customer field validation
      if (sales?.cust_id < 1) {
        return displayToast('bgdanger', "Customer's field required!");
      }

      if (!termnal) {
        if (sales?.balance < 0) {
          return displayToast('bgdanger', 'Payment exceeded!');
        }
      }

      //Invoice description validation
      if (!termnal) {
        if (sales?.profile.length < 1) {
          return displayToast('bgdanger', 'Invoice description required!');
        }
      }

      //Invoice date validation
      if (sales?.invoice_date.length < 1) {
        return displayToast('bgdanger', 'Invoice date required!');
      }

      const fd = new FormData();
      fd.append('sales', JSON.stringify(sales));
      fd.append('items', JSON.stringify(items));
      fd.append('payment', JSON.stringify(payment));

      classSelector('saveinvoice-wrapper').innerHTML =
        Spinner('saveinvoicespin');

      fetch('router.php?controller=sales&task=save_sales', {
        method: 'Post',
        body: fd,
      })
        .then((resp) => resp.text())
        .then((data) => {
          if (data.indexOf('errors') != -1) {
            displayToast('bgdanger', data);
            classSelector('saveinvoice-wrapper').innerHTML = Buttons([
              {
                btnclass: 'saveinvoice',
                btnname: 'SAVE INVOICE',
              },
            ]);
          } else {
            e.target.style.display = 'none';

            const v = data.split('-');

            const tx = JSON.parse(sessionStorage.getItem('sales'));
            tx['pay_id'] = v[2] || '';
            tx['ss_id'] = v[3] || '';
            sessionStorage.setItem('sales', JSON.stringify(tx));

            const {
              cust_id,
              ss_id,
              user_id,
              pay_id,
              cust_name,
              cust_phone,
              cust_email,
              code,
            } = JSON.parse(sessionStorage.getItem('sales'));



            classSelector('pos-sales').innerHTML = transactionfeedback(
              cust_id,
              ss_id,
              user_id,
              pay_id,
              cust_name,
              cust_phone,
              cust_email,
              code
            );
            window.scrollTo(0, 0);

            if (classSelector('saveinvoicespin')) {
              classSelector('saveinvoicespin').innerHTML = '';
            }

            smsSuperAdmin(ss_id, user_id,cust_id, pay_id)
          }
        });
    }
  });

  return `
  <div class="saveinvoice-wrapper">

  ${Buttons([
    {
      btnclass: 'saveinvoice',
      btnname: 'SAVE INVOICE',
    },
  ])}
  </div>
  `;
};

export default saveInvoice;
