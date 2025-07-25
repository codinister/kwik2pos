const paymentOnInvoiceMap = (v) => {
  return {
    ss_id: v.ss_id,
    cust_id: v.cust_id,
    payment: Number(v.payment),
    total_payments: Number(v.payment) || 0,
  };
};

export default paymentOnInvoiceMap;
