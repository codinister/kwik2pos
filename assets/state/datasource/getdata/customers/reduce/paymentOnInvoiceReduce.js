const paymentOnInvoiceReduce = (a,b) => {
  if (a[b.ss_id]) {
    a[b.ss_id].total_payments += Number(b.payment);
  } else {
    a[b.ss_id] = b;
  }
  return a;
};

export default paymentOnInvoiceReduce;
