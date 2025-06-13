import generalHeader from '../../utils/generalHeader.js';
import {formatDate} from '../../utils/DateFormats.js'

const stocksData = (sett, stocks, prodType) => {
  const total_stocks = [...stocks].reduce((a, b) => {
    return Number(a) + Number(b.prod_qty);
  }, 0);

  const obj = [...stocks].sort((a, b) => {
    if (a.prod_name > b.prod_name) return 1;
    else if (a.prod_name < b.prod_name) return -1;
    else return;
  });

  let thead = '';
  let tbody = '';
  if (prodType === 'stocks') {
    thead = `<tr>
      <td style="width: 40rem;">Name</td> 
      <td style="width: 10rem;">Unit Price</td>
      <td style="width: 7rem;">Qty</td> 
      <td style="width: 16rem;">Category</td>
    </tr>`;
    tbody = [...obj].map(v =>(
      `
      <tr>
        <td>
        
          <a href="javascript:void(0);" style="color: black;" class="showprod" data-prod_id="${
            v.prod_id
          }">${v.prod_name} ${v.prod_size}</a>
        </td> 
        <td>${v.selling_price}</td>
        <td>${v.prod_qty}</td> 
        <td>${v.cat_name}</td>
      </tr>
      `
  )).join(' ')
  } else if (prodType === 'rented') {
    thead = `<tr>
      <td style="width: 40rem;">Name</td> 
      <td style="width: 10rem;">Size</td>
      <td style="width: 7rem;">Qty</td> 
      <td style="width: 16rem;">Exp. Date</td>
    </tr>`;
    tbody = [...obj].map(v =>(
      `
      <tr>
        <td>
        
          <a href="javascript:void(0);" style="color: black;" class="rentedshowprod" data-prod_id="${
            v.prod_id
          }">${v.prod_name} ${v.prod_size}</a>
        </td> 
        <td>${v.prod_size}</td>
        <td>${v.prod_qty}</td> 
        <td>${formatDate(v.exp_date)}</td>
      </tr>
      `
  )).join(' ')
  } else if (prodType === 'available') {
    thead = `<tr>
      <td style="width: 40rem;">Name</td> 
      <td style="width: 10rem;">Unit Price</td>
      <td style="width: 7rem;">Qty</td> 
      <td style="width: 16rem;">Category</td>
    </tr>`;
    tbody = [...obj].map(v =>(
      `
      <tr>
        <td>
        
          <a href="javascript:void(0);" style="color: black;" class="showprod" data-prod_id="${
            v.prod_id
          }">${v.prod_name} ${v.prod_size}</a>
        </td> 
        <td>${v.selling_price}</td>
        <td>${v.prod_qty}</td> 
        <td>${v.cat_name}</td>
      </tr>
      `
  )).join(' ')
  }

  document.querySelector('.contentroot').innerHTML = `
  <div>
  ${generalHeader({ ...sett, prodType, prodType })}
  <br />
  <br />
  <table border="1" cellpadding="12" style="width: 73rem;">
  <tr>
    <td>${prodType.toUpperCase()}</td>
    <td> TOTAL ${prodType.toUpperCase()}: &nbsp;&nbsp;${total_stocks}</td>
  </tr>
  </table>
  <br />
  <br />
  <table style="width: 73rem;" cellpadding="12" border="1" cellspacing="0">
  <thead style="background-color: #444; color: white;" >
  ${thead}
  </thead>
  <tbody>
  ${tbody}
  </tbody>
  </table>
  </div>
  `;
};

export default stocksData;
