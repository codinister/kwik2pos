import getLoginuser from '../state/statemanagement/sessionstorage/GET/getLoginuser.js';

const getSettings = (callback) => {
  callback(getLoginuser('settings'));
};

export default getSettings;
