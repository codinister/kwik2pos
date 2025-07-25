import getLoginuser from '../state/sessionstorage/GET/getLoginuser.js';
import roleAccess from '../utils/roleAccess.js'

const accessControl = (data) => {
  const us = getLoginuser('user');
  if (roleAccess()) {
    return data;
  } else {
    return data.filter((v) => v.user_id === us?.user_id);
  }
};

export default accessControl;
