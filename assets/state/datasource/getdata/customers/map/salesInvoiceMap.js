
import expiriesList from '../invoices/expiriesList.js';

const salesInvoiceMap = (v) => {
  return {
    ...v,
    invoice_total: Number(v.total),
    invoice_list: 
      {
        [v.ss_id]: {
          addbank: v.addbank,
          balance: Math.floor(
            Number(v.total) - Number(v?.total_payments)
          ),
          code: v.code,
          covid: v.covid,
          covid_rate: v.covid_rate,
          createdAt: v.createdAt,
          cust_id: v.cust_id,
          discount: v.discount,
          duration: v.duration,
          fullname: v.fullname,
          getfund: v.getfund,
          getfund_rate: v.getfund_rate,
          installation: v.installation,
          location: v.location,
          nhil: v.nhil,
          nhil_rate: v.nhil_rate,
          note: v.note,
          phone: v.phone,
          payments: Number(v?.total_payments),
          prepared_by: v.prepared_by,
          profile: v.profile,
          paymentPercentage:
            Math.floor(
              (100 * Number(v?.total_payments)) /
                Number(v.total)
            ) || 0,
          sales_date: v.sales_date,
          ss_id: v.ss_id,
          subtotal: v.subtotal,
          total: v.total,
          trans_type: v.trans_type,
          transportation: v.transportation,
          user_id: v.user_id,
          uuid: v.uuid,
          vat: v.vat,
          vat_rate: v.vat_rate,
          withholdingtax: v.withholdingtax,
          withholdingtax_rate: v.withholdingtax_rate,
        },
      },
    
    balance: Number(v.total) - Number(v?.total_payments),
    paymentPercentage:
      Math.floor(
        (100 * Number(v?.total_payments)) / Number(v.total)
      ) || 0,

    payments: Number(v?.total_payments),
    profile: v.profile,

    expiries: [expiriesList(v)]
  };
};

export default salesInvoiceMap;
