import getLoginuser from "../state/statemanagement/sessionstorage/GET/getLoginuser.js";

const getCode = () => {
  if(sessionStorage.getItem('zsdf')){
    const { code } = getLoginuser('settings')
    return code;
  }
  else{
    return ''
  }

};
export default getCode;
