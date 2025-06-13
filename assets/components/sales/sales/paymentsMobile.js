import saveInvoice from './saveInvoice.js';
import checkTax from '../../../utils/sales/checkTax.js';
import checkWithholdingtax from '../../../utils/sales/checkWithholdingtax.js';
import setInputValue from '../../../utils/sales/setInputValue.js';
import { textInput } from '../../../utils/InputFields.js';
import format_number from '../../../utils/format_number.js';
import othercharges from './othercharges.js';
import updateTaxsessionstorage from '../../../utils/sales/updateTaxsessionstorage.js';
import termnalReceipt from '../../../utils/sales/termnalReceipt.js';
import getPrevilleges from '../../../utils/sales/getPrevilleges.js';
import paymentUtil from './paymentUtil.js';
import industryCheck from '../../../utils/industryCheck.js';

const paymentsMobile = (vv, privilege) => {
  const termnal = termnalReceipt();
  const tx = JSON.parse(sessionStorage.getItem('sales'));
  const trans_type = tx?.trans_type;
  const showpayment = trans_type === 'invoice' ? 'show' : 'hide';



  let othercharge = '';

  if (industryCheck('roofing company')) {
    othercharge = othercharges();
  }

  let invoice_desc = '';

  if (industry !== 'roofing company') {
    if (!termnal) {
      invoice_desc = `${textInput({
        type: 'text',
        classname: 'profile trans',
        required: true,
        name: 'profile',
        label: 'Invoice Description',
        value: setInputValue(vv?.profile || ''),
      })}`;
    }
  }

  // let saveandclearbtns = '';
  // if (trans_type === 'invoice') {
  //   if (user_id === usid && getPrevilleges('salesinvoice')) {
  //     saveandclearbtns = saveInvoice();
  //   }
  // } else {
  //   saveandclearbtns = saveInvoice();
  // }

  return `
  <div>



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
      value: setInputValue(Number(vv?.discount || '')),
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

    ${invoice_desc}
  <div>


  <div class="receipt-fields-container ${privilege}">


   <div class="showpayment ${showpayment}">
    ${paymentUtil()}
  </div>


  </div>

    <div class="save-invoice-btn dbtns">
        ${saveInvoice()}
      <a href="#table-top-id" class="cancelinvoice">Clear</span></a>
    </div>

  </div>
  
  `;
};

export default paymentsMobile;
