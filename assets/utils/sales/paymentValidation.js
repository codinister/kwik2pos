
import getCode from '../getCode.js';
import getLoginuser from '../../state/statemanagement/sessionstorage/GET/getLoginuser.js'

const paymentValidation = () => {
  const tx = JSON.parse(sessionStorage.getItem('sales'));

  if (tx) {
    const { user_id } = getLoginuser('user')
    const code = getCode();

    return {
      pay_type: tx?.pay_type,
      newpayment: tx?.newpayment,
      createdAt: tx?.receipt_date,
      user_id,
      bank_acc_number: tx?.bank_acc_number,
      code,
    };
  } else {
    return [];
  }
};

export default paymentValidation;
