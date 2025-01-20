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
      /*
       * ALL CUSTOMERS
       */
      const allcustomers = Object.values(value[0].value).reduce((a, b) => {
        a[b.cust_id] = b;
        return a;
      }, {});

      /*
       * ALL RECEIPTS
       */

      const allreceipts = Object.values(value[3].value)
        .map((v) => ({
          ...v,
          payment: Number(v.payment),
          receipts: [{ ...v }],
          receipt_count: 1,
          total_payments: Number(v.payment) || 0,
        }))
        .reduce((a, b) => {
          if (a[b.cust_id]) {
            a[b.cust_id].receipt_count += Number(b.receipt_count);
            a[b.cust_id].total_payments += Number(b.total_payments);
            delete b.receipts;
            delete b.total_payments;
            delete b.receipt_count;
            a[b.cust_id].receipts.push({ ...b });
          } else {
            a[b.cust_id] = b;
          }
          return a;
        }, {});

      /*
       * ALL INVOICES
       */
      const allinvoices = Object.values(value[1].value)
        .map((v) => {
          const daysleft =
            expdate_left(v.duration, v.sales_date) <= 14
              ? expdate_left(v.duration, v.sales_date)
              : 0;
          const custo = allcustomers[v.cust_id];
          const rec = allreceipts[v.cust_id];

          return {
            ...v,

            fullname: custo ? custo?.fullname : '',
            phone: custo ? custo?.phone : '',

            invoice_total: Number(v.total),
            invoice_count: 1,
            invoice_list: { [v.tax_id]: { ...v } },

            payments: rec ? rec?.total_payments : 0,
            profile: v.profile,

            expiries:
              daysleft > 1
                ? {
                    [v.exp_date]: {
                      cust_id: v.cust_id,
                      fullname: custo ? custo?.fullname : '',
                      phone: custo ? custo?.phone : '',
                      tax_id: v.tax_id,
                      exp_date: v.exp_date,
                      profile: v.profile,
                      user_id: v.user_id,
                    },
                  }
                : {},
          };
        })
        .reduce((a, b) => {
          if (a[b.cust_id]) {
            const dateleft =
              expdate_left(b.duration, b.sales_date) <= 14
                ? expdate_left(b.duration, b.sales_date)
                : 0;

            a[b.cust_id].invoice_count += 1;
            a[b.cust_id].invoice_total += Number(b.invoice_total);

            delete b.invoice_list;
            delete b.payments;
            a[b.cust_id].invoice_list[b.tax_id] = { ...b };

            if (dateleft > 1) {
              a[b.cust_id].expiries[b.exp_date] = {
                cust_id: b.cust_id,
                fullname: b.fullname,
                phone: b.phone,
                tax_id: b.tax_id,
                exp_date: b.exp_date,
                profile: b.profile,
                user_id: b.user_id,
              };
            } else {
            }
          } else {
            a[b.cust_id] = b;
          }

          return a;
        }, {});

      /*
       * ALL PROFORMAS
       */
      const allproformas = Object.values(value[2].value)
        .map((v) => {
          return {
            ...v,
            proforma_count: 1,
            proforma_total: Number(v.total),
            proforma_list: [
              {
                ...v,
              },
            ],
          };
        })
        .reduce((a, b) => {
          if (a[b.cust_id]) {
            (a[b.cust_id].proforma_count += 1),
              (a[b.cust_id].proforma_total += Number(b.proforma_total));

            delete b.proforma_count;
            delete b.proforma_total;
            a[b.cust_id].proforma_list.push({ ...b });
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
          expiries: inv ? inv?.expiries : {},
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
          proforma_list: prof ? prof?.proforma_list : [],
        };
      });

      const data = accessControl(custprofile);

      callback(data);
    })
    .catch((err) => console.log(err));
};

export default customersprofile;
