import getLoginuser from '../../state/statemanagement/sessionstorage/GET/getLoginuser.js'

const smsSuperAdmin = (ss_id, user_id, cust_id, pay_id) => {
  if (pay_id.length > 0) {
    const sett = getLoginuser('settings')
    const code = sett?.code
    // const url = genURL(ss_id, user_id, code, cust_id, pay_id);

    const url = ''

    if (sett?.sms_sender_id.length > 0 && sett?.activate_receipt_sms === '1') {
      const msg = [
        `New reciept alert!`,
        `Click on the link below to view reciept`,
        url,
      ].join('\n\n');
      //sendSMS(msg, sett?.sms_cc, '', '');
    }
  }
};

export default smsSuperAdmin;
