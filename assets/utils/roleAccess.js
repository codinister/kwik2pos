import getLoginuser from '../state/statemanagement/sessionstorage/GET/getLoginuser.js';
const roleAccess = () => {
  const { role_id } = getLoginuser('user');
  return ['1', '111', '5'].includes(role_id);
};

export default roleAccess;

//roleAccess()
