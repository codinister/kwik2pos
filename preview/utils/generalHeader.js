import getLogo from "./getLogo.js";


const generalHeader = ({ ...obj }) => {
  const {

      comp_name,
      comp_logo,
      comp_location,
      comp_email,
      comp_website,
      comp_phone,
      prodType

  } = obj;




  const logo = getLogo(comp_logo);

  return `
    <table cellspacing="0" cellpadding="0">
        <thead>
            <tr>
                <td style="width: 15rem;">
                    ${logo}
                </td>
                <td style="width: 40rem;">
                <h5>${comp_name.toUpperCase()}</h5>
                <table cellspacing="0" cellpadding="0">
                    <tr>
                        <td style="width: 29rem;">
                        ${comp_location}
                        <br />
                        ${comp_email}
                        <br />
                        ${comp_website}
                        <br />
                        Tel: ${comp_phone}
                        <br />
                        </td>
                    </tr>
                </table>
                </td>
                <td style="font-size: 2.4rem; width: 18rem;">
                  
                </td>
            </tr>
            </thead>
        </table>
    `;
};

export default generalHeader;
