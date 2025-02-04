import expDate from '../../../../../preview/utils/expDate.js';
import accessControl from '../../../sales/utils/accessControl.js';
import { expdate_left, ymd } from '../../../utils/DateFormats.js';

const customersprofile = (callback) => {
  const baseURL = 'router.php?controller=customersprofile&task';
  Promise.allSettled([
    fetch(`${baseURL}=getCustomers`).then((resp) => resp.json()),
    fetch(`${baseURL}=getInvoices`).then((resp) => resp.json()),
    fetch(`${baseURL}=getProformas`).then((resp) => resp.json()),
    fetch(`${baseURL}=getReceipts`).then((resp) => resp.json()),
  ])
    .then((value) => {
      if(value[0].status !== 'rejected'){
      /*
       * ALL CUSTOMERS 0
       */
      
      const allcustomers = Object.values(value[0].value).reduce((a, b) => {
        a[b.cust_id] = b;
        return a;
      }, {});

      /*
       * ALL RECEIPTS 3
       */

      const allreceipts = Object.values(value[3].value)
        .map((v) => {
          return {
            ...v,
            payment: Number(v.payment),
            receipts: [{ ...v }],
            receipt_count: 1,
            total_payments: Number(v.payment) || 0,
          };
        })
        .reduce((a, b) => {
          if (a[b.cust_id]) {
            a[b.cust_id].receipt_count += 1;
            a[b.cust_id].total_payments += Number(b.total_payments);
            a[b.cust_id].receipts.push({
              bank_acc_number: b.bank_acc_number,
              code: b.code,
              createdAt: b.createdAt,
              cust_id: b.cust_id,
              pay_id: b.pay_id,
              pay_type: b.pay_type,
              payment: b.payment,
              profile: b.profile,
              receipt_no: b.receipt_no,
              tax_id: b.tax_id,
              updatedAt: b.updatedAt,
              user_id: b.user_id,
            });
          } else {
            a[b.cust_id] = b;
          }
          return a;
        }, {});

      /*
       * ALL INVOICES 1
       */
      const ssell = Object.values(value[1].value).map((v) => {
        const durations = Number(v.item_total) / Number(v.unit_price);
        return { ...v, duration: Math.floor(durations) };
      });

      const sett = JSON.parse(localStorage.getItem('sinpt'));
      const durationType = sett?.duration;

      const allinvoices = ssell
        .map((v) => {
          const daysleft =
            16 / Number(expdate_left(v.duration, v.sales_date)) > 1
              ? expdate_left(v.duration, v.sales_date)
              : 0;

          const custo = allcustomers[v.cust_id];
          const rec = allreceipts[v.cust_id];

          return {
            ...v,

            fullname: !!custo ? custo?.fullname : '',
            phone: !!custo ? custo?.phone : '',

            invoice_total: Number(v.total),
            invoice_count: 1,
            invoice_list: { [v.tax_id]: { ...v } },

            payments: !!rec ? rec?.total_payments : 0,
            profile: v.profile,

            expiries:
              daysleft > 1
                ? {
                    [v.tax_id]: {
                      cust_id: v.cust_id,
                      fullname: custo ? custo?.fullname : '',
                      phone: custo ? custo?.phone : '',
                      tax_id: v.tax_id,
                      duration: v.duration,
                      sales_date: v.sales_date,
                      exp_date: expDate(durationType, v.duration, v.sales_date),
                      profile: v.profile,
                      user_id: v.user_id,
                    },
                  }
                : {},
          };
        })
        .reduce((a, b) => {
          if (a[b.cust_id]) {
            const daysleft =
              16 / Number(expdate_left(b.duration, b.sales_date)) > 1
                ? expdate_left(b.duration, b.sales_date)
                : 0;

            a[b.cust_id].invoice_count += 1;
            a[b.cust_id].invoice_total += Number(b.invoice_total);

            if (daysleft > 1) {
              a[b.cust_id].expiries[b.tax_id] = {
                cust_id: b.cust_id,
                fullname: b.fullname,
                phone: b.phone,
                tax_id: b.tax_id,
                duration: b.duration,
                sales_date: b.sales_date,
                exp_date: b.exp_date,
                profile: b.profile,
                user_id: b.user_id,
              };
            }

            a[b.cust_id].invoice_list[b.tax_id] = {
              addbank: b.addbank,
              code: b.code,
              covid: b.covid,
              covid_rate: b.covid_rate,
              createdAt: b.createdAt,
              cust_id: b.cust_id,
              discount: b.discount,
              duration: b.duration,
              end_date: b.end_date,
              est_id: b.est_id,
              exp_date: b.exp_date,
              getfund: b.getfund,
              getfund_rate: b.getfund_rate,
              installation: b.installation,
              item_total: b.item_total,
              location: b.location,
              nhil: b.nhil,
              nhil_rate: b.nhil_rate,
              note: b.note,
              prepared_by: b.prepared_by,
              profile: b.profile,
              sales_date: b.sales_date,
              subtotal: b.subtotal,
              tax_id: b.tax_id,
              total: b.total,
              trans_type: b.trans_type,
              transportation: b.transportation,
              unit_price: b.unit_price,
              updatedAt: b.updatedAt,
              user_id: b.user_id,
              uuid: b.uuid,
              vat: b.vat,
              vat_rate: b.vat_rate,
              withholdingtax: b.withholdingtax,
              withholdingtax_rate: b.withholdingtax_rate,
            };
          } else {
            a[b.cust_id] = b;
          }

          return a;
        }, {});

      /*
       * ALL PROFORMAS 2
       */
      const allproformas = Object.values(value[2].value)
        .map((v) => {
          return {
            ...v,
            proforma_count: 1,
            proforma_total: Number(v.total),
            proforma_list: { [v.tax_id]: { ...v } },
          };
        })
        .reduce((a, b) => {
          if (a[b.cust_id]) {
            (a[b.cust_id].proforma_count += 1),
              (a[b.cust_id].proforma_total += Number(b.proforma_total));

            a[b.cust_id].proforma_list[b.tax_id] = {
              addbank: b.addbank,
              code: b.code,
              covid: b.covid,
              covid_rate: b.covid_rate,
              createdAt: b.createdAt,
              cust_id: b.cust_id,
              discount: b.discount,
              end_date: b.end_date,
              est_id: b.est_id,
              getfund: b.getfund,
              getfund_rate: b.getfund_rate,
              installation: b.installation,
              location: b.location,
              nhil: b.nhil,
              nhil_rate: b.nhil_rate,
              note: b.note,
              prepared_by: b.prepared_by,
              profile: b.profile,
              subtotal: b.subtotal,
              tax_id: b.tax_id,
              total: b.total,
              trans_type: b.trans_type,
              transportation: b.transportation,
              updatedAt: b.updatedAt,
              user_id: b.user_id,
              uuid: b.uuid,
              vat: b.vat,
              vat_rate: b.vat_rate,
              withholdingtax: b.withholdingtax,
              withholdingtax_rate: b.withholdingtax_rate,
            };
          } else {
            a[b.cust_id] = b;
          }

          return a;
        }, {});

      //CUSTOMER PROFILE
      const custprofile = Object.values(allcustomers).map((v) => {
        const rec = allreceipts[v.cust_id];
        const inv = allinvoices[v.cust_id];
        const prof = allproformas[v.cust_id];

        const invoice_list_data = inv ? Object.values(inv?.invoice_list) : [];

        const total_sales = invoice_list_data.reduce((a, b) => {
          return Number(a) + Number(b.total);
        }, 0);

        const total_transactions = total_sales;
        const total_payment = rec ? rec?.total_payments : 0;
        const total_debt = Number(total_transactions) - Number(total_payment);

        return {
          ...v,

          //begin receipt
          receipt_count: rec ? rec?.receipt_count : 0,
          payments_received: total_payment,
          receipt_list: rec ? rec?.receipts : [],

          //begin invoice
          invoice_count: inv ? inv?.invoice_count : 0,
          invoice_total: inv ? inv?.invoice_total : 0,
          invoice_list: invoice_list_data,
          expiries: inv ? Object.values(inv?.expiries) : [],
          aginginvoice:
            total_debt > 0
              ? {
                  fullname: v.fullname,
                  phone: v.phone,
                  email: v.email,
                  location: v.location,
                  user_id: v.user_id,
                  cust_id: v.cust_id,
                  total: inv ? inv?.invoice_total : 0,
                  payment: total_payment,
                  debt: total_debt,
                }
              : '',

          total_sales,
          total_debt,

          //begin proforma
          proforma_count: prof ? prof?.proforma_count : 0,
          proforma_total: prof ? prof?.proforma_total : 0,
          proforma_list: prof ? Object.values(prof?.proforma_list) : [],
        };
      });

      const data = accessControl(custprofile);

      callback(data);
}})
    .catch((err) => console.log(err));
};

export default customersprofile;
