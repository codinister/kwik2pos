import getLoginuser from '../state/statemanagement/sessionstorage/GET/getLoginuser.js'

const getIndustry = () => {
  const sett = getLoginuser('settings')
  return sett?.industry;
};

export default getIndustry;
