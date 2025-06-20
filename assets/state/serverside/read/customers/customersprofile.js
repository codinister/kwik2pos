import accessControl from '../../../../utils/accessControl.js';
import inv_num from '../../../../utils/inv_num.js';
import fetchApiUrl from '../../../../utils/fetchApiUrl.js';
import urlCode from '../../../../utils/urlCode.js';
import expDate from '../../../../utils/expDate.js';
import actualExpDaysLeft from '../../../../utils/actualExpDaysLeft.js';

const customersprofile = (callback) => {
  Promise.allSettled([
    fetch(fetchApiUrl('customersprofile', 'getCustomers') + urlCode()).then(
      (resp) => resp.json()
    ),
    fetch(fetchApiUrl('customersprofile', 'getInvoices') + urlCode()).then(
      (resp) => resp.json()
    ),
    fetch(fetchApiUrl('customersprofile', 'getProformas') + urlCode()).then(
      (resp) => resp.json()
    ),
    fetch(fetchApiUrl('customersprofile', 'getReceipts') + urlCode()).then(
      (resp) => resp.json()
    ),
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

      //Payments made by a specific customer
      const allreceipts = Object.values(value[3].value)
        .map((v) => ({
          ...v,
          payment: Number(v.payment),
          receipts: [
            {
              bank_acc_number: v.bank_acc_number,
              code: v.code,
              createdAt: v.createdAt,
              cust_id: v.cust_id,
              pay_id: v.pay_id,
              pay_type: v.pay_type,
              payment: v.payment,
              profile: v.profile,
              receipt_no: inv_num(v.pay_id),
              ss_id: v.ss_id,
              total: v.total,
              user_id: v.user_id,
            },
          ],
          receipt_count: 1,
          total_payments: Number(v.payment) || 0,
        }))
        .reduce((a, b) => {
          if (a[b.cust_id]) {
            a[b.cust_id].receipts.push({
              bank_acc_number: b.bank_acc_number,
              code: b.code,
              createdAt: b.createdAt,
              cust_id: b.cust_id,
              pay_id: b.pay_id,
              pay_type: b.pay_type,
              payment: b.payment,
              profile: b.profile,
              receipt_no: inv_num(b.pay_id),
              ss_id: b.ss_id,
              total: b.total,
              user_id: b.user_id,
            });
            a[b.cust_id].receipt_count += 1;
            a[b.cust_id].total_payments += Number(b.payment);
          } else {
            a[b.cust_id] = b;
          }
          return a;
        }, {});

      //Payments made on a specific invoice
      const paymentsOnInvoice = Object.values(value[3].value)
        .map((v) => ({
          ss_id: v.ss_id,
          payment: Number(v.payment),
          total_payments: Number(v.payment) || 0,
        }))
        .reduce((a, b) => {
          if (a[b.ss_id]) {
            a[b.ss_id].total_payments += Number(b.payment);
          } else {
            a[b.ss_id] = b;
          }
          return a;
        }, {});

      /*
       * ALL INVOICES
       */
      const allinvoices = Object.values(value[1].value)
        .map((v) => {
          const customer = allcustomers[v.cust_id];
          const rec = paymentsOnInvoice[v.ss_id];

          return {
            ...v,

            fullname: customer ? customer?.fullname : '',
            phone: customer ? customer?.phone : '',
            invoice_total: Number(v.total),
            invoice_count: 1,
            invoice_list: [
              {
                [v.ss_id]: {
                  addbank: v.addbank,
                  balance: Math.floor(
                    Number(v.total) - Number(rec?.total_payments || 0)
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
                  payments: Number(rec?.total_payments || 0),
                  prepared_by: v.prepared_by,
                  profile: v.profile,
                  paymentPercentage:
                    Math.floor(
                      (100 * Number(rec?.total_payments || 0)) / Number(v.total)
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
            ],
            balance: Number(v.total) - Number(rec?.total_payments || 0),
            paymentPercentage:
              Math.floor(
                (100 * Number(rec?.total_payments || 0)) / Number(v.total)
              ) || 0,

            payments: Number(rec?.total_payments || 0),
            profile: v.profile,

            expiries:
              actualExpDaysLeft(v.duration, v.createdAt) > 0
                ? [
                    {
                      [expDate(v.duration, v.createdAt)]: {
                        cust_id: v.cust_id,
                        fullname: customer ? customer?.fullname : '',
                        phone: customer ? customer?.phone : '',
                        ss_id: v.ss_id,
                        exp_date: expDate(v.duration, v.createdAt),
                        profile: v.profile,
                      },
                    },
                  ]
                : [],
          };
        })
        .reduce((a, b) => {
          if (a[b.cust_id]) {
            a[b.cust_id].invoice_count += 1;
            a[b.cust_id].invoice_total += Number(b.invoice_total);
            a[b.cust_id].payments += Number(b.payments);
            a[b.cust_id].balance += Number(b.balance);

            a[b.cust_id].invoice_list.push({
              [b.ss_id]: {
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
              },
            });

            if (actualExpDaysLeft(b.duration, b.createdAt) > 0) {
              a[b.cust_id].expiries.push({
                [expDate(b.duration, b.createdAt)]: {
                  cust_id: b.cust_id,
                  fullname: b.fullname,
                  phone: b.phone,
                  ss_id: b.ss_id,
                  exp_date: expDate(b.duration, b.createdAt),
                  profile: b.profile,
                },
              });
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
                addbank: v.addbank,
                code: v.code,
                covid: v.covid,
                covid_rate: v.covid_rate,
                createdAt: v.createdAt,
                cust_id: v.cust_id,
                discount: v.discount,
                end_date: v.end_date,
                getfund: v.getfund,
                getfund_rate: v.getfund_rate,
                installation: v.installation,
                location: v.location,
                nhil: v.nhil,
                nhil_rate: v.nhil_rate,
                note: v.note,
                prepared_by: v.prepared_by,
                profile: v.profile,
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
            ],
          };
        })
        .reduce((a, b) => {
          if (a[b.cust_id]) {
            (a[b.cust_id].proforma_count += 1),
              (a[b.cust_id].proforma_total += Number(b.proforma_total));
            a[b.cust_id].proforma_list.push({
              addbank: b.addbank,
              code: b.code,
              covid: b.covid,
              covid_rate: b.covid_rate,
              createdAt: b.createdAt,
              cust_id: b.cust_id,
              discount: b.discount,
              end_date: b.end_date,
              getfund: b.getfund,
              getfund_rate: b.getfund_rate,
              installation: b.installation,
              location: b.location,
              nhil: b.nhil,
              nhil_rate: b.nhil_rate,
              note: b.note,
              prepared_by: b.prepared_by,
              profile: b.profile,
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
            });
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

        const total_sales = invoice_list_data
          .map((v) => Object.values(v))
          .flat(2)
          .reduce((a, b) => {
            return Number(a) + Number(b.total);
          }, 0);

        const total_transactions = Math.floor(total_sales);

        const total_payment = Number(rec?.total_payments || 0);

        const total_debt =
          Number(total_transactions || 0) - Number(total_payment || 0);

        return {
          ...v,

          //begin receipt
          receipt_count: Number(rec?.receipt_count || 0),
          payments_received: total_payment,
          receipt_list: rec
            ? [...rec?.receipts].map((vl) => {
                return { ...vl, fullname: v.fullname, phone: v.phone };
              })
            : [],

          //begin invoice
          invoice_count: Number(inv?.invoice_count || 0),
          invoice_total: Number(inv?.invoice_total || 0),
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

          total_sales: Math.floor(total_sales),
          total_debt,

          //begin proforma
          proforma_count: Number(prof?.proforma_count || 0),
          proforma_total: Number(prof?.proforma_total || 0),
          proforma_list: prof ? prof?.proforma_list : [],
        };
      });


      callback(custprofile);
    })
    .catch((err) => console.log(err));
};

export default customersprofile;
