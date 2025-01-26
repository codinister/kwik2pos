import Header from './Header.js';

const contacts = ({ ...obj }) => {
  const { customers } = obj;

  //TABLE BODY
  let rows = '';
  let num = 0;
  customers.forEach((V, K) => {
    num++;

    rows += `
            <tr>
    
            <td style="padding: .8rem; width: 30px; border-bottom: solid 1px #444; border-right: solid 1px #444; border-left: solid 1px #444;">
            ${num}
            </td>
    
            <td style="padding: .8rem; width: 145px; border-bottom: solid 1px #444; border-right: solid 1px #444;">
            ${V.fullname}
            </td>
    
            <td style="padding: .8rem; width: 120px; border-bottom: solid 1px #444; border-right: solid 1px #444;">
            ${V.phone}
            </td>
    
            <td style="padding: .8rem; width: 120px; border-bottom: solid 1px #444; border-right: solid 1px #444;">
            ${V.email}
            </td>
    
            
            <td style="padding: .8rem; width: 120px; border-bottom: solid 1px #444; border-right: solid 1px #444;">
            ${V.location}
            </td>
    
            </tr>
        `;
  });

  return `
    <div class="invwrapper">
    ${Header(obj)}

    <table style="widht: 70rem;">
    <tbody>
        <tr>
        <td>
        <table style="margin-block: 5rem;">
        <tbody>

        <tr>
        <td>
        <h2>CUSTOMER REPORT</h2>
        </td> 
        <td style="width: 30rem;"></td>
        <td>
        <h2> TOTAL: ${customers.length}</h2>
        </td>
        </tr>

        </tbody>
        </table>
        <table style="width: 70rem;" cellpadding="0" cellspacing="0">
        <thead style="background-color: #444; color: white;">
         <tr>
            <td style="width: 30px; padding: .8rem; ">#</td>
            <td style="width: 145px; padding: .8rem; ">Fullname</td>
            <td style="width: 120px; padding: .8rem; ">Phone</td>
            <td style="width: 120px; padding: .8rem; ">Email</td>
            <td style="width: 120px; padding: .8rem; ">Location</td>
         </tr>
        </thead>
    
        <tbody>
        ${rows}
        </tbody>
        </table>
        </td>
        </tr>

        </tbody>
        </table>

        </div>
        <br /><br />
    
    `;
};

export default contacts;
