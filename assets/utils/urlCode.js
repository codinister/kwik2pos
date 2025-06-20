import getLoginuser from '../state/statemanagement/sessionstorage/GET/getLoginuser.js'

const urlCode = () => {
  const {code} = getLoginuser('user')

  return `&code=${code}`;
};

export default urlCode;
