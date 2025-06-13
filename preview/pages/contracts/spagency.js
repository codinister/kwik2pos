import format_number from '../../utils/format_number.js';
import amountToWords from '../../utils/ToWords.js';
import Footer from './components/Footer.js';
import Header from './components/Header.js';
import { dmy, ymd } from '../../utils/DateFormats.js';

const spagency = ({ ...obj }) => {

  const {
    settings: {
      comp_name,
      comp_phone,
      comp_location,
      duration: durationType,
    },
    customers: { fullname: full_name },
    taxes: { createdAt: start_date, total, vat },
    items,
    durations,
    contract: { title, refferedtoas, contractnumber, otherinfo },
  } = obj;




  const contNumber = (comp_name, full_name, start_date) => {
    const init = full_name
      .split(' ')
      .map((v) => {
        return v.slice(0, 1);
      })
      .join('')
      .toUpperCase();

    return comp_name.toUpperCase() + `/${init}/` + dmy(new Date(start_date));
  };


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

  let agreed_monthly_rate = [];

  let totalperiod = 0;


  items.forEach((v, k) => {
    if (v.duration > 0) {
      totalperiod = v.duration;
    }


    agreed_monthly_rate.push(
      `GHC ${format_number(v.unit_price)} per month for the ${
        v.prod_size
      } Billboard`
    );
  });

  const periods = totalperiod > 1 ? 'months' : 'month';
  const period =
    number_to_string(totalperiod) + ' ' + `(${totalperiod})` + ' ' + periods;


/*
* BEGIN NARATIONAL ONE
*/
  let narration1 = [];

  let sum_qty = 0
  items.forEach((v, k) => {
    sum_qty += Number(v.qty)
    narration1.push(
      `${number_to_string(Number(v.qty) || '')} (${v.qty || ''}) ${
        v.prod_size || ''
      } `
    );
  });

  const boards = sum_qty > 1 ? 'billboards' : 'billboard';

  const seperator = narration1.length === 1 ? '' : narration1.length > 2 ? ',' : 'and';
  const formatted = narration1.join(` ${seperator} `)+' '+boards;
/*
* END NARATIONAL ONE
*/


  const excludingtax = Number(vat) > 0 ? 'including tax' : 'excluding tax';


  const seperation2 = agreed_monthly_rate.length === 1 ?  '' : agreed_monthly_rate.length > 2 ? ',' : 'and';
  const agreed_monthly_rate2 = agreed_monthly_rate.join(` ${seperation2} `);



  const day = new Date(start_date).getDate();
  const year = new Date(start_date).getFullYear();

  //TABLE HEADER
  let table_header = '';
  if (durations > 0) {
    table_header = `
        <table  style="width: 70rem; font-size: 1.2rem; background-color: #444; color: white;">
          <thead>
          <tr>
          <td style="padding: 1rem; width: 3rem;">#
          </td>
          <td style="padding: 1rem; width: 5rem;">Qty
          </td>
          <td style="padding: 1rem; width: 15rem;">Description
          </td>
          <td style="padding: 1rem; width: 7rem;">Size
          </td>
          <td style="padding: 1rem; width: 8rem;">Duration
          </td>

          <td style="padding: 1rem; width: 6rem;">Unit Price
          </td>
          <td style="padding: 1rem; width: 9rem;">Total
          </td>
          </tr>
          </tbody>
        </table>

        `;
  } else {
    table_header = `
      <table   style="width: 70rem; font-size: 1.2rem; background-color: #444; color: white;">
      <tbody>
        <tr>
        <td style="padding: 1rem; width: 3rem;">#
        </td>
        <td style="padding: 1rem; width: 6rem;">Qty
        </td>
        <td style="padding: 1rem; width: 27rem;">Description
        </td>
        <td style="padding: 1rem; width: 8rem;">Unit Price
        </td>
        <td style="padding: 1rem; width: 9rem;">Total
        </td>
        </tr>
        </tbody>
        </table>

        `;
  }


  let rows = '';
  let num = 1
  items.forEach((v, k) => {
    

    if (v.qty > 0) {
      if (durations > 0) {
        let dur = v.duration ? v.duration + `${durationType}(s)` : '';

        rows += `
                <tr>
                <td style="padding: 1rem; width: 3rem; border-right: solid 0.1rem black; border-left: solid 0.1rem black; border-bottom: solid 0.1rem black;">${num++}</td>
                <td style="padding: 1rem; width: 5rem; border-right: solid 0.1rem black; border-bottom: solid 0.1rem black; ">${
                  v.qty
                }</td>
                <td style="padding: 1rem; width: 15rem; border-right: solid 0.1rem black; border-bottom: solid 0.1rem black; ">${
                  v.prod_name
                }</td>
                <td style="padding: 1rem; width: 7rem; border-right: solid 0.1rem black; border-bottom: solid 0.1rem black; ">${
                  v.prod_size
                }</td>
                <td style="padding: 1rem; width: 8rem; border-right: solid 0.1rem black; border-bottom: solid 0.1rem black; ">${dur}</td>
                <td style="padding: 1rem; width: 6rem; border-right: solid 0.1rem black; border-bottom: solid 0.1rem black; ">${
                  v.unit_price
                }</td>
                <td style="padding: 1rem; width: 9rem; border-right: solid 0.1rem black; border-bottom: solid 0.1rem black; ">${format_number(
                  v.total
                )}</td>
                </tr>
            `;
      } else {
        rows += `
                <tr>
                <td style="padding: 1rem; width: 3rem; border-right: solid 0.1rem black; border-left: solid 0.1rem black; border-left: solid 0.1rem black; border-bottom: solid 0.1rem black;">${num++}</td>
                <td style="padding: 1rem; width: 6rem; border-right: solid 0.1rem black; border-bottom: solid 0.1rem black; ">${
                  v.qty
                }</td>
                <td style="padding: 1rem; width: 27rem; border-right: solid 0.1rem black; border-bottom: solid 0.1rem black; ">${
                  v.prod_name
                }</td>
                <td style="padding: 1rem; width: 8rem; border-right: solid 0.1rem black; border-bottom: solid 0.1rem black; ">${
                  v.unit_price
                }</td>
                <td style="padding: 1rem; width: 9rem; border-right: solid 0.1rem black; border-bottom: solid 0.1rem black;  ">${format_number(
                  v.total
                )}</td>
                </tr>
            `;
      }
    }
  });


  let row = `
    ${table_header}
    <table style="width: 70rem; font-size: 1.2rem;">
    <tbody>
    ${rows}
    </tbody>
    </table>
    <br /> <br /><br />
  `;


  return `
    <div class="invwrapper">
      ${Header(obj)}
      
      <table style="width: 70rem; font-size: 1.6rem;">
        <tbody>
          <tr>
            <td style="border: solid 0.1rem black; text-align: center;">
            <br />
            <h3>${title || 'OUT OF HOME ADVERTISING CONTRACT'}</h3>
            <br />
            </td>
          </tr>
          <tr>
            <td>
            <h4 style="text-align: center; margin-block: 8rem;">Between</h4>
            </td>
          </tr>
          <tr>
            <td>
              <div style="text-align: center; line-height: 2.4rem;">
              <h4>${comp_name}</h4>
              <strong>Head Office</strong>
              <br />
              <strong>${comp_location}</strong>
              <br />
              <span><i>Tel: ${comp_phone}</i></span>
              <h5>Herein after referred to as </h5>
              <h5>"The ${refferedtoas || 'Ageency'}" </h5>
              </div>
         
              <h5 style="text-align: center; margin-block: 8rem;"> And</h5>
    
              <div style="text-align: center;">
              <h4>${full_name}</h4>
              </div>
   
              <h5 style="text-align: center; margin-block: 8rem;">
              Hereinafter referred to as “The Client”
              </h5>
  
              </div> 
              <br />
            </td>
          </tr>
     


          <tr>
            <td style="border: solid 0.1rem black; padding-block: 2.4rem; text-align: center; ">
              <h4>CONTRACT #</h4>
              <h5>${
                contractnumber || contNumber(comp_name, full_name, start_date)
              }</h5>
            </td>
          </tr>
   
          <tr> 
          <td style="padding-block: 8rem; width: 53rem; text-align: justify;">
          This contract agreement is made this <b>${days(
            day
          )}</b> day of <b>${year}</b> signed and sealed between these parties <b>${comp_name}</b> (hereby called the (${
    refferedtoas || 'Agency'
  }) and <b>${full_name}</b> (hereinafter called the “Client”) for the rental of <b>${formatted}</b> at the following locations:
          </td> 
          </tr>
    

    
      <br /><br />
      <tr>
      <td>
      ${row}
      </td>
      </tr>
      <br /><br />


     
          <tr>
            <td style="text-align: justify; ">
            In pursuance of the said agreement and in consideration of the terms and conditions
            hereinafter provided, it is hereby mutually agreed between <b>${comp_name}</b> and <b>${full_name}</b>, as follows;
            </td> 
          </tr>
     

      
          <tr> 
            <td>
          <ol style="padding-left: 2rem;">

          <li>
          This contract agreement is for a period of ${period} and it’s subject to renewal.
          This takes effect from ${days(day)} day of ${year}
          <br /> 
          </li>
          <li>
          That, the agreed monthly rate to pay is ${agreed_monthly_rate2}.

          That, the client has agreed to pay a full payment of <b>${grandtotalwords} (GHC ${format_number(
    total
  )}</b> 
          ${excludingtax}, which is equivalent to ${period} of Rental for all the locations to commence the contract. 

          <br /> 
          </li>

          <li>
          That, the client is supposed to provide an artwork (flexi) for installation or mounting by the
          Agency.
          </li>

          </ol>
          </td>
          </tr>
      
          <tr>
            <td>
              <div>
              ${otherinfo || ''}
              </div>

              <div style="margin-top: 8rem;">
              <h5>FLIGHTING / DEFLIGHTING OF FLEXY</h5>
              <br />
              <p>
              Where the Client requests for removal or replacement of artwork within the contract period,
              the Client will be made to pay a flighting/installation fee at a mutually agreed cost after providing a new flexy (Artwork).
              </p>
              </div>
     <br />
              <div>
              This contract supersedes all prior agreements, written and oral between the two parties with respect to the subject matter of this contract.
              </div>
     <br />
              <div>
              <p>
              In the event of this country being at war or civil unrest or at any time through a law, decree or act of government / landlord for the time being in power, the agency is prevented from installing the billboard or is compelled to discontinue the use of the site, the agency shall give notice in writing to the client outlining all factors involved in the breach of the agreement. An alternative solution shall then be decided upon by both parties that would mutually benefit them.
              </p>
              </div>
     <br />
              <div style="text-align: center; font-style: italic; font-weight: bold;">
              Should the artwork get damaged by a storm or wind blow, which is not caused as a result
              of the defect of the advertising structure, the Client shall be liable for the reprinting
              of the artwork and supply to the Agency for installation
              </div>
     <br />
              <div>
              Failure to abide by any of the clauses in this agreement, automatically grants rights to the
              aggrieved party to;

              <ol style="padding-left: 1.6rem;">
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
     <br />
              <div> 
              In the event of any party deciding to withdraw from this contract, written notice of not less than
              one (1) months must be served. The withdrawing party will be liable for any costs/fees that are
              on account for the termination.
              </div>

              <div>
              The following signatures are in agreement to the terms and conditions outlined in the above hereinafter referred to as CONTRACT.
              </div>
            </td>
          </tr>
        </tbody>
      </table>



      <br />
      ${Footer(obj)}
      </div>
    `;
};
export default spagency;
