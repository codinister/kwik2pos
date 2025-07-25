import receipts from './receipts.js';
import invoices from './invoices.js';
import proformas from './proformas.js';
import fetchAllSettled from './fetchAllSettled.js';
import allCustomers from './allCustomers.js';

const customersprofile = (callback) => {
  Promise.allSettled(fetchAllSettled())
    .then((value) => {
      const allcustomers = allCustomers(value[0].value);

      const allreceipts = receipts(value[3].value);
      const allinvoices = invoices({
        invoicedata: value[1].value,
        allcustomers,
        receiptdata: value[3].value,
      });

      const allproformas = proformas(value[2].value);

      const custprofile = Object.values(allcustomers).map((v) => {
        return {
          ...v,
          ...allproformas(v.cust_id),
          ...allreceipts(v.cust_id, v),
          ...allinvoices(v.cust_id, v),
        };
      });

      callback(custprofile);
    })
    .catch((err) => console.log(err));
};

export default customersprofile;
