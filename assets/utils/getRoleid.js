
import getLoginuser from '../state/statemanagement/sessionstorage/GET/getLoginuser.js'

const getRoleid = () => {
  const { role_id } = getLoginuser('user')
  return role_id;
};

export default getRoleid;
