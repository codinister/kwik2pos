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
          const daysleft = 14 / expdate_left(v.exp_date);
          const custo = allcustomers[v.cust_id];
          const rec = allreceipts[v.cust_id];

          return {
            ...v,

            fullname: custo ? custo?.fullname : '',
            phone: custo ? custo?.phone : '',

            invoice_total: Number(v.total),
            invoice_count: 1,
            invoice_list: [{ ...v }],

            payments: rec ? rec?.total_payments : 0,
            total_debt: Number(v.total),
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
                    },
                  }
                : {},
          };
        })
        .reduce((a, b) => {
          if (a[b.cust_id]) {
            const dateleft = 14 / expdate_left(b.exp_date);
            const rec = allreceipts[b.cust_id];

            a[b.cust_id].total_debt += Number(b.total_debt);

            a[b.cust_id].total_debt =
              Number(a[b.cust_id].total_debt) -
              Number(rec ? rec?.total_payments : 0);

            a[b.cust_id].invoice_count += 1;
            a[b.cust_id].invoice_total += Number(b.invoice_total);

            if (dateleft > 1) {
              a[b.cust_id].expiries[b.exp_date] = {
                cust_id: b.cust_id,
                fullname: b.fullname,
                phone: b.phone,
                tax_id: b.tax_id,
                exp_date: b.exp_date,
                profile: b.profile
              };
            } else {
            }

            delete b.invoice_list;
            delete b.payments;
            a[b.cust_id].invoice_list.push({ ...b });
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

        return {
          ...v,

          //begin receipt
          receipt_count: rec ? rec?.receipt_count : 0,
          payments_received: rec ? rec?.total_payments : 0,
          receipt_list: rec ? rec?.receipts : [],

          //begin invoice
          invoice_count: inv ? inv?.invoice_count : 0,
          invoice_total: inv ? inv?.invoice_total : 0,
          invoice_list: inv ? inv?.invoice_list : [],
          expiries: inv ? inv?.expiries : {},
          aginginvoice:
            inv?.total_debt > 0
              ? {
                  fullname: v.fullname,
                  phone: v.phone,
                  email: v.email,
                  location: v.location,
                  user_id: v.user_id,
                  cust_id: v.cust_id,
                  total: inv ? inv?.invoice_total : 0,
                  payment: rec ? rec?.total_payments : 0,
                  debt: inv ? inv?.total_debt : 0,
                }
              : '',
          total_debt: inv ? inv?.total_debt : 0,

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
