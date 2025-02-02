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
    
            <td style="padding: .8rem; width: 3rem; border-bottom: solid 0.1rem #444; border-right: solid 0.1rem #444; border-left: solid 0.1rem #444;">
            ${num}
            </td>
    
            <td style="padding: .8rem; width: 14.5rem; border-bottom: solid 0.1rem #444; border-right: solid 0.1rem #444;">
            ${V.fullname}
            </td>
    
            <td style="padding: .8rem; width: 12rem; border-bottom: solid 0.1rem #444; border-right: solid 0.1rem #444;">
            ${V.phone}
            </td>
    
            <td style="padding: .8rem; width: 12rem; border-bottom: solid 0.1rem #444; border-right: solid 0.1rem #444;">
            ${V.email}
            </td>
    
            
            <td style="padding: .8rem; width: 12rem; border-bottom: solid 0.1rem #444; border-right: solid 0.1rem #444;">
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
            <td style="width: 3rem; padding: .8rem; ">#</td>
            <td style="width: 14.5rem; padding: .8rem; ">Fullname</td>
            <td style="width: 12rem; padding: .8rem; ">Phone</td>
            <td style="width: 12rem; padding: .8rem; ">Email</td>
            <td style="width: 12rem; padding: .8rem; ">Location</td>
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
