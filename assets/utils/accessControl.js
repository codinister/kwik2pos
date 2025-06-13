import getLoginuser from '../state/statemanagement/sessionstorage/GET/getLoginuser.js';
import roleAccess from './roleAccess.js';

const accessControl = (arr) => {

  console.log(arr)

  if (getLoginuser().length > 0) {
    const user = getLoginuser();

    if (roleAccess()) {
      return arr;
    } else {
      if (arr[0]?.user_id) {
        return arr.filter((v) => v.user_id === user?.user_id);
      } else {
        console.error('[' + arr[0] + ']' + ' does not contain a user_id');
      }
    }
  } else {
    console.error(arr + ' is not a valid array');
  }
};

export default accessControl;
