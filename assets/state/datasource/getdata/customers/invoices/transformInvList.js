const transformInvList = (inv, v) => {
  const total_payments = inv
    ? Object.values(inv?.invoice_list)
        .map((v) => v)
        .flat(2)
        .filter(Boolean)
        .reduce((a, b) => {
          return Number(a) + Number(b.payments);
        }, 0)
    : 0;

  const total_debt = Number(inv?.invoice_total || 0) - Number(total_payments);

  const invoice_list = inv
    ? Object.values(inv?.invoice_list)
        .map((v) => v)
        .flat(2)
        .filter(Boolean)
    : [];

  const aginginvoice = Object.values(invoice_list).filter(
    (v) => Number(v.balance) > 0
  );

  return { total_debt, invoice_list, aginginvoice };
};

export default transformInvList;
