import getLoginuser from '../../data/clientside/localstorage/GET/getLoginuser.js';

const accessControl = (arr) => {
  if (Array.isArray(arr)) {
    const user = getLoginuser();

    const filter = ['1', '111', '5'].includes(user?.role_id);
    if (filter) {
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
