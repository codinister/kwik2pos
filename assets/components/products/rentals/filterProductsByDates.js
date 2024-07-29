import { ymd } from '../../utils/DateFormats.js';
import { textInput } from '../../utils/InputFields.js';
import { classSelector } from '../../utils/Selectors.js';
import rentedList from '../rentals/rentedList.js';

const filterProductsByDates = (rented) => {
  document.addEventListener('change', (e) => {
    if (e.target.matches('.filtdt')) {
      const { name, value } = e.target;

      if (!localStorage.getItem('filterbydates')) {
        localStorage.setItem(
          'filterbydates',
          JSON.stringify({
            start_date: '',
            end_date: '',
          })
        );
      }

      const obj = JSON.parse(localStorage.getItem('filterbydates'));

      const newobj = {
        ...obj,
        [name]: value,
      };

      localStorage.setItem('filterbydates', JSON.stringify(newobj));

      const ob = JSON.parse(localStorage.getItem('filterbydates'));

      if (ob?.start_date.length > 0 && ob?.end_date.length > 0) {
        const { start_date, end_date } = ob;

        classSelector('products-table-body-inner').innerHTML = rentedList(
          Object.values(rented).filter((v) => {
            const st = new Date(start_date).getTime();
            const end = new Date(end_date).getTime();
            const exp = new Date(v.exp_date).getTime();

            return exp > st && exp < end;
          })
        );
      }
    }
  });

  return `
      <div>
        Filter by expiry dates
      </div>
      <div>
        ${textInput({
          type: 'date',
          classname: 'prod_start_date filtdt',
          required: true,
          label: 'Start date',
          name: 'start_date',
        })}
      </div>
      <div>
      ${textInput({
        type: 'date',
        classname: 'prod_end_date filtdt',
        required: true,
        label: 'End date',
        name: 'end_date',
      })}
      </div>
  `;
};

export default filterProductsByDates;
