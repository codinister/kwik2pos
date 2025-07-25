import getLoginuser from '../state/sessionstorage/GET/getLoginuser.js';
const roleAccess = () => {
  const role = getLoginuser('user');
  return ['1', '111', '5'].includes(role?.role_id);
};

export default roleAccess;

//roleAccess()
