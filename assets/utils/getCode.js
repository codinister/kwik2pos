import getLoginuser from "../state/sessionstorage/GET/getLoginuser.js";
import sessionGet from "../state/sessionstorage/GET/sessionGet.js";

const getCode = () => {
  if(sessionGet('zsdf')){
    const { code } = getLoginuser('settings')
    return code;
  }
  else{
    return ''
  }

};
export default getCode;
