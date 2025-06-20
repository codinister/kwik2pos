import getLoginuser from '../state/statemanagement/sessionstorage/GET/getLoginuser.js'


const getSuperadmin = () => {
  const { superadmin } = getLoginuser('user')
  return superadmin;
};
export default getSuperadmin;
