import format_number from '../../../utils/format_number.js';

const setBalance = (val) => {
  if (val) {
    const sumpayment = Number(val?.previouspayment) + Number(val?.newpayment);
    const balance = Number(val?.total) - Number(sumpayment);
    val['balance'] = balance;
    localStorage.setItem('taxes', JSON.stringify(val));
    const vl = JSON.parse(localStorage.getItem('taxes'));
    return format_number(vl.balance);
  }
};

export default setBalance;
