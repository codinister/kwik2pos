import Buttons from '../Buttons.js';

const saveInvoiceBtn = () => {
  const tx = JSON.parse(sessionStorage.getItem('sales'));

  if (tx?.trans_type) {
    return `
    ${Buttons([
      {
        btnclass: 'viewinvoice',
        btnname: 'VIEW INVOICE',
      },
    ])}
    `;
  } else {
    return '';
  }
};

export default saveInvoiceBtn;
