import sendSMS from '../../data/api/sms/sendSMS.js';
import genURL from '../../share/genURL.js';

const smsSuperAdmin = (tax_id, user_id, cust_id, pay_id) => {
  if (pay_id.length > 0) {
    const sett = JSON.parse(localStorage.getItem('sinpt'));
    const code = sett?.code
    const url = genURL(tax_id, user_id, code, cust_id, pay_id);

    if (sett?.sms_sender_id.length > 0 && sett?.activate_receipt_sms === '1') {
      const msg = [
        `New reciept alert!`,
        `Click on the link below to view reciept`,
        url,
      ].join('\n\n');
      sendSMS(msg, sett?.sms_cc, '', '');
    }
  }
};

export default smsSuperAdmin;
