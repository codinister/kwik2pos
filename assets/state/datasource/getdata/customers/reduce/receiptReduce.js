import receiptFields from '../fields/receiptFields.js';

const receiptReduce = (a, b) => {
  if (a[b.cust_id]) {
    a[b.cust_id].receipts_list[b.pay_id] = {
      ...receiptFields(b),
    }
    a[b.cust_id].receipt_count += 1;
    a[b.cust_id].total_payments += Number(b.payment);
  } else {
    a[b.cust_id] = b;
  }
  return a;
};

export default receiptReduce;
