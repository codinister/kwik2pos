import { formatDate } from '../../../utils/DateFormats.js';

const availableList = (obj,data) => {
  const arr = data?.checkedids;
  const unchk = data?.uncheckedIds;

  return Object.values(obj)
    .sort((a, b) => {
      if (a.prod_name > b.prod_name) return 1;
      else if (a.prod_name < b.prod_name) return -1;
      return 0;
    })
    .map((v) => {

      const checkbox = unchk.includes(v.prod_id)
        ? ''
        : data?.checkall
        ? 'checked'
        : arr.includes(v.prod_id)
        ? 'checked'
        : '';

      return `
        <tr class="available-table-body">
        <td>  
        <input type="checkbox" 
        ${checkbox}
        data-prod_id="${v.prod_id}" 
        data-prod_name="${v.prod_name}" 
        data-prod_size="${v.prod_size}" 
        data-prod_qty="${v.prod_qty}"
        data-cat_name="${v.cat_name}"
        data-type="Available List"
        class="checkmark" />
        </td>
        <td>
        <a href="javascript:void(0);" style="color: black;" class="availablesshowprod" data-prod_id="${v.prod_id}">${v.prod_name}</a>
        </td>
        <td>${v.remaining}</td>
        <td>${v.prod_size}</td>
        </tr>
      `;
    })
    .join(' ');
};

export default availableList;
