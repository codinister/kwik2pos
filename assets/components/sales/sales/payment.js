import { textInput } from '../../utils/InputFields.js';
import setInputValue from '../utils/setInputValue.js';
import format_number from '../../utils/format_number.js';
import { classSelector } from '../../utils/Selectors.js';
import { ymd } from '../../utils/DateFormats.js';
import updateTaxlocalstorage from '../utils/updateTaxlocalstorage.js';

const payment = (vv, privilege) => {
  document.addEventListener('change', (e) => {
    if (e.target.matches('.receipt_date')) {
      const { value } = e.target;
      updateTaxlocalstorage('receipt_date', value);
    }

    if (e.target.matches('.bank_acc_number')) {
      e.stopImmediatePropagation();
      const { value } = e.target;
      const tx = JSON.parse(localStorage.getItem('sales'));
      tx['bank_acc_number'] = value;
      localStorage.setItem('sales', JSON.stringify(tx));
    }

    if (e.target.matches('.pay_type')) {
      e.stopImmediatePropagation();

      const { value } = e.target;

      if (value === 'Cheque') {
        document.querySelector('.chequenumber').innerHTML = `
        <input type="text" class="bank_acc_number" placeholder="Enter cheque number" />
        `;
        const tx = JSON.parse(localStorage.getItem('sales'));
        tx['bank_acc_number'] = '';
        localStorage.setItem('sales', JSON.stringify(tx));
      } else {
        document.querySelector('.chequenumber').innerHTML = '';
        const tx = JSON.parse(localStorage.getItem('sales'));
        localStorage.setItem('sales', JSON.stringify(tx));
      }

      const tx = JSON.parse(localStorage.getItem('sales'));
      tx['pay_type'] = value;
      localStorage.setItem('sales', JSON.stringify(tx));
    }
  });

  setTimeout(() => {
    if (classSelector('receipt_date')) {
      classSelector('receipt_date').valueAsDate = new Date();
    }
  }, 1000);

  return `
    <div class="${privilege}">


    ${textInput({
      type: 'date',
      classname: 'receipt_date',
      required: true,
      label: 'Receipt date',
    })}


      ${textInput({
        type: 'number',
        classname: 'payment trans',
        required: true,
        name: 'payment',
        label: 'Make Payment',
        value: setInputValue(format_number(vv?.newpayment || '')),
      })}


      ${textInput({
        type: 'text',
        classname: 'balance',
        required: true,
        label: 'Balance',
        disabled: 'disabled',
        value: setInputValue(format_number(vv?.balance || '')),
      })}

      <div class="select-inpt">
      <label>Payment Type</label>
      <br>
        <select class="pay_type">
        <option>Cash</option>
        <option>Cheque</option>
        <option>Bank Transfer</option>
        <option>Mobile Money</option>
        </select>
  
        <div class="chequenumber"></div>
      </div>
    </div>
  `;
};

export default payment;
