import signature from '../../../utils/signature.js';

const Footer = (obj) => {
  const sign = signature({ ...obj });

  const {
    customers: { cust_name },
    settings: {comp_name}
  } = obj;

  return `
    <table style="width: 70rem; font-size: 1.6rem;">
      <tr> 
      <td>Contract sign herein</td>
      </tr>
      <tr> 
      <td  style="width: 30rem;">  
      <h4>${comp_name}</h4>
      ${sign}
      ............................
      </td>
      <td  style="width: 300px; text-align: center;">
        <br />
        <h4>${cust_name}</h4>
        ............................
      </td>
      </tr>
    </table>
  `;
};

export default Footer;
