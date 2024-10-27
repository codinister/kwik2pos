import { formatDate } from '../../utils/DateFormats.js';

const rentedList = (obj) => {
  return Object.values(obj)
    .sort((a, b) => {
      if (a.prod_name > b.prod_name) return 1;
      else if (a.prod_name < b.prod_name) return -1;
      return 0;
    })
    .map(
      (v) => `
        <tr class="products-table-body">

        <td>     
        <input type="checkbox" 
        data-prod_id="${v.prod_id}" 
        data-prod_name="${v.prod_name}" 
        data-prod_size="${v.prod_size}" 
        data-prod_qty="${v.prod_qty}"
        data-cat_name="${v.cat_name}"
        data-exp_date="${v.exp_date}"
        data-createdat="${v.createdAt}"
        data-type="Rented List"
        class="checkmark" />
        </td>
        
        <td>
        <a href="javascript:void(0);" style="color: black;" class="rentedshowprod" title="Start date: ${formatDate(v.createdAt)} Rented by: ${v.fullname}" data-prod_id="${
          v.prod_id
        }">${v.prod_name}</a>
        </td>

        <td>${v.prod_qty}</td>
        <td>${formatDate(v.exp_date)}</td>
        <td>${v.prod_size}</td>
        </tr>
      `
    )
    .join(' ');
};

export default rentedList;
