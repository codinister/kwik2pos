import receiptFields from '../fields/receiptFields.js';

const receiptMap = (v) => {
  return {
    ...v,
    payment: Number(v.payment),
    receipts_list: { [v.pay_id]: receiptFields(v) },
    receipt_count: 1,
    total_payments: Number(v.payment) || 0,
  };
};

export default receiptMap;
