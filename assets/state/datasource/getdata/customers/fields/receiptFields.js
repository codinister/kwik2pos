import inv_num from '../../../../../utils/inv_num.js';

const receiptFields = (v) => {
  return {
    bank_acc_number: v.bank_acc_number,
    code: v.code,
    createdAt: v.createdAt,
    cust_id: v.cust_id,
    pay_id: v.pay_id,
    pay_type: v.pay_type,
    payment: v.payment,
    profile: v.profile,
    receipt_no: inv_num(v.pay_id),
    ss_id: v.ss_id,
    total: v.total,
    user_id: v.user_id,
  };
};

export default receiptFields;
