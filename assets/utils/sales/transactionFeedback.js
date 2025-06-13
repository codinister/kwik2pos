
import noteWrapper from './noteWrapper.js';

const transactionfeedback = (
  cust_id,
  ss_id,
  user_id,
  pay_id,
  cust_name,
  cust_phone,
  cust_email,
  code
) => {
  const type = pay_id.length > 0 ? 'Reciept' : 'Invoice';
  // const url = genURL(ss_id, user_id, code, cust_id, pay_id);
  // const share = sharing(cust_phone, cust_name, cust_email, url,type);

    const url = ''
  const share = '';
  const prev = '';

  // const prev = previews(pay_id, cust_id, ss_id, user_id);

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
