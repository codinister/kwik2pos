import displayToast from '../../utils/displayToast.js';
import Spinner from '../../utils/Spinner.js';
import { classSelector } from '../../utils/Selectors.js';
import transactionfeedback from '../utils/transactionFeedback.js';
import Buttons from '../../utils/Buttons.js';
import getIndustry from '../../utils/getIndustry.js';
import itemsValidation from '../utils/itemsValidation.js';
import paymentValidation from '../utils/paymentValidation.js';
import bankAccValidation from '../utils/bankAccValidation.js';

const saveInvoice = () => {
  const industry = getIndustry();

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


      //Customer field validation
      if (sales?.cust_id < 1) {
        return displayToast('bgdanger', "Customer's field required!");
      }

      if (sales?.balance < 0) {
        return displayToast('bgdanger', "Payment exceeded!");
      }

      //Invoice description validation
      if (sales?.profile.length < 1) {
        return displayToast('bgdanger', 'Invoice description required!');
      }

      //Invoice date validation
      if (sales?.invoice_date.length < 1) {
        return displayToast('bgdanger', 'Invoice date required!');
      }

      const fd = new FormData();
      fd.append('sales', JSON.stringify(sales));
      fd.append('items', JSON.stringify(items));
      fd.append('payment', JSON.stringify(payment));

     

      classSelector('saveinvoice-wrapper').innerHTML =  Spinner('saveinvoicespin');

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
            ])
          } else {
            e.target.style.display = 'none';

            const v = data.split('-');

            const tx = JSON.parse(localStorage.getItem('sales'));
            tx['pay_id'] = v[2];
            tx['tax_id'] = v[3];
            localStorage.setItem('sales', JSON.stringify(tx));

            classSelector('pos-sales').innerHTML = transactionfeedback(tx);
            window.scrollTo(0, 0);

            if (classSelector('saveinvoicespin')) {
              classSelector('saveinvoicespin').innerHTML = '';
            }
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
