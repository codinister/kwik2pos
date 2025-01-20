import getSignature from '../../../../utils/getSignature.js';

const Footer = ({ ...obj }) => {
  const {
    users: { signature, firstname, lastname },
  } = obj;

  const fullname = firstname + ' ' + lastname;

  const signatures = getSignature(signature, fullname);

  return `
    <table style="text-align: center;">
        <tr>

            <td style="width: 18rem;">
            <br />    <br />
            ${fullname}
            <div style="border-top: solid 1px black;">Received by</div>
            </td>

            <td style="width: 18rem;"></td>

            <td style="width: 18rem;  text-align: center;">
            ${signatures}
            <span>Authorised signature</span>
            </td>

        </tr>
    </table>
    `;
};

export default Footer;
