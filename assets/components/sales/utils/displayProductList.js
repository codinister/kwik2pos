import format_number from '../../utils/format_number.js';
import editInvoiceAcessControl from '../utils/editInvoiceAccessControl.js';
import getIndustry from '../../utils/getIndustry.js';
import posTableclasses from '../../utils/posTableclasses.js';
import getPrevilleges from './getPrevilleges.js';

const displayProductList = () => {

  const industry = getIndustry();
  const unitprice = getPrevilleges('unitprice') ? '' : 'readonly';
  const invoicedesc = getPrevilleges('invoicedesc') ? '' : 'readonly';

  const prod_data = JSON.parse(localStorage.getItem('prozdlist'));

  if (prod_data) {
    const obj = Object.values(prod_data)
      .map((v) => v)
      .filter(Boolean);

    let numbering = 1;
    //localStorage.setItem('prozdlist', JSON.stringify(obj));

    const output = Object.values(obj)
      .map((v, k) => {
        if (v?.qty > 0) {

          const duration = v.duration;
          const { table_class, product_size } = posTableclasses(duration, k);
          const total_duration = Number(v.duration) ? Number(v.duration) : 1;
          const prod_price = Number(v.prod_price) ? Number(v.prod_price) : 1;

          const total_amnt =
            Number(v.qty) * Number(total_duration) * Number(prod_price);

          obj[k].total = total_amnt;

          const enable_unit_price_field = v.prod_name ? unitprice : '';

          let proddesc = v.prod_name;
          if (industry === 'retails' || industry === 'rentals') {
            proddesc = v.prod_name;
          }

          let check_duplicate = v.prod_id + '' + v.prod_name;
          const duplicate_result = obj
            .map((v) => v.prod_id + '' + v.prod_name)
            .filter((v) => v === check_duplicate).length;

          const highlight = duplicate_result > 1 ? 'highlight' : '';

          return `
            <ul class="${table_class} ${highlight}">
            <li class="hideonmobile">${numbering++}</li>
            <li>
            <input type="number" name="qty" data-key="${k}" 
            value="${v.qty}" class="qty sumitems" />
            </li>
            <li>
            <input type="text" name="prod_name" data-key="${k}" 
            value="${proddesc}" ${invoicedesc}   class="prod_name schprod" />
            </li>
     
            ${product_size}
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
