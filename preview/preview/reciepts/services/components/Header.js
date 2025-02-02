import getLogo from '../../../../utils/getLogo.js';
import { formatDate } from '../../../../utils/DateFormats.js';

const Header = ({ ...obj }) => {
  const {
    settings: { comp_name, comp_logo, comp_location, comp_phone, comp_email },
    customers: {},
    users: {},
    payment: { rec_date },
    rec_no,
  } = obj;

  const logo = getLogo(comp_logo);

  return `
    <table>
      <tr>
        <td style="width: 8rem;"></td>

        <td style="width: 8rem;">${logo}</td>
        <td style="width: 29rem; text-align: center;">
        <h1 style="font-size: 2.4rem;">${comp_name.toUpperCase()}</h1>
        <strong>Location:</strong>  ${comp_location}
        <br>
        <strong>Contact:</strong> ${comp_phone}
        <br>
        <strong>Email:</strong> ${comp_email}
        <br>
        </td>
        <td style="width: 8rem;"></td>
      </tr>
    </table>


    <div style="font-size: 1.5rem; padding-inline: .8rem; padding-block: .4rem; background-color: #666; color: white; width: max-content;">
    Official Receipt
    </div>
  
    <table>
    <tr>
    <td style="width: 20rem;">Date: ${formatDate(rec_date)}</td>
    <td style="width: 23.5rem;"></td>
    <td style="width: 11rem;">
    <span>No.</span> <strong>${rec_no}</strong>
    </td>
    </tr>
    </table>

  
    `;
};

export default Header;
