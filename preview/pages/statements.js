import apiBaseUrl from '../utils/apiBaseUrl.js';
const url = new URLSearchParams(window.location.search);
import statementData from './data/statementData.js';
import inv_num from '../utils/inv_num.js';
import { formatDate } from '../utils/DateFormats.js';

//ID
const code = url.get('cde');
const cust_id = atob(url.get('cusd'));

//URL
const settingsUrl = `settings&code=${code}`;
const customrstatementtUrl = `customr_statement&cust_id=${cust_id}`;

Promise.allSettled([
  fetch(apiBaseUrl(settingsUrl)).then((data) => data.json()),
  fetch(apiBaseUrl(customrstatementtUrl)).then((data) => data.json()),
]).then((data) => {
  const settings = data[0].value[0];
  const custstatent = data[1].value;

  const arr = Object.values(
    [...custstatent].reduce((a, b) => {
      if (a[b.tax_id]) {
        a[b.tax_id].receipts.push({
          pay_type: b.pay_type,
          payment: b.payment,
          receipt_no: inv_num(settings?.comp_name, b.pay_id),
          rec_date: formatDate(b.rec_date),
          invoice_no: inv_num(settings?.comp_name, b.tax_id),
          profile: b.profile,
        });
      } else {
        a[b.tax_id] = {
          ...b,
          receipts: [
            {
              pay_type: b.pay_type,
              payment: b.payment,
              receipt_no: inv_num(settings?.comp_name, b.pay_id),
              rec_date: formatDate(b.rec_date),
              invoice_no: inv_num(settings?.comp_name, b.tax_id),
              profile: b.profile,
            },
          ],
        };
      }

      return a;
    }, {})
  );

  const receipts = [...arr]
    .map((v) => {
      return v.receipts;
    })
    .flat(2)
    .filter((v) => v.payment !== null);

  const invoices = Object.values(
    [...custstatent]
      .map((v) => {
        return {
          tax_id: v.tax_id,
          total: v.total,
          profile: v.profile,
          createdAt: formatDate(v.createdAt),
          invoice_no: inv_num(settings?.comp_name, v.tax_id),
        };
      })
      .filter((v) => v.tax_id !== null)
      .reduce((a, b) => {
        if (a[b.tax_id]) {
          a[b.tax_id] = b;
        } else {
          a[b.tax_id] = b;
        }
        return a;
      }, {})
  );

  const total_receipts = [...receipts].reduce((a, b) => {
    return Number(a) + Number(b.payment);
  }, 0);
  const total_invoices = [...invoices].reduce((a, b) => {
    return Number(a) + Number(b.total);
  }, 0);
  const balance = Number(total_invoices) - Number(total_receipts);

  const fullname = [...custstatent][0].fullname
  




  const obj = {
    settings,
    invoices,
    receipts,
    total_receipts,
    total_invoices,
    balance,
    fullname
  };

  statementData(obj);
});

// http://localhost/kwikpos/preview/statements.html?cusd=368&cde=3n1krE1L37zTK4T9b1sII5iDc07Y4o2ZMzDFaW5WJkM6/Tw3bhLdzcZnxrznxAzBiA==
