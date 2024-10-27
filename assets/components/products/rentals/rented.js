import { classSelector } from '../../utils/Selectors.js';
import productSearchBox from '../utils/productSearchBox.js';
import productTitle from '../utils/productTitle.js';
import productsType from './productsType.js';
import rentedList from './rentedList.js';
import categoriesComponent2 from '../utils/categoriesComponent2.js';
import filterProductsByDates from './filterProductsByDates.js';
import googlemap from '../../utils/googlemap.js';
import { textInput } from '../../utils/InputFields.js';
import Buttons from '../../utils/Buttons.js';

const rented = (data) => {


  const rented = data.rentals.rented


  const categories = Object.values(
    rented
      .map((v) => ({ cat_id: v.cat_id, cat_name: v.cat_name }))
      .reduce((a, b) => {
        if (a[b.cat_id]) {
          a[b.cat_id] = b;
        } else {
          a[b.cat_id] = b;
        }
        return a;
      }, {})
  ).sort((a, b) => {
    if (a.cat_name > b.cat_name) return 1;
    else if (a.cat_name < b.cat_name) return -1;
    return 0;
  });

  document.addEventListener('click', (e) => {
    if (e.target.matches('.rentedshowprod')) {
      e.stopImmediatePropagation()
      const { prod_id } = e.target.dataset;


      const {
        prod_name,
        prod_size,
        prod_code,
        prod_image,
        selling_price,
        prod_qty,
      } = rented.find((v) => v.prod_id === prod_id);

      classSelector('modalboxone').classList.add('show');
      document.body.style.overflow = 'hidden';

      classSelector('prod-form-title').innerHTML = prod_name;

      let showmap = '';

      const splt = prod_code.split('.')[1];

      if (splt) {
        showmap = googlemap(prod_code);
      }

      classSelector('prod-form-body').innerHTML = `
      <div class="show-prod-box">

        <div>
          <ul>
            <li>
            <span>Product Size</span> <span>${prod_size}</span>
            </li>
            <li>
            <span>Unit Price (GHs)</span> <span>${selling_price}</span>
            </li>
            <li>
            <span>Product Qty</span> <span>${prod_qty}</span>
            </li>
          </ul>

          <div>
            ${textInput({
              type: 'email',
              classname: 'prod_name prod-inpt',
              name: 'email',
              required: true,
              label: 'Enter email',
            })}

            ${Buttons([
              {
                btnclass: 'sendemail',
                btnname: 'SEND EMAIL',
              },
            ])}
          </div>

          <div>  
            ${showmap}
          </div>

          <div>

          </div>
        </div>

        <div>  
        <div>
        <img src="assets/uploads/${prod_image}" alt="" />
        </div>
        </div>
      </div>
      `;
    }


  });

  document.addEventListener('keyup', (e) => {
    if (e.target.matches('.search-rented-products')) {
      const { value } = e.target;
      classSelector('products-table-body-inner').innerHTML = rentedList(
        rented.filter((v) =>
          Object.values(v).join(' ').toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  });

  /*
   * Categories Component
   */
  categoriesComponent2(categories);

  const total_rented = Object.values(rented).reduce((a, b) => {
    return Number(a) + Number(b.sold);
  }, 0);
  const prod_title = `<span>Rented Products</span> <span>${total_rented}</span>`;
  classSelector('top-box-left').innerHTML = productTitle(prod_title);

  classSelector('top-box-right').innerHTML = productsType();

  classSelector('other-box').innerHTML = filterProductsByDates(rented);

  classSelector('top-box-middle').innerHTML = productSearchBox(
    'Search Products',
    'search-rented-products'
  );

  classSelector('products-table-header').innerHTML = `
      <tr class="products-table-top">
      
      <td>      
      <input type="checkbox" class="checkall" />
      </td>
      
      <td>
      Name
      </td>

      <td>Qty</td>
      <td class="action">Exp. Date</td>
      <td>Size</td>
      </tr>
      `;

  classSelector('products-table-body-inner').innerHTML = rentedList(
    Object.values(rented)
  );

  classSelector('products-type').value = 'rented';
  classSelector('add-product-wrapper').innerHTML = '';
};

export default rented;
