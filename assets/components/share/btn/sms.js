import sendSMS from '../../data/api/sms/sendSMS.js';
import trimPhone from './trimPhone.js';

const sms = (obj) => {
  const { cust_name, cust_phone, type, url } = obj;

  const mobile = trimPhone(cust_phone);

  document.addEventListener('click', (e) => {
    if (e.target.matches('.smsbtn')) {
      const msg = [
        `Hello ${cust_name}`,
        `Click on the link below to view your ${type}`,
        url,
      ].join('\n\n');

      sendSMS(
        msg,
        mobile,
        'sms-wrapper',
        '<i class="sms-btn cred" title="SMS">SMS</i>'
      );
    }
  });

  if (cust_phone.length > 0) {
    return `
    <div class="sms-wrapper">
        <i class="sms-btn smsbtn" title="SMS">SMS</i>
    </div>
        `;
  } else {
    return '';
  }
};

export default sms;
