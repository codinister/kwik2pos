import { classSelector } from '../../../utils/Selectors.js';
import productSearchBox from '../../../utils/products/productSearchBox.js';
import productTitle from '../../../utils/products/productTitle.js';
import productsType from './productsType.js';
import googlemap from '../../../utils/googlemap.js';
import availableList from './availableList.js';
import categoriesComponent2 from '../../../utils/products/categoriesComponent2.js';
import { PaginationLinks, PaginationLogic } from '../../../utils/products/Pagination.js';
import setSessionStorage from '../../../state/statemanagement/sessionstorage/SET/setSessionStorage.js';

const available = (data, fulldata) => {
  const items = [...data];

  if (!sessionStorage.getItem('checkmark')) {
    productCheckmark('available');
  }

  const stocks = PaginationLogic(items);
  PaginationLinks({
    data: items,
    paginationCls: 'products-table-inner-pagination',
  });

  const categories = Object.values(
    fulldata
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
    if (e.target.matches('.availablesshowprod')) {
      e.stopImmediatePropagation();
      const { prod_id } = e.target.dataset;

      const {
        prod_name,
        prod_size,
        prod_code,
        prod_image,
        selling_price,
        prod_qty,
      } = items.find((v) => v.prod_id === prod_id);

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
            ${showmap}
          </div>

          <div>

          </div>
        </div>

        <div>  
        <div>
        <a href="assets/uploads/${prod_image}">
        <img src="assets/uploads/${prod_image}" alt="" />
        </a>
        </div>
        </div>
      </div>
      `;
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.target.matches('.search-availables-products')) {
      const { value } = e.target;
      const items = [...data];

      const searchres = items.filter((v) =>
        Object.values(v).join(' ').toLowerCase().includes(value.toLowerCase())
      );
      const res = PaginationLogic(searchres);

      setSessionStorage({
        key: 'checkmark',
        data: [{ name: 'search', value }],
      });

      const chkdata = JSON.parse(sessionStorage.getItem('checkmark'));

      classSelector('products-table-body-inner').innerHTML = availableList(
        searchres,
        chkdata
      );

      PaginationLinks({
        data: searchres,
        paginationCls: 'products-table-inner-pagination',
      });
    }
  });

  /*
   * Categories Component
   */
  categoriesComponent2(categories);

  const total_items = Object.values(items).reduce((a, b) => {
    return Number(a) + Number(b.remaining);
  }, 0);
  const prod_title = `<span>Available</span> <span>${total_items}</span>`;
  classSelector('top-box-left').innerHTML = productTitle(prod_title);

  classSelector('top-box-right').innerHTML = productsType();

  classSelector('top-box-middle').innerHTML = productSearchBox(
    'Search Products',
    'search-availables-products'
  );

  const chkm = JSON.parse(sessionStorage.getItem('checkmark'));

  if (chkm?.checkall) {
    classSelector('products-table-body-inner').innerHTML = availableList(
      stocks,
      chkm
    );
  } else {
    classSelector('products-table-body-inner').innerHTML = availableList(
      Object.values(stocks),
      chkm
    );
  }

  if (chkm?.checkedids.length > 0) {
    classSelector('generatepreview').classList.add('show');
  }

  if (chkm?.checkall) {
    classSelector('generatepreview').classList.add('show');
  }

  classSelector('products-table-header').innerHTML = `
      <tr class="available-table-top">
      <td>      
      <input ${
        chkm?.checkall ? 'checked' : ''
      } type="checkbox" class="checkallavailable" />
      </td>

      <td>
      Name
      </td>
      <td>Qty</td>
     
      <td>Size</td>
      </tr>
      `;

  if (chkm?.checkedids.length > 0) {
    classSelector('generatepreview').classList.add('show');
  }

  if (chkm?.checkall) {
    classSelector('generatepreview').classList.add('show');
  }

  classSelector('products-type').value = 'available';
  classSelector('add-product-wrapper').innerHTML = '';
};

export default available;
