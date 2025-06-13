import format_number from '../../format_number.js';

const setBalance = (val) => {
  if (val) {
    const sumpayment = Number(val?.previouspayment) + Number(val?.newpayment);
    const balance = Number(val?.total) - Number(sumpayment);
    val['balance'] = balance;
    sessionStorage.setItem('sales', JSON.stringify(val));
    const vl = JSON.parse(sessionStorage.getItem('sales'));
    return format_number(vl.balance);
  }
};

export default setBalance;
