import Login from './Login.js';
import { classSelector } from '../utils/Selectors.js';

const Logout = () => {
  [
    'sales',
    'prodsessionstorage',
    'usersessionstorage',
    'prozdlist',
    'nuser',
    'stocks',
    'qtys',
    'soldinv',
    'newrec',
    'rend',
    'filterby',
    'contract',
    'custinp',
    'custinfo',
    'deletedproformas',
    'deletedinvoices',
    'deletedreceipt',
    'prodsessionstorage',
    'userprofile',
    'usernote',
    'settingupdate',
    'smsinpt',
    'nn',
    'checkmark',
    'prodType', 
    'userprofile',
    'userprofilerequired'
  ].forEach((v) => {
    if (sessionStorage.getItem(v)) {
      sessionStorage.removeItem(v);
    }
  });
  sessionStorage.removeItem('zsdf');
  classSelector('root').innerHTML = Login();
};

export default Logout;
