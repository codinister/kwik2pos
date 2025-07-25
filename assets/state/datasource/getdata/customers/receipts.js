import receiptMap from './map/receiptMap.js';
import receiptReduce from './reduce/receiptReduce.js';
import receiptListTransform from '../../../../utils/receiptListTransform.js';
const receipts = (data) => {
  const allreceipts = Object.values(data)
    .map((v) => receiptMap(v))
    .reduce((a, b) => receiptReduce(a, b), {});



  return (cust_id, v) => {
    const rec = allreceipts[cust_id];
    return {
      receipt_count: Number(rec?.receipt_count || 0),
      total_payments: rec?.total_payments,
      receipt_list: rec
        ? Object.values(rec.receipts_list)
            .flat(3)
            .map((vl) => {
              return { ...vl, fullname: v.fullname, phone: v.phone };
            })
        : [],
    };
  };
};

export default receipts;
