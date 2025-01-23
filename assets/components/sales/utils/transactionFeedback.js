import genURL from '../../share/genURL.js';
import previews from '../../share/previews.js';
import sharing from '../../share/sharing.js';
import noteWrapper from './noteWrapper.js';

const transactionfeedback = (
  cust_id,
  tax_id,
  user_id,
  pay_id,
  cust_name,
  cust_phone,
  cust_email,
  code
) => {

  const type = pay_id.length > 0 ? 'Reciept' : 'Invoice'
  const url = genURL(tax_id, user_id, code, cust_id, pay_id);
  const share = sharing(cust_phone, cust_name, cust_email, url,type);
  const prev = previews(pay_id, cust_id, tax_id, user_id);

  return `
  <div class="transactionfeedback-bx">
  <div> 
  <span title="Close" class="cancelsales">X</span>
   </div>
  <div>
  ${prev} ${share}
  </div>

${noteWrapper()}


  </div>
  `;
};

export default transactionfeedback;
