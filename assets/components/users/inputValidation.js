import getUsersSessionStorage from '../../state/statemanagement/sessionstorage/GET/getUsersSessionStorage.js';
import setUsersSessionStorage from '../../state/statemanagement/sessionstorage/SET/setUsersSessionStorage.js';
import { classSelector } from '../../utils/Selectors.js';

import showSaveuserbtn from './showSaveuserbtn.js';

const inputValidation = (name, message,errorclass) => {
  classSelector(errorclass).textContent = message;
  const ps = getUsersSessionStorage();
  ps[name] = '';
  setUsersSessionStorage(ps);
  showSaveuserbtn();
};

export default inputValidation;
