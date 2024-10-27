
import format_number from './format_number.js';


const transactions = ({ ...obj }) => {
  const {
    bank,
    settings: { currency },
    taxes: {
      subtotal,
      discount,
      nhil,
      withholdingtax,
      getfund,
      vat,
      covid,
      total,
      nhil_rate,
      withholdingtax_rate,
      getfund_rate,
      vat_rate,
      covid_rate,
    },
  } = obj;

  //Sub Total
  const sub_total = `
  <tr>
  <td style="width: 31.5rem;   text-align: right; padding: 1rem;">SUB TOTAL ${currency}</td>
  <td style="width: 8.5rem; padding: 0.5rem; ">${format_number(subtotal)}</td>
  </tr>
  `;

  //DISCOUNT
  let discounts = '';
  const disc = 100 * discount;
  const discnt = disc / subtotal;
  if (discount > 0) {
    discounts = `
  <tr>   
  <td style="width: 20rem;;  text-align: right; padding: 0.5rem;;">Discount  (${Math.floor(discnt)}%)</td>
  <td style="width: 8.5rem; padding: 0.5rem; ">${format_number(discount)}</td>
  </tr>
  `;
  }

  //NHIL
  let nhils = '';
  if (nhil > 0) {
    nhils = `
  <tr>
  <td style="width: 31.5rem;   text-align: right; padding: 1rem;">NHIL (${nhil_rate}%)</td>
  <td style="width: 8.5rem; padding: 0.5rem; ">${format_number(nhil)}</td>
  </tr>
  `;
  }

  //COVID
  let covids = '';

  if (covid > 0) {
    covids = `
  <tr>
  <td style="width: 31.5rem;   text-align: right; padding: 1rem;">COVID (${covid_rate}%)</td>
  <td style="width: 8.5rem; padding: 0.5rem; ">${format_number(covid)}</td>
  </tr>
  `;
  }

  //WITHHOLDING TAX
  let withholdingtaxs = '';
  if (withholdingtax > 0) {
    withholdingtaxs = `
  <tr>
  <td style="width: 31.5rem;   text-align: right; padding: 1rem;">WITHHOLDING TAX (${withholdingtax_rate}%)</td>
  <td style="width: 8.5rem; padding: 0.5rem; ">${format_number(withholdingtax)}</td>
  </tr>
  `;
  }

  //GETFUNDS
  let getfunds = '';
  if (nhil > 0) {
    getfunds = `
  <tr>
  <td style="width: 31.5rem;   text-align: right; padding: 1rem;">GETFUND (${getfund_rate}%)</td>
  <td style="width: 8.5rem; padding: 0.5rem; ">${format_number(getfund)}</td>
  </tr>
  `;
  }

  //VAT
  let vats = '';
  if (vat > 0) {
    vats = `
  <tr>
  <td style="width: 31.5rem;   text-align: right; padding: 1rem;">VAT (${vat_rate}%)</td>
  <td style="width: 8.5rem; padding: 0.5rem; ">${format_number(vat)}</td>
  </tr>
  `;
  }

  //TRANSPORTATION

  let totals = `
  <tr>
  <td style="width: 31.5rem;   text-align: right; padding: 1rem;">TOTAL ${currency}</td>
  <td style="width: 8.5rem; padding: 0.5rem; ">${format_number(total)}</td>
  </tr>
  `;

  return  `
  <table   cellspacing="0" cellpadding="0" >
    <tbody>
      <tr>

      <td style="width: 30rem; padding: 0.5rem;">
        <table   cellspacing="0" cellpadding="0">
        <tr>
        <td>
        ${bank}
        </td>
        </tr>
        </table>
      </td>
      
      <td>
        <table cellspacing="0" cellpadding="0">
          <tbody>
            ${sub_total}
            ${withholdingtaxs}
            ${discounts}
            ${nhils}
            ${getfunds}
            ${covids}
            ${vats}
            ${totals}
          </tbody>
        </table>
      </td>
      
      </tr>
    </tbody>
  </table>
  `;
};

export default transactions;
