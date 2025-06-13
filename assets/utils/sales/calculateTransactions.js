import getSettings from '../getSettings.js';
import { classSelector } from '../Selectors.js';
import calculateGETFUND from './tax/calculateGETFUND.js';
import calculateCovid from './tax/calculateCovid.js';
import calculateNHIL from './tax/calculateNHIL.js';
import calculateSubtotal from './tax/calculateSubtotal.js';
import calculateTotal from './tax/calculateTotal.js';
import calculateVAT from './tax/calculateVAT.js';
import setBalance from './tax/setBalance.js';
import setTotal from './tax/setTotal.js';
import sumTaxes from './tax/sumTaxes.js';
import paymentUtil from '../../components/sales/sales/paymentUtil.js';
import { ymd } from '../DateFormats.js';

const calculateTransactions = (e, callback = (d) => null) => {
  getSettings((data) => {
    const taxObj = JSON.parse(sessionStorage.getItem('sales'));

    if (taxObj) {
      const { name, value } = e.target;

      if (name) {
        if (name === 'payment') {
          taxObj['newpayment'] = value;

          if (!taxObj?.pay_type) {
            taxObj['pay_type'] = 'Cash';
          }

          if (!taxObj?.bank_acc_number) {
            taxObj['bank_acc_number'] = '';
          }

          if (taxObj?.receipt_date.length < 1) {
            const newdate = new Date();
            taxObj['receipt_date'] =  ymd(newdate)
          }


          if (value) {
            if (classSelector('setsalesinvoice')?.checked) {
              classSelector('setsalesinvoice').checked = false;
            }
            taxObj['trans_type'] = 'invoice';
            classSelector('invoicestatus').innerHTML = 'SALES RECEIPT';
          } else {
            taxObj['trans_type'] = 'proforma';
            classSelector('invoicestatus').innerHTML = 'PROFORMA INVOICE';
          }
        } else {
          taxObj[name] = value;
        }
      }

      if (taxObj['withholdingchecked']) {
        const subtotal = Number(taxObj?.sub_total) - Number(taxObj?.discount);
        const calc = (Number(subtotal) * Number(data?.withholdingtax)) / 100;

        taxObj['withholdingtax'] = calc;
        taxObj['withholdingchecked'] = true;
      } else {
        taxObj['withholdingtax'] = 0;
        taxObj['withholdingchecked'] = false;
      }

      if (taxObj['taxchecked']) {
        taxObj['nhil'] = data.nhil;
        taxObj['covid'] = data.covid;
        taxObj['getfund'] = data.getfund;
        taxObj['vat'] = data.vat;
        taxObj['taxchecked'] = true;
      } else {
        taxObj['nhil'] = 0;
        taxObj['getfund'] = 0;
        taxObj['covid'] = 0;
        taxObj['vat'] = 0;
        taxObj['taxchecked'] = false;
      }

      //Save changes to local storage
      sessionStorage.setItem('sales', JSON.stringify(taxObj));
    }

    //Get updated values from local storage
    const v = JSON.parse(sessionStorage.getItem('sales'));

    if (v) {
      const calculatevat = calculateVAT(
        calculateSubtotal(v),
        calculateNHIL(calculateSubtotal(v), v),
        calculateGETFUND(calculateSubtotal(v), v),
        calculateCovid(calculateSubtotal(v), v),
        v
      );

      //SET TOTAL

      v['total'] = calculateTotal(
        sumTaxes(
          calculateSubtotal(v),
          calculateNHIL(calculateSubtotal(v), v),
          calculateGETFUND(calculateSubtotal(v), v),
          calculateCovid(calculateSubtotal(v), v),
          calculatevat
        ),
        v
      );

      //SET sales
      v['nhil'] = calculateNHIL(calculateSubtotal(v), v);
      v['getfund'] = calculateGETFUND(calculateSubtotal(v), v);
      v['covid'] = calculateCovid(calculateSubtotal(v), v);

      v['vat'] = calculatevat;

      sessionStorage.setItem('sales', JSON.stringify(v));

      const val = JSON.parse(sessionStorage.getItem('sales'));

      if(classSelector('total')){
        classSelector('total').value = setTotal(val);
      }


      if(classSelector('balance')){
        classSelector('balance').value = setBalance(val);
      }


      if (classSelector('top_total')) {
        classSelector('top_total').textContent = setTotal(val);
      }

      if (val?.ss_id > 0) {
        setTimeout(() => {
          if (classSelector('receipt-fields-container')) {
            classSelector('receipt-fields-container').innerHTML = paymentUtil();
          }
        }, 5000);
      }

      callback(val);
    }
  });
};

export default calculateTransactions;
