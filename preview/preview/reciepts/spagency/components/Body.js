import format_number from '../../../../utils/format_number.js';

const Body = ({ ...obj }) => {
  const {
    settings: { currency },
    customers: { fullname },
    payment: { payment, profile },
    balance,
    pay_type,
    change,
    amntinwords,
  } = obj;

  let payment_purpose = '';

  if (balance > 0) {
    payment_purpose = 'PART PAYMENT FOR ' + profile;
  } else {
    payment_purpose = 'FULL PAYMENT FOR ' + profile;
  }

  let balance_text = '';
  let balance_amount = '';

  if (balance < 0) {
    balance_text = 'Change:';
    balance_amount = change;
  } else if (balance > 0) {
    balance_text = 'Balance due:';
    balance_amount = balance;
  } else {
    balance_text = false;
  }

  let balanceoutput = '';
  if (balance_text.length > 0) {
    balanceoutput = `
        <table style=" margin-bottom: .4rem;">
        <tr>
        <td style="width: 10rem;">${balance_text}</td>
        <td style="width: 43rem; border-bottom: solid 1px black;">
        ${currency} ${format_number(balance_amount)}
        </td>
        </tr>
        </table>
        `;
  }

  //RECIEVED FROM
  return `
    <br />
    <table style=" margin-bottom: .4rem;">
    <tr>
    <td style="width: 10rem;">Received From: </td>
    <td style="width: 43rem;border-bottom: solid 1px black;">
    ${fullname}
    </td>
    </tr>
    </table>

    <table style=" margin-bottom: .4rem;">
    <tr>
    <td style="width: 10rem;">The Sum Of ${currency}: </td>
    <td style="width: 43rem;border-bottom: solid 1px black;">
    ${format_number(payment)}
    </td>
    </tr>
    </table>


    <table style=" margin-bottom: .4rem;">
    <tr>
    <td style="width: 10rem;">Amount in words </td>
    <td style="width: 43rem;border-bottom: solid 1px black;">
    ${amntinwords}
    </td>
    </tr>
    </table>
    
    <table style=" margin-bottom: .4rem;">
    <tr>
    <td style="width: 4.5rem;">Being: </td>
    <td style="width: 48.5rem;border-bottom: solid 1px black;">
    ${payment_purpose}
    </td>
    </tr>
    </table>

    

    <table style=" margin-bottom: .4rem;">
    <tr>
    <td style="width: 10rem">Payment Type: </td>
    <td style="width: 43rem;border-bottom: solid 1px black;">
    ${pay_type}
    </td>
    </tr>
    </table>
    

    ${balanceoutput}
`;
};

export default Body;
