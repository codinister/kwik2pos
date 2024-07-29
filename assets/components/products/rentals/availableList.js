import { formatDate } from '../../utils/DateFormats.js';

const availableList = (obj) => {
  return Object.values(obj)
    .sort((a, b) => {
      if (a.prod_name > b.prod_name) return 1;
      else if (a.prod_name < b.prod_name) return -1;
      return 0;
    })
    .map(
      (v) => `
        <ul class="products-table-body">
        <li>  
        <span>    
        <input type="checkbox" 
        data-prod_id="${v.prod_id}" 
        data-prod_name="${v.prod_name}" 
        data-prod_size="${v.prod_size}" 
        data-prod_qty="${v.prod_qty}"
        data-cat_name="${v.cat_name}"
        data-type="Available List"
        class="checkmark" />
        </span>
        <span>
        <a href="javascript:void(0);" style="color: black;" class="rentedshowprod" data-prod_id="${
          v.prod_id
        }">${v.prod_name}</a>
        </span>
        </li>
        <li>${v.remaining}</li>
        <li>${v.cat_name}</li>
        <li>${v.prod_size}</li>
        </ul>
      `
    )
    .join(' ');
};

export default availableList;
