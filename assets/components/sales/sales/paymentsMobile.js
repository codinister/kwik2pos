import saveInvoice from './saveInvoice.js';
import checkTax from '../utils/checkTax.js';
import checkWithholdingtax from '../utils/checkWithholdingtax.js';
import setInputValue from '../utils/setInputValue.js';
import { textInput } from '../../utils/InputFields.js';
import format_number from '../../utils/format_number.js';
import getIndustry from '../../utils/getIndustry.js';
import othercharges from './othercharges.js';
import updateTaxlocalstorage from '../utils/updateTaxlocalstorage.js';

const paymentsMobile = (vv, privilege) => {
  const industry = getIndustry();

  document.addEventListener('change', (e) => {

    if (e.target.matches('.pay_type')) {
      e.stopImmediatePropagation();
      const {value} = e.target
      updateTaxlocalstorage('pay_type', value)
    }

    if (e.target.matches('.invoice_date')) {
      e.stopImmediatePropagation();
      const {value} = e.target
      updateTaxlocalstorage('invoice_date', value)
    }

  });

  let othercharge = '';

  if (industry === 'roofing company') {
    othercharge = othercharges();
  }

  let invoice_desc = '';

  if (industry !== 'roofing company') {
    invoice_desc = `${textInput({
      type: 'text',
      classname: 'profile trans',
      required: true,
      name: 'profile',
      label: 'Invoice Description',
      value: setInputValue(vv?.profile || ''),
    })}`;
  }

  return `
  <div>
${invoice_desc}
    ${textInput({
      type: 'text',
      classname: 'sub_total',
      required: true,
      label: 'Sub Total ',
      disabled: 'disabled',
      value: setInputValue(format_number(vv?.sub_total || '')),
    })}
    ${textInput({
      type: 'number',
      classname: 'discount trans',
      required: false,
      label: 'Discount',
      name: 'discount',
      disabled: '',
      value: setInputValue(format_number(vv?.discount || '')),
    })}

    <div class="taxbox">
    ${checkTax()}
    ${checkWithholdingtax()}
    </div>

    ${textInput({
      type: 'text',
      classname: 'total',
      required: true,
      label: 'Total',
      disabled: 'disabled',
      value: setInputValue(format_number(vv?.total || '')),
    })}


    ${othercharge}


  <div>

  <div class="${privilege}">

      ${textInput({
        type: 'number',
        classname: 'payment  trans',
        required: true,
        name: 'payment',
        label: 'Make Payment',
        value: '',
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
      </div>

      ${textInput({
        type: 'text',
        classname: 'balance',
        required: true,
        label: 'Balance',
        disabled: 'disabled',
        value: setInputValue(format_number(vv?.balance || '')),
      })}

    </div>

    <div class="save-invoice-btn dbtns">
      ${saveInvoice()}

    <a href="#table-top-id" class=" clearal">Clear all items</a>
    </div>

  </div>
  
  `;
};

export default paymentsMobile;
