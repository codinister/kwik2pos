import setUsersLocalstorage from '../localstorage/SET/setUsersLocalstorage.js';
import getUsersLocalstorage from '../localstorage/GET/getUsersLocalstorage.js';
import showSaveuserbtn from '../../../users/showSaveuserbtn.js';
import { classSelector } from '../../../utils/Selectors.js';
import inputValidation from '../../../users/inputValidation.js';
import Buttons from '../../../utils/Buttons.js';
import defaultProfileLocalstorage from '../localstorage/default/defaultProfileLocalstorage.js';
import defaultUsersLocalstorage from '../localstorage/default/defaultUsersLocalstorage.js';

const userReducer = (e) => {
  if (e.target.matches('.userprof')) {
    const { name, value } = e.target;

    defaultProfileLocalstorage();

    if (name === 'password') {
      if (value.length < 6) {
        classSelector('passworderr1').textContent =
          'Password length must be 6 or more!';
        return;
      } else {
        classSelector('passworderr1').textContent = '';
      }
    }

    if (name === 'email') {
      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (value.match(validRegex)) {
        classSelector('emailerr1').textContent = '';
      } else {
        classSelector('emailerr1').textContent = 'Valid email required!!';
        return;
      }
    }

    if (name === 'phone') {
      if (value.length < 10) {
        classSelector('phoneerr1').textContent =
          'Phone number must be 10 or more!';
        return;
      } else {
        classSelector('phoneerr1').textContent = '';
      }
    }

    const obj = JSON.parse(localStorage.getItem('userprofile'));
    const newobj = { ...obj, [name]: value };
    localStorage.setItem('userprofile', JSON.stringify(newobj));
  }

  if (e.target.matches('.nte')) {
    const { name, value } = e.target;
    const obj = JSON.parse(localStorage.getItem('usernote'));
    const newobj = { ...obj, [name]: value };
    localStorage.setItem('usernote', JSON.stringify(newobj));

    const data = Object.values(
      JSON.parse(localStorage.getItem('usernote'))
    ).filter(Boolean).length;

    if (data > 3) {
      classSelector('savenote-wrapper').innerHTML = Buttons([
        {
          btnclass: 'savenotebtn',
          btnname: 'SAVE NOTE',
        },
      ]);
    } else {
      classSelector(
        'savenote-wrapper'
      ).innerHTML = `<span>All Note details fields required!</span>`;
    }
  }

  if (e.target.matches('.us')) {
    const { name, value } = e.target;

    defaultUsersLocalstorage();

    if (name === 'password') {
      if (value.length < 6) {
        inputValidation(
          'password',
          'Password length must be 6 or more!',
          'passworderr6'
        );
        return;
      } else {
        classSelector('passworderr6').textContent = '';
      }
    }

    if (name === 'email') {
      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (value.match(validRegex)) {
        classSelector('emailerr4').textContent = '';
      } else {
        inputValidation('email', 'Valid email required!!', 'emailerr4');
        return;
      }
    }

    if (name === 'phone') {
      if (value.length < 10) {
        inputValidation(
          'phone',
          'Phone number must be 10 or more!',
          'phoneerr5'
        );
        return;
      } else {
        classSelector('phoneerr5').textContent = '';
      }
    }

    const jsn = getUsersLocalstorage();
    jsn['modified'] = 1;
    const arr = { ...jsn, [name]: value };
    setUsersLocalstorage(arr);
    showSaveuserbtn();
  }

  if (e.target.matches('.uf')) {
    const checked = e.target?.checked;
    const { name, value } = e.target;
    const jsn = getUsersLocalstorage();
    jsn['modified'] = 1;
    if (checked) {
      jsn['role_id'] = value;
    } else {
      jsn['role_id'] = '';
    }
    setUsersLocalstorage(jsn);
    showSaveuserbtn();
  }

  if (e.target.matches('.st')) {
    const checked = e.target?.checked;
    const { name, value } = e.target;
    const jsn = getUsersLocalstorage();
    jsn['modified'] = 1;
    if (checked) {
      jsn['status'] = value;
    } else {
      jsn['status'] = '';
    }
    setUsersLocalstorage(jsn);
    showSaveuserbtn();
  }

  if (e.target.matches('.uchk')) {
    const checked = e.target?.checked;
    const jsn = getUsersLocalstorage();
    const { name, value } = e.target;

    const obj = {
      Products: checked
        ? {
            usermenu_id: '',
            menu_name: 'Products',
            menu_parent: 'null',
            menu_id: 4,
          }
        : {
            usermenu_id: jsn?.menus?.products?.usermenu_id,
            menu_name: '',
            menu_parent: '',
            menu_id: '',
          },
      SMS: checked
        ? {
            usermenu_id: '',
            menu_name: 'SMS',
            menu_parent: 'null',
            menu_id: 5,
          }
        : {
            usermenu_id: jsn?.menus?.sms?.usermenu_id,
            menu_name: '',
            menu_parent: '',
            menu_id: '',
          },
      Salesinvoice: checked
        ? {
            usermenu_id: '',
            menu_name: 'Salesinvoice',
            menu_parent: 'Privileges',
            menu_id: 7,
          }
        : {
            usermenu_id: jsn?.menus?.salesinvoice?.usermenu_id,
            menu_name: '',
            menu_parent: '',
            menu_id: '',
          },
      Addrowsbutton: checked
        ? {
            usermenu_id: '',
            menu_name: 'Addrowsbutton',
            menu_parent: 'Privileges',
            menu_id: 8,
          }
        : {
            usermenu_id: jsn?.menus?.addrowsbutton?.usermenu_id,
            menu_name: '',
            menu_parent: '',
            menu_id: '',
          },
      Unitprice: checked
        ? {
            usermenu_id: '',
            menu_name: 'Unitprice',
            menu_parent: 'Privileges',
            menu_id: 9,
          }
        : {
            usermenu_id: jsn?.menus?.unitprice?.usermenu_id,
            menu_name: '',
            menu_parent: '',
            menu_id: '',
          },

      Invoicedesc: checked
        ? {
            usermenu_id: '',
            menu_name: 'Invoicedesc',
            menu_parent: 'Privileges',
            menu_id: 10,
          }
        : {
            usermenu_id: jsn?.menus?.invoicedesc?.usermenu_id,
            menu_name: '',
            menu_parent: '',
            menu_id: '',
          },
    };

    jsn['menus'] = { ...jsn?.menus, [name]: obj[name] };
    jsn['modified'] = 1;
    setUsersLocalstorage(jsn);
    showSaveuserbtn();
  }
};

export default userReducer;
