import email from './btn/email.js';
import whatsapp from './btn/whatsapp.js';
import sms from './btn/sms.js';

const sharing = (cust_phone, cust_name, cust_email, url,type) => {
  const sett = JSON.parse(sessionStorage.getItem('sinpt'));
  const user = JSON.parse(sessionStorage.getItem('zsdf'));

  const obj = {
    user_name: user?.firstname+' '+user?.lastname,
    user_phone: user?.phone,
    user_email: user?.email,
    comp_name: sett?.comp_name,
    comp_location: sett?.comp_location,
    cust_phone,
    cust_name,
    cust_email,
    url,
    type,

  };

  return `
  <div class="sharing">
  <span>Share</span>
    ${email(obj)}
    ${sms(obj)}
    ${whatsapp(obj)}
  </div>
  `;
};

export default sharing;
