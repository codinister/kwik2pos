import format_number from '../../utils/format_number.js';

import amountToWords from '../../utils/ToWords.js';
import signature from '../../utils/signature.js';
import expDate from '../../utils/expDate.js';
import Header from './components/Header.js';

const spagency = ({ ...obj }) => {
  const {
    settings,
    customers: { cust_name },
    users,
    taxes: { createdAt: start_date, total, vat},
    items,
    fullname,
    signatures,
    invoice_no,
    durations,
    contract: { cont_id, title, refferedtoas, contractnumber, otherinfo },
  } = obj;

  const sign = signature({ ...obj });



  const underline = '';



  const exp_date = expDate(durationType, durations, start_date);
  const grandtotalwords = amountToWords(Number(total));

  function days(d) {
    let num = d + 0;

    if (num === 1) {
      return '1st';
    }
    if (num === 2) {
      return '2nd';
    }
    if (num === 3) {
      return '3rd';
    }
    if (num > 3 && num < 21) {
      return num + 'th';
    }

    if (num === 21) {
      return num + '21st';
    }
    if (num === 22) {
      return num + '22nd';
    }
    if (num === 23) {
      return num + '23rd';
    }

    if (num > 23 && num < 31) {
      return num + 'th';
    }

    if (num === 31) {
      return num + '31st';
    }
  }

  function number_to_string(num) {
    switch (num) {
      case 1:
        return 'One';
        break;
      case 2:
        return 'Two';
        break;
      case 3:
        return 'Three';
        break;
      case 4:
        return 'Four';
        break;
      case 5:
        return 'Five';
        break;
      case 6:
        return 'Six';
        break;
      case 7:
        return 'Seven';
        break;
      case 8:
        return 'Eight';
        break;
      case 9:
        return 'Nine';
        break;
      case 10:
        return 'Ten';
        break;
      case 11:
        return 'Elleven';
        break;
      case 12:
        return 'Twelve';
        break;
      case 13:
        return 'Thirteen';
        break;
      case 14:
        return 'Fourteen';
        break;
      case 15:
        return 'Fifteen';
        break;
      case 16:
        return 'Sixteen';
        break;
      case 17:
        return 'Seventeen';
        break;
      case 18:
        return 'Eighteen';
        break;
      case 19:
        return 'Nineteen';
        break;
      case 20:
        return 'Twenty';
        break;
      case 21:
        return 'Twenty One';
        break;
      case 22:
        return 'Twenty Two';
        break;
      case 23:
        return 'Twenty Three';
        break;
      case 24:
        return 'Twenty Four';
        break;
      case 25:
        return 'Twenty Five';
        break;
      case 26:
        return 'Twenty Six';
        break;
      case 27:
        return 'Twenty Seven';
        break;
      case 28:
        return 'Twenty Eight';
        break;
      case 29:
        return 'Twenty Nine';
        break;
      case 30:
        return 'Thirty';
        break;
      default:
        return 0;
    }
  }

  //list of items
  let narration1 = [];

  let agreed_monthly_rate = [];

  let totalperiod = 0;

  items.forEach((v, k) => {
    if (v.duration > 0) {
      totalperiod = v.duration;
    }

    const boards = v.qty > 1 ? 'billboards' : 'billboard';
    
    narration1.push(
      `${number_to_string(Number(v.qty) || '')} (${v.qty || ''}) ${v.prod_size || ''}  ${boards}`
    );


    agreed_monthly_rate.push(
      `GHC ${format_number(v.prod_price)} per month for the ${
        v.psize
      } Billboard`
    );
  });

  const periods = totalperiod > 1 ? 'months' : 'month';
  const period =
    number_to_string(totalperiod) + ' ' + `(${totalperiod})` + ' ' + periods;


  const seperator = narration1.length > 2 ? ',' : 'and';

  
  const formatted = narration1.join(` ${seperator} `);


  const excludingtax = Number(vat) > 0 ? 'including tax' : 'excluding tax';

  const seperation2 = agreed_monthly_rate.length > 2 ? ',' : 'and';
  const agreed_monthly_rate2 = agreed_monthly_rate.join(` ${seperation2} `);



  const contract_title = `
    <div>
    <table>
    <tr>
    <td style="border: solid 1px black; text-align: center;">
    <br />
    <h1>${title}</h1>
    <br />
    </td>
    </tr>
    </table>
    </div>
    <br /><br />
    `;

  const between = `<div><h3 style="text-align: center;">Between</h3></div><div></div>`;

  const company_details = `
    <div style="text-align: center;">
    <h2>${comp_name}</h2>
    <b>Head Office</b><br /><br />
    <b>${comp_location}</b><br /><br />
    <span><i>Tel: ${comp_phone}</i></span>
    <h4>Herein after referred to as </h4>
    <h4>"The ${refferedtoas} </h4>
    </div>
    <br />
    `;

  const and = `
    <div style="text-align: center;"><h3> And</h3></div>
    <br />
    `;

  const customername = `
    <div style="text-align: center;"><h2>${cust_name}</h2></div>
    `;

  const refertoas = `
    <div style="text-align: center;">
    <h4>
    Hereinafter referred to as “The Client”
    </h4>
    </div>
    </div> 
    <br />
    `;

  const contractnum = `
    <div>
    <table cellpadding="20"> 
    <tr>
    <td style="border: solid 1px black; text-align: center; ">

    <h3>CONTRACT #</h3>
    <h3>${contractnumber}</h3>

    </td>
    </tr>
    </table>
    </div><br /><br /><br />
    `;

  const day = new Date(start_date).getDate();
  const year = new Date(start_date).getFullYear();

  const narrationOne = `
    <div>
    <table >
    <tr> 
    <td style="width: 530px; text-align: justify;">

    This contract agreement is made this <b>${day}</b> day of <b>${year}</b> signed and sealed between these parties <b>${comp_name}</b> (hereby called the (${refferedtoas}) and <b>${cust_name}</b> (hereinafter called the “Client”) for the rental of <b>${formatted}</b> at the following locations:
    </td> 
    </tr>
    </table>
    </div> 
    <br />
    <br />
    `;

  //TABLE HEADER
  let table_header = '';
  if (durations.length > 0) {
    table_header = `
        <table>
        <tr>
        <td style="width: 30px; border-right: solid 1px black; border-left: solid 1px black; border-top: solid 1px black;">#
        </td>
        <td style="width: 50px; border-right: solid 1px black; border-top: solid 1px black;">Qty
        </td>
        <td style="width: 150px; border-right: solid 1px black; border-top: solid 1px black;">Description
        </td>
        <td style="width: 70px; border-right: solid 1px black; border-top: solid 1px black;">Size
        </td>
        <td style="width: 80px; border-right: solid 1px black; border-top: solid 1px black;">Duration
        </td>

        <td style="width: 60px; border-right: solid 1px black; border-top: solid 1px black;">Unit Price
        </td>
        <td style="width: 90px; border-right: solid 1px black; border-top: solid 1px black;">Total
        </td>
        </tr>
        </table>
  
        `;
  } else {
    table_header = `
        <table>
        <tr>
        <td style="width: 30px; border-right: solid 1px black; border-left: solid 1px black; border-top: solid 1px black;">#
        </td>
        <td style="width: 60px; border-right: solid 1px black; border-top: solid 1px black;">Qty
        </td>
        <td style="width: 270px; border-right: solid 1px black; border-top: solid 1px black;">Description
        </td>
        <td style="width: 80px; border-right: solid 1px black; border-top: solid 1px black;">Unit Price
        </td>
        <td style="width: 90px; border-right: solid 1px black; border-top: solid 1px black;">Total
        </td>
        </tr>
        </table>

        `;
  }

  let rows = '';
  items.forEach((v, k) => {
    let num = k + 1;

    let rows = '';
    if (v.qty > 0) {
      if (durations.length > 0) {
        let dur = v.duration ? v.duration + `${duration}(s)` : '';

        rows = `
                <tr>
                <td style="width: 30px; border-right: solid 1px black; border-top: solid 1px black;">${num}</td>
                <td style="width: 50px; border-right: solid 1px black;  border-top: solid 1px black;">${
                  v.qty
                }</td>
                <td style="width: 150px; border-right: solid 1px black;  border-top: solid 1px black;">${
                  v.prod_name
                }</td>
                <td style="width: 70px; border-right: solid 1px black;  border-top: solid 1px black;">${
                  v.psize
                }</td>
                <td style="width: 80px; border-right: solid 1px black;  border-top: solid 1px black;">${dur}</td>
                <td style="width: 60px; border-right: solid 1px black;  border-top: solid 1px black;">${
                  v.prod_price
                }</td>
                <td style="width: 90px; border-right: solid 1px black;  border-top: solid 1px black;">${format_number(
                  v.total
                )}</td>
                </tr>
            `;
      } else {
        rows = `
                <tr>
                <td style="width: 30px; border-right: solid 1px black; border-top: solid 1px black;">${num}</td>
                <td style="width: 60px; border-right: solid 1px black;  border-top: solid 1px black;">${
                  v.qty
                }</td>
                <td style="width: 270px; border-right: solid 1px black;  border-top: solid 1px black;">${
                  v.prod_name
                }</td>
                <td style="width: 80px; border-right: solid 1px black;  border-top: solid 1px black;">${
                  v.prod_price
                }</td>
                <td style="width: 90px; border-right: solid 1px black;  border-top: solid 1px black;">${format_number(
                  v.total
                )}</td>
                </tr>
            `;
      }
    }
  });

  let row = `
    <table>
    ${rows}
    </table>

    `;

  const fullpayment = amountToWords(Number(total));

  let narration2 = `
    <br /><br /><br />
    <div>
    <table cellpadding="4"> 
    <tr>
    <td style="text-align: justify; ">

    In pursuance of the said agreement and in consideration of the terms and conditions
    hereinafter provided, it is hereby mutually agreed between <b>'.$comp_name+'</b> and <b>${cust_name}</b>, as follows;

    </td> 
    </tr>
    </table>
    <br /> <br />
    `;

  const narration3 = `
    <table>
    <tr> 
    <td style="text-align: justify;   margin-left: -32px;">
    <ol >

    <li>
    This contract agreement is for a period of ${period} and it’s subject to renewal.
    This takes effect from ${day} day of ${year}
    <br /> 
    </li>


    <li>


    That, the agreed monthly rate to pay is ${agreed_monthly_rate2}.

    That, the client has agreed to pay a full payment of <b>'.${grandtotalwords} (GHC ${format_number(
    total
  )}</b> ${excludingtax}, which is equivalent to ${period} of Rental for all the locations to commence the contract. 

    <br /> 
    </li>

    <li>
    That, the client is supposed to provide an artwork (flexi) for installation or mounting by the
    Agency.
    </li>

    </ol>
    </td>
    </tr>
    </table>
    <br />
    `;

  const otherdetails = `
    <div>
    ${otherinfo}
    </div>

    <div>
    <h3>FLIGHTING / DEFLIGHTING OF FLEXY</h3>
    Where the Client requests for removal or replacement of artwork within the contract period,
    the Client will be made to pay a flighting/installation fee at a mutually agreed cost after providing a new flexy (Artwork).
    </div>

    <div>
    This contract supersedes all prior agreements, written and oral between the two parties with respect to the subject matter of this contract.
    </div>

    <div>
    In the event of this country being at war or civil unrest or at any time through a law, decree or act of government / landlord for the time being in power, the agency is prevented from installing the billboard or is compelled to discontinue the use of the site, the agency shall give notice in writing to the client outlining all factors involved in the breach of the agreement. An alternative solution shall then be decided upon by both parties that would mutually benefit them.
    </div>

    <div style="text-align: center; font-style: italic; font-weight: bold;">
    Should the artwork get damaged by a storm or wind blow, which is not caused as a result
    of the defect of the advertising structure, the Client shall be liable for the reprinting
    of the artwork and supply to the Agency for installation
    </div>

    <div>
    Failure to abide by any of the clauses in this agreement, automatically grants rights to the
    aggrieved party to;

    <ol>
    <li>
    Seek redress through civilized communication with the offending party, or should this
    fail,
    </li>
    <li>
    Seek redress through a written complaint to the offending party and finally
    </li>
    <li>
    Both parties may opt for formal dispute resolution (Arbitration) should the above fail.
    </li>
    </ol>

    <div> 
    In the event of any party deciding to withdraw from this contract, written notice of not less than
    one (1) months must be served. The withdrawing party will be liable for any costs/fees that are
    on account for the termination.
    </div>

    <div>
    The following signatures are in agreement to the terms and conditions outlined in the above hereinafter referred to as CONTRACT.
    </div>

    `;

  let signs = `
    <br /> <br /><br /><br /><br />
    <div>
    <table style="width: 600px;">

    <tr> 
    <td>Contract sign herein</td>
    </tr>


    <tr> 
    <td  style="width: 300px;">  
    <h4>'.$comp_name+'</h4>
    ${sign}
    ............................
    </td>
    <td  style="width: 300px; text-align: center;">
    <br />
    <h4>${cust_name}</h4>


    <div></div>
    ............................


    </td>
    </tr>
    </table>
    </div>
    `;

  return `
    <div class="invwrapper">
  ${Header(settings)}
  
  ${contract_title}
  ${between}
  ${company_details}
  ${and}
  ${customername}
  ${refertoas}
  ${contractnum}
  ${narrationOne}
  ${table_header}
  ${row}
  ${narration2}
  ${narration3}
  ${otherdetails}
  ${signs}
  </div>
    `;
};
export default spagency;
