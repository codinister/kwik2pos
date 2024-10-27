import shareBaseUrl from './shareBaseUrl.js';
const invUrl = (tax_id, user_id, code, cust_id) => {
  const taxid = btoa(tax_id);
  const userid = btoa(user_id);
  const cod = btoa(code);
  const custid = btoa(cust_id);
  return shareBaseUrl(
    `invoices.html?txd=${taxid}&usd=${userid}&cde=${cod}&cusd=${custid}`
  );
};

export default invUrl;
