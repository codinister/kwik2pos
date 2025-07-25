
import expiriesList from '../invoices/expiriesList.js'

const salesInvoiceReduce = (a, b) => {
  if (a[b.cust_id]) {
    a[b.cust_id].invoice_total += Number(b.invoice_total);

    a[b.cust_id].invoice_list[b.ss_id] = {
      addbank: b.addbank,
      balance: b.balance,
      code: b.code,
      covid: b.covid,
      covid_rate: b.covid_rate,
      createdAt: b.createdAt,
      cust_id: b.cust_id,
      discount: b.discount,
      duration: b.duration,
      fullname: b.fullname,
      getfund: b.getfund,
      getfund_rate: b.getfund_rate,
      installation: b.installation,
      location: b.location,
      nhil: b.nhil,
      nhil_rate: b.nhil_rate,
      note: b.note,
      phone: b.phone,
      payments: b.payments,
      prepared_by: b.prepared_by,
      profile: b.profile,
      paymentPercentage: b.paymentPercentage,
      sales_date: b.sales_date,
      ss_id: b.ss_id,
      subtotal: b.subtotal,
      total: b.total,
      trans_type: b.trans_type,
      transportation: b.transportation,
      user_id: b.user_id,
      uuid: b.uuid,
      vat: b.vat,
      vat_rate: b.vat_rate,
      withholdingtax: b.withholdingtax,
      withholdingtax_rate: b.withholdingtax_rate,
    };

    a[b.cust_id].expiries.push(expiriesList(b));
  } else {
    a[b.cust_id] = b;
  }

  return a;
};

export default salesInvoiceReduce;
