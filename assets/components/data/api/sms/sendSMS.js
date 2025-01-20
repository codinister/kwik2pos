import displayToast from '../../../utils/displayToast.js';
import Spinner from '../../../utils/Spinner.js';

const sendSMS = (msg, cont, wrapper, content) => {
  const sett = JSON.parse(localStorage.getItem('sinpt'));

  const key = sett?.sms_api_key;
  const sender_id = sett?.sms_sender_id;

  Spinner(wrapper);

  fetch(
    `https://apps.mnotify.net/smsapi?key=${key}&to=${cont}&msg=${msg}&sender_id=${sender_id}`
  )
    .then((resp) => resp.json())
    .then((data) => {
      if (data?.code === '1000') {
        document.querySelector(`.${wrapper}`).innerHTML = content;
        displayToast('lightgreen', 'Message submited successful');
        return;
      }

      const resp = {
        1002: 'SMS sending failed',
        1003: 'insufficient balance',
        1004: 'invalid API key',
        1005: 'invalid Phone Number',
        1006: 'invalid Sender ID. Sender ID must not be more than 11 Characters. Characters include white space.',
        1007: 'Message scheduled for later delivery',
        1008: 'Empty Message',
        1009: 'Empty from date and to date',
        1010: 'No mesages has been sent on the specified dates using the specified api key',
        1011: 'Numeric Sender IDs are not allowed',
        1012: 'Sender ID is not registered. Please contact our support team via senderids@mnotify.com or call 0541509394 for assistance',
      };

      displayToast('bgdanger', resp[data?.code]);

      document.querySelector(`.${wrapper}`).innerHTML = content;
    });
};

export default sendSMS;
