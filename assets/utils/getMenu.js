
import getLoginuser from '../state/statemanagement/sessionstorage/GET/getLoginuser.js'
const getMenu = (callback) => {
  callback(getLoginuser('menu'));
};
export default getMenu;
