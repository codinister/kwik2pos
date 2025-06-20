import {
  ym,
  year,
  expiry_date,
  formatDate,
  formatMonth,
  month,
} from '../../../utils/DateFormats.js';
import { classSelector } from '../../../utils/Selectors.js';
import rentedList from './rentedList.js';
import { PaginationLinks, PaginationLogic } from '../../../utils/products/Pagination.js';
import setSessionStorage from '../../../state/statemanagement/sessionstorage/SET/setSessionStorage.js';
import getLoginuser from '../../../state/statemanagement/sessionstorage/GET/getLoginuser.js';

const filterProductsByDates = (rented) => {
  const us = getLoginuser('user')
  const cur_date = ym(us?.login_date);

  const items = Object.values(
    rented
      .filter((v) => {
        return ym(expiry_date(v.duration, v.createdAt)) >= cur_date;
      })
      .reduce((a, b) => {
        if (a[ym(b.exp_date)]) {
          a[ym(b.exp_date)] = b;
        } else {
          a[ym(b.exp_date)] = b;
        }

        return a;
      }, {})
  )
    .sort((a, b) => {
      if (month(a.exp_date) > month(b.exp_date)) return 1;
      else if (month(a.exp_date) < month(b.exp_date)) return -1;
      else return 0;
    })
    .map((v) => {
      const label = formatMonth(v.exp_date) + ' ' + year(v.exp_date);
      const value = ym(v.exp_date);

      return `
      <option value="${value}">${label}</option>
      `;
    })
    .join(' ');

  document.addEventListener('change', (e) => {
    if (e.target.matches('.expiries')) {
      const { value } = e.target;

      const res = [...rented].filter((v) => ym(v.exp_date) === value);

      PaginationLogic(res);

      setSessionStorage({
        key: 'checkmark',
        data: [{ name: 'expiries', value }],
      });

      const data = JSON.parse(sessionStorage.getItem('checkmark'));

      classSelector('products-table-body-inner').innerHTML = rentedList(
        res,
        data
      );

      PaginationLinks({
        data: res,
        paginationCls: 'products-table-inner-pagination',
      });
    }
  });

  return `
      <div>
        Filter by expiry dates
      </div>
      <div>
        <select class="expiries">
        <option hidden>Select date</option>
        ${items}
        </select>
      </div>

 
  `;
};

export default filterProductsByDates;
