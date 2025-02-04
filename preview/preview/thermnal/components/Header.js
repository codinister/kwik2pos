import { formatDate } from '../../../utils/DateFormats.js';

const Header = ({ ...obj }) => {


  console.log(obj)

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
      <td style="width: 24rem; text-align: center;">
      <h5>${comp_name.toUpperCase()}</h5>
      ${comp_location}
      <br />
      ${comp_phone}
      <br />
      ${digitaladdress.length > 0 ? digitaladdress : ''}
      <br />
      <strong style="font-size: 1.4rem;">
      ${pyid > 0 ? 'RECIEPT' : 'ESTIMATE'}
      </strong>
      </td>
    </tr>
  </table>
  <br />
  
  <table>
    <tr>
      <td style="width: 12rem;">
      CASHIER
      </td>
      <td style="width: 12rem;">
      ${cashiername}
      </td>
    </tr>
    <tr>
      <td style="width: 12rem;">
      DATE
      </td>
      <td style="width: 12rem;">
      ${formatDate(createdAt)}
      </td>
    </tr>
    <tr>
      <td style="width: 12rem;">
      ESTIMATE #
      </td>
      <td style="width: 12rem;">
      ${invoice_no}
      </td>
    </tr>
    <tr>
      <td style="width: 12rem;">
      CUSTOMER
      </td>
      <td style="width: 12rem;">
      ${cust_name}
      </td>
    </tr>
  </table>
<br />

  <table>
    <tr>
      <td style="width: 8rem; "><strong>ITEM NAME</strong></td>
      <td style="width: 4rem; text-align: center;"><strong>QTY</strong></td>
      <td style="width: 6rem;"><strong>PRICE</strong></td>
      <td style="width: 6rem;"><strong>TOTAL</strong></td>
    </tr>
  </table>
  `;
};

export default Header;
