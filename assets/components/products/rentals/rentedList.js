import getLoginuser from '../../../state/statemanagement/sessionstorage/GET/getLoginuser.js';
import { formatDate } from '../../../utils/DateFormats.js';

const rentedList = (obj,data) => {
  const set = getLoginuser('settings')
  const dur = set?.duration;

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
        <tr class="products-table-body">

        <td>     
        <input type="checkbox" 
        ${checkbox}
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
        <a href="javascript:void(0);" style="color: black;" class="rentedshowprod" title="Start date: ${formatDate(
          v.createdAt
        )} Rented by: ${v.fullname} Duration ${
        v.duration
      } ${dur}" data-prod_id="${v.prod_id}">${v.prod_name}</a>
        </td>

        <td>${v.prod_qty}</td>
        <td>${formatDate(v.exp_date)}</td>
        <td>${v.prod_size}</td>
        </tr>
      `;
    })
    .join(' ');
};

export default rentedList;
