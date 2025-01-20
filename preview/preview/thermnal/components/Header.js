import { formatDate } from '../../../utils/DateFormats.js';

const Header = ({ ...obj }) => {
  const {
    invoice_no,
    customers: { fullname: cust_name },
    settings: { comp_name, comp_phone, comp_location, digitaladdress },
    taxes: { createdAt },
    users: { firstname, lastname },
    payments
  } = obj;


  const cashiername = firstname + ' ' + lastname;

  const pyid = payments[0]?.pay_id 


  return `
  <table>
    <tr>
      <td style="width: 240px; text-align: center;">
      <h1>${comp_name.toUpperCase()}</h1>
      ${comp_location}
      <br />
      ${comp_phone}
      <br />
      ${digitaladdress.length > 0 ? digitaladdress : ''}
      <br />
      <strong style="font-size: 14px;">${pyid > 0 ? 'RECIEPT' : 'ESTIMATE'}</strong>
      </td>
    </tr>
  </table>
  <br />
  
  <table>
    <tr>
      <td style="width: 120px;">
      CASHIER
      </td>
      <td style="width: 120px;">
      ${cashiername}
      </td>
    </tr>
    <tr>
      <td style="width: 120px;">
      DATE
      </td>
      <td style="width: 120px;">
      ${formatDate(createdAt)}
      </td>
    </tr>
    <tr>
      <td style="width: 120px;">
      ESTIMATE #
      </td>
      <td style="width: 120px;">
      ${invoice_no}
      </td>
    </tr>
    <tr>
      <td style="width: 120px;">
      CUSTOMER
      </td>
      <td style="width: 120px;">
      ${cust_name}
      </td>
    </tr>
  </table>


  <table>
    <tr>
      <td style="width: 80px; "><strong>ITEM NAME</strong></td>
      <td style="width: 40px;"><strong>QTY</strong></td>
      <td style="width: 60px;"><strong>PRICE</strong></td>
      <td style="width: 60px;"><strong>TOTAL</strong></td>
    </tr>
  </table>
  `;
};

export default Header;
