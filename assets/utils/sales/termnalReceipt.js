
import getLoginuser from '../../state/statemanagement/sessionstorage/GET/getLoginuser.js'
const termnalReceipt = () => {
  const { receipt_type } = getLoginuser('settings')
  if (receipt_type === 'THERMNAL') {
    return true;
  } else {
    return false;
  }
};

export default termnalReceipt;
