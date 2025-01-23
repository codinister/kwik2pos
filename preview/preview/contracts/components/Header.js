import getLogo from '../../../utils/getLogo.js';



const Header = (settings) => {

  const { comp_name,comp_logo, comp_email, comp_location, comp_website } = settings;

  const logo = getLogo(comp_logo);


  return `<table  cellspacing="0" cellpadding="0">
    <thead>
        <tr>
            <td style="width: 15rem;">
            ${logo}
            </td>
            <td style="width: 50rem;">
            <h2>${comp_name.toUpperCase()}</h2>
            <table cellspacing="0" cellpadding="0">
                <tr>
                    <td style="width: 29rem;">
                    <span>${comp_location}</span>
                    <br />
                    <span>&nbsp;&nbsp;${comp_email}</span>
                    <br />
                    <span>&nbsp;&nbsp;${comp_website}</span>
                    <br />
                    <br />
        
                    </td>
                    <td style="text-align: right;">
                    <br /> <br /><br />
                    </td>
                    
                </tr>
            </table>
            </td>
        </tr>
        </thead>
    </table>`;
};

export default Header;
