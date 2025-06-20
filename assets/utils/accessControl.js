import getLoginuser from '../state/statemanagement/sessionstorage/GET/getLoginuser.js';
import roleAccess from './roleAccess.js';

const accessControl = (arr) => {
  if (sessionStorage.getItem('zsdf')) {
    const user = getLoginuser('user');

    if (Object.values(arr).length > 0) {


      if (roleAccess()) {
        return arr;
      } else {
        if (arr[0]?.user_id) {
          return arr.filter((v) => v.user_id === user?.user_id);
        } else {
          console.error('An error occured!');
        }
      }
    } else {
      console.error('Valid array required!');
    }
  }
};

export default accessControl;
