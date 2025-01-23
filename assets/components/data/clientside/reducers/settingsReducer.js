
import { classSelector } from '../../../utils/Selectors.js';


const settingsReducer = (e) => {
  if (e.target.matches('.comp_logo')) {
    if (e.target.files && e.target.files[0]) {
      const fr = new FileReader();

      fr.onload = function (e) {
        const res = e.target.result;
        classSelector('logoimg').setAttribute('src', res);
      };

      fr.readAsDataURL(e.target.files[0]);
    }
  }

  if (e.target.matches('.sinpt')) {
    const { name, value, checked } = e.target;

    if (name === 'comp_email') {
      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (value.match(validRegex)) {
        classSelector('compemail').textContent = '';
      } else {
        classSelector('compemail').textContent = 'Valid email required!!';
        return;
      }
    }


    const obj = JSON.parse(localStorage.getItem('settingupdate'));

    obj['modify'] = 1;

    if (checked && name === 'activate_receipt_sms') {
      obj['activate_receipt_sms'] = 1;
      localStorage.setItem('settingupdate', JSON.stringify(obj));
    } else if(name === 'activate_receipt_sms') {
      obj['activate_receipt_sms'] = 0;
      localStorage.setItem('settingupdate', JSON.stringify(obj));
    }

    if (name !== 'activate_receipt_sms') {
      const newobj = { ...obj, [name]: value };
      localStorage.setItem('settingupdate', JSON.stringify(newobj));
    }
  }
};

export default settingsReducer;
