import getLogo from '../../utils/getLogo.js';

const Header = (obj) => {
  const {
    settings: { comp_name, comp_logo, comp_email, comp_location, comp_website },
  } = obj;

  const logo = getLogo(comp_logo);

  return `<table  cellspacing="0" cellpadding="0" style="width: 70rem; font-size: 1.6rem;">
    <thead>
        <tr>
            <td style="width: 10rem;">
            ${logo}
            </td>
            <td style="width: 50rem;">
            <h5>${comp_name.toUpperCase()}</h5>
            <span>${comp_location}</span>
            <br />
            <span>${comp_email}</span>
            <br />
            <span>${comp_website}</span>

            </td>
        </tr>
        </thead>
    </table>`;
};

export default Header;
