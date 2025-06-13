import getSignature from '../../../utils/getSignature.js';
import signature from '../../../utils/signature.js';

const Footer = (obj) => {
  const {
    customers: { fullname },
    settings: { comp_name },
    signatures,
  } = obj;

  const sign = getSignature(signatures, fullname);

  return `
  <br /><br />
    <table style="width: 70rem; font-size: 1.6rem;">


      <tr> 
      <td>Contract sign herein</td>
      </tr>

      <tr> 
      <td  style="width: 30rem; text-align: left;">  
      <h5>${comp_name}</h5>
      </td>
      <td  style="width: 300px; text-align: center;  text-align: left;">
        <h5>${fullname}</h5>
      </td>
      </tr>


      <tr> 
      <td  style="width: 30rem; text-align: left;">  
                ${sign}
      ............................
      </td>
      <td  style="width: 300px; text-align: left;">
          ............................
      </td>
      </tr>


    </table>
    <br />    <br />    <br />



          
  `;
};

export default Footer;
