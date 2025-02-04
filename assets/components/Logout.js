import Login from './Login.js';
import { classSelector } from './utils/Selectors.js';

const Logout = () => {
  [
    'sales',
    'prodlocalstorage',
    'userlocalstorage',
    'prozdlist',
    'zsdf',
    'nuser',
    'stocks',
    'qtys',
    'soldinv',
    'newrec',
    'filterby',
    'contract',
    'custinp',
    'custinfo',
    'deletedproformas',
    'deletedinvoices',
    'deletedreceipt',
    'prodlocalstorage',
    'userprofile',
    'usernote',
    'settingupdate',
    'smsinpt',
  ].forEach((v) => {
    if (localStorage.getItem(v)) {
      localStorage.removeItem(v);
    }
  });
  sessionStorage.removeItem('lgn');
  classSelector('root').innerHTML = Login();
};

export default Logout;
