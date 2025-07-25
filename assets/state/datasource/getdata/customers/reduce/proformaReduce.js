import proformaFields from '../fields/proformaFields.js';

const proformaReduce = (a, b) => {
  if (a[b.cust_id]) {
    (a[b.cust_id].proforma_count += 1),
      (a[b.cust_id].proforma_total += Number(b.proforma_total));
    a[b.cust_id].proforma_list[b.ss_id] = {
      ...proformaFields(b),
    };
  } else {
    a[b.cust_id] = b;
  }

  return a;
};

export default proformaReduce;
