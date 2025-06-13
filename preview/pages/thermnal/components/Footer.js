import format_number from '../../../utils/format_number.js';

const Footer = ({ ...obj }) => {
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
     <br />
  <tr>
    <td style="width: 18rem;">
    Sub Total ${currency}</td>
    <td style="width: 6rem;">${format_number(subtotal)}</td>
  </tr>
  `;

  //DISCOUNT
  let discounts = '';
  const disc = 100 * discount;
  const discnt = disc / subtotal;

  if (discount > 0) {
    discounts = `
    <tr>   
      <td style="width: 18rem;">
      Discount ${currency} (${Math.floor(discnt)}%)
      </td>
      <td style="width: 6rem;">
      ${format_number(discount)}
      </td>
    </tr>
    `;
  }

  //NHIS
  let nhils = '';
  if (nhil > 0) {
    nhils = `
  <tr>
  <td style="width: 18rem;">NHIL (${nhil_rate}%)</td>
  <td style="width: 6rem;">${format_number(nhil)}</td>
  </tr>
  `;
  }

  //COVID
  let covids = '';
  if (covid > 0) {
    covids = `
      <tr>
      <td style="width: 18rem;">COVID (${covid_rate}%)</td>
      <td style="width: 6rem;">${format_number(covid)}</td>
      </tr>
      `;
  }

  //WITHHOLDING TAX
  let withholdingtaxs = '';
  if (withholdingtax > 0) {
    withholdingtaxs = `
        <tr>
        <td style="width: 18rem;">WITHHOLDING TAX (${withholdingtax_rate}%)</td>
        <td style="width: 6rem;">${format_number(withholdingtax)}</td>
        </tr>
        `;
  }

  //GETFUNDS
  let getfunds = '';
  if (getfund > 0) {
    getfunds = `
  <tr>
  <td style="width: 18rem;">GETFUND (${getfund_rate}%)</td>
  <td style="width: 6rem;">${format_number(getfund)}</td>
  </tr>
  `;
  }

  //VAT
  let vats = '';
  if (vat > 0) {
    vats = `
  <tr>
  <td style="width: 18rem;">VAT (${vat_rate}%)</td>
  <td style="width: 6rem;">${format_number(vat)}</td>
  </tr>
  `;
  }

  let totals = ` 
  <tr>
  <td style="width: 18rem;"><strong>TOTAL ${currency}</strong></td>
  <td style="width: 6rem;"><strong>${format_number(total)}</strong></td>
  </tr>
  `;

  const thanks = `
  <tr>
    <td colspan="2" style="width: 24rem; text-align: center;">
    <br />
    <strong>Thank you!</strong>
    <br />
    <strong>Please come again</strong>
    </td>
  </tr>
  `;

  return `
  <table style="width: 24rem;" cellspacing="0">
    ${sub_total}
    ${withholdingtaxs}
    ${discounts}
    ${nhils}
    ${getfunds}
    ${covids}
    ${vats}
    ${totals}
    ${thanks}
  </table>
  `;
};

export default Footer;
