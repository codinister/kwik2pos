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
  <tr>
    <td style="width: 180px;">Sub Total ${currency}</td>
    <td style="width: 60px;">${format_number(subtotal)}</td>
  </tr>
  `;

  //DISCOUNT
  let discounts = '';
  const disc = 100 * discount;
  const discnt = disc / subtotal;

  if (discount > 0) {
    discounts = `
    <tr>   
      <td style="width: 180px;">
      Discount ${currency} (${Math.floor(discnt)}%)
      </td>
      <td style="width: 60px;">
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
  <td style="width: 180px;">NHIL (${nhil_rate}%)</td>
  <td style="width: 60px;">${format_number(nhil)}</td>
  </tr>
  `;
  }

  //COVID
  let covids = '';
  if (covid > 0) {
    covids = `
      <tr>
      <td style="width: 180px;">COVID (${covid_rate}%)</td>
      <td style="width: 60px;">${format_number(covid)}</td>
      </tr>
      `;
  }

  //WITHHOLDING TAX
  let withholdingtaxs = '';
  if (withholdingtax > 0) {
    withholdingtaxs = `
        <tr>
        <td style="width: 180px;">WITHHOLDING TAX (${withholdingtax_rate}%)</td>
        <td style="width: 60px;">${format_number(withholdingtax)}</td>
        </tr>
        `;
  }

  //GETFUNDS
  let getfunds = '';
  if (getfund > 0) {
    getfunds = `
  <tr>
  <td style="width: 180px;">GETFUND (${getfund_rate}%)</td>
  <td style="width: 60px;">${format_number(getfund)}</td>
  </tr>
  `;
  }

  //VAT
  let vats = '';
  if (vat > 0) {
    vats = `
  <tr>
  <td style="width: 180px;">VAT (${vat_rate}%)</td>
  <td style="width: 60px;">${format_number(vat)}</td>
  </tr>
  `;
  }

  let totals = ` 
  <tr>
  <td style="width: 180px;"><strong>TOTAL ${currency}</strong></td>
  <td style="width: 60px;"><strong>${format_number(total)}</strong></td>
  </tr>
  `;

  const thanks = `
  <br /><br />
  <tr>
  <td style="width: 240px; text-align: center;"><strong>Thank you!</strong></td>
  </tr>
  <tr>
  <td style="width: 240px; text-align: center;"><strong>Please come again</strong></td>
  </tr>
  `;

  return `
  <br /><br />
  <table>
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
