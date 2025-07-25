import Login from './Login.js';
import innerHTML from '../utils/innerHTML.js';
import sessionRemove from '../state/sessionstorage/REMOVE/sessionRemove.js';
import sessionGet from '../state/sessionstorage/GET/sessionGet.js';

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
    'userprofilerequired',
  ].forEach((v) => {
    if (sessionGet(v)) {
      sessionRemove(v);
    }
  });
  sessionRemove('zsdf');

  innerHTML({
    classname: 'root',
    content: Login(),
  });
};

export default Logout;
