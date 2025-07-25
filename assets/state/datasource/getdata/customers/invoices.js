import salesInvoiceMap from './map/salesInvoiceMap.js';
import salesInvoiceReduce from './reduce/salesInvoiceReduce.js';
import paymentOnInvoiceMap from './map/paymentOnInvoiceMap.js';
import paymentOnInvoiceReduce from './reduce/paymentOnInvoiceReduce.js';
import transformInvList from './invoices/transformInvList.js';

const invoices = (obj) => {
  const { invoicedata, allcustomers, receiptdata } = obj;
  const paymentsOnInvoice = Object.values(receiptdata)
    .map((v) => paymentOnInvoiceMap(v))
    .reduce((a, b) => paymentOnInvoiceReduce(a, b), {});

  const allinvoices = Object.values(invoicedata)
    .map((v) => {
      const obj = {
        ...v,
        ...allcustomers[v?.cust_id],
        total_payments: paymentsOnInvoice[v?.ss_id]?.total_payments || 0,
      };

      return salesInvoiceMap(obj);
    })
    .reduce((a, b) => salesInvoiceReduce(a, b), {});

  return (cust_id, v) => {
    const inv = allinvoices[cust_id];

    const { total_debt, invoice_list, aginginvoice } = transformInvList(inv, v);

    return {
      invoice_count: inv ? Object.values(inv?.invoice_list).length : 0,
      total_sales: Number(inv?.invoice_total || 0),
      invoice_list,
      expiries: inv?.expiries.filter(Boolean) || [],
      total_debt,
      aginginvoice,
    };
  };
};

export default invoices;
