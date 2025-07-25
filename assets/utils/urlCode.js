import getLoginuser from '../state/sessionstorage/GET/getLoginuser.js'

const urlCode = () => {
  const us = getLoginuser('user')
  return `&code=${us?.code}`;
};

export default urlCode;
