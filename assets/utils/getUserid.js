
import getLoginuser from '../state/statemanagement/sessionstorage/GET/getLoginuser.js'

const getUserid = () => {
  const { user_id } = getLoginuser('user')
  return user_id;
};

export default getUserid;
