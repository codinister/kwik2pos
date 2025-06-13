import setUsersSessionStorage from '../sessionstorage/SET/setUsersSessionStorage.js';
import getUsersSessionStorage from '../sessionstorage/GET/getUsersSessionStorage.js';
import showSaveuserbtn from '../../../components/users/showSaveuserbtn.js';
import { classSelector } from '../../../utils/Selectors.js';
import inputValidation from '../../../components/users/inputValidation.js';
import Buttons from '../../../utils/Buttons.js';
import defaultProfileSessionStorage from '../sessionstorage/default/defaultProfileSessionStorage.js';
import defaultUsersSessionStorage from '../sessionstorage/default/defaultUsersSessionStorage.js';

const userReducer = (e) => {
  if (e.target.matches('.userprof')) {
    const { name, value } = e.target;

    defaultProfileSessionStorage();

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

    const obj = JSON.parse(sessionStorage.getItem('userprofile'));
    const newobj = { ...obj, [name]: value };
    sessionStorage.setItem('userprofile', JSON.stringify(newobj));
  }

  if (e.target.matches('.nte')) {
    const { name, value } = e.target;
    const obj = JSON.parse(sessionStorage.getItem('usernote'));
    const newobj = { ...obj, [name]: value };
    sessionStorage.setItem('usernote', JSON.stringify(newobj));

    const data = Object.values(
      JSON.parse(sessionStorage.getItem('usernote'))
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

    defaultUsersSessionStorage();

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

    const jsn = getUsersSessionStorage();
    jsn['modified'] = 1;
    const arr = { ...jsn, [name]: value };
    setUsersSessionStorage(arr);
    showSaveuserbtn();
  }

  if (e.target.matches('.uf')) {
    const checked = e.target?.checked;
    const { name, value } = e.target;
    const jsn = getUsersSessionStorage();
    jsn['modified'] = 1;
    if (checked) {
      jsn['role_id'] = value;
    } else {
      jsn['role_id'] = '';
    }
    setUsersSessionStorage(jsn);
    showSaveuserbtn();
  }

  if (e.target.matches('.st')) {
    const checked = e.target?.checked;
    const { name, value } = e.target;
    const jsn = getUsersSessionStorage();
    jsn['modified'] = 1;
    if (checked) {
      jsn['status'] = value;
    } else {
      jsn['status'] = '';
    }
    setUsersSessionStorage(jsn);
    showSaveuserbtn();
  }

  if (e.target.matches('.uchk')) {
    const checked = e.target?.checked;
    const jsn = getUsersSessionStorage();
    const { name, value } = e.target;

    defaultUsersSessionStorage();

    const obj = {
      Products: checked
        ? {
            usermenu_id: '',
            menu_name: 'Products',
            menu_parent: 'null',
            menu_id: 4,
          }
        : {
            usermenu_id: jsn?.menus?.Products?.usermenu_id,
            menu_name: '',
            menu_parent: '',
            menu_id: 4,
          },
      SMS: checked
        ? {
            usermenu_id: '',
            menu_name: 'SMS',
            menu_parent: 'null',
            menu_id: 5,
          }
        : {
            usermenu_id: jsn?.menus?.SMS?.usermenu_id,
            menu_name: '',
            menu_parent: '',
            menu_id: 5,
          },
      Salesinvoice: checked
        ? {
            usermenu_id: '',
            menu_name: 'Salesinvoice',
            menu_parent: 'Privileges',
            menu_id: 7,
          }
        : {
            usermenu_id: jsn?.menus?.Salesinvoice?.usermenu_id,
            menu_name: '',
            menu_parent: '',
            menu_id: 7,
          },

      Addrowsbutton: checked
        ? {
            usermenu_id: '',
            menu_name: 'Addrowsbutton',
            menu_parent: 'Privileges',
            menu_id: 8,
          }
        : {
            usermenu_id: jsn?.menus?.Addrowsbutton?.usermenu_id,
            menu_name: '',
            menu_parent: '',
            menu_id: 8,
          },
      Unitprice: checked
        ? {
            usermenu_id: '',
            menu_name: 'Unitprice',
            menu_parent: 'Privileges',
            menu_id: 9,
          }
        : {
            usermenu_id: jsn?.menus?.Unitprice?.usermenu_id,
            menu_name: '',
            menu_parent: '',
            menu_id: 9,
          },

      Invoicedesc: checked
        ? {
            usermenu_id: '',
            menu_name: 'Invoicedesc',
            menu_parent: 'Privileges',
            menu_id: 10,
          }
        : {
            usermenu_id: jsn?.menus?.Invoicedesc?.usermenu_id,
            menu_name: '',
            menu_parent: '',
            menu_id: 10,
          },

      Assignto: checked
        ? {
            usermenu_id: '',
            menu_name: 'Assignto',
            menu_parent: 'Privileges',
            menu_id: 11,
          }
        : {
            usermenu_id: jsn?.menus?.Assignto?.usermenu_id,
            menu_name: '',
            menu_parent: '',
            menu_id: 11,
          },
    };

    jsn['menus'] = { ...jsn?.menus, [name]: obj[name] };
    jsn['modified'] = 1;
    setUsersSessionStorage(jsn);
    showSaveuserbtn();
  }
};

export default userReducer;
