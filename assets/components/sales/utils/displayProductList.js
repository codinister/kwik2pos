import format_number from '../../utils/format_number.js';
import editInvoiceAcessControl from '../utils/editInvoiceAccessControl.js';
import { unitprice, invoicedesc } from '../utils/activateInvoiceinputs.js';
import getIndustry from '../../utils/getIndustry.js';

const displayProductList = () => {
  const obj = JSON.parse(localStorage.getItem('prozdlist'));
  const industry = getIndustry();

  if (obj) {
    let numbering = 1;
    localStorage.setItem('prozdlist', JSON.stringify(obj));

    const output = Object.values(obj)
      .map((v, k) => {
        if (v?.qty > 0) {
          let prodsize = '';
          let salestableclass = '';
          if (
            industry === 'roofing company' ||
            industry === 'service provider' ||
            industry === 'rentals'
          ) {
            prodsize = `<li>
            <input class="sumitems duration" name="duration" type="number" data-key="${k}" value="${v.duration}" />
            </li>`;
            salestableclass = 'sales-table';
          } else if (industry === 'retailing') {
            salestableclass = 'prod-sales-table';
          }

          const total_duration = Number(v.duration) ? Number(v.duration) : 1;
          const prod_price = Number(v.prod_price) ? Number(v.prod_price) : 1;

          const total_amnt =
            Number(v.qty) * Number(total_duration) * Number(prod_price);

          obj[k].total = total_amnt;

          const enable_unit_price_field = v.prod_name ? unitprice : '';

          let proddesc = v.prod_name;
          if (industry === 'retailing' || industry === 'rentals') {
            proddesc = v.prod_name;
          }

          const slct_prod_id = obj
            .map((v) => v)
            .filter(Boolean)
            .filter((vv) => {
              if (vv.prod_id) return vv.prod_id === v.prod_id;
            }).length;
          const highlight = slct_prod_id > 1 ? 'highlight' : '';

          return `
            <ul class="${salestableclass} ${highlight}">
            <li>${numbering++}</li>
            <li>
            <input type="number" name="qty" data-key="${k}" 
            value="${v.qty}" class="qty sumitems" />
            </li>
            <li>
            <input type="text" name="prod_name" data-key="${k}" 
            value="${proddesc}" ${invoicedesc}   class="prod_name schprod" />
            </li>
     
            ${prodsize}
            <li>
            <input class="sumitems prod_price" name="prod_price" type="number" data-key="${k}" 
            value="${v.prod_price}" ${enable_unit_price_field}  />
            </li>

            <li>
            <span class="total${k}">
            ${format_number(total_amnt)}
            </span>
            </li>
            <li>
            ${editInvoiceAcessControl(
              `<i class="fa fa-trash delete-item" data-s_id="${v.s_id}" data-trash="${k}"></i>`
            )}
            </li>
            </ul>
          `;
        }
      })
      .join('');

    localStorage.setItem('prozdlist', JSON.stringify(obj));

    return output;
  } else {
    return '';
  }
};

export default displayProductList;
