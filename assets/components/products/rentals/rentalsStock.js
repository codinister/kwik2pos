import { classSelector } from '../../../utils/Selectors.js';
import productSearchBox from '../../../utils/products/productSearchBox.js';
import productTitle from '../../../utils/products/productTitle.js';
import productsType from './productsType.js';
import productForm from './productForm.js';
import productsList from './productsList.js';
import Buttons from '../../../utils/Buttons.js';
import googlemap from '../../../utils/googlemap.js';
import categoriesComponent from '../../../utils/products/categoriesComponent.js';
import productsSessionStorage from '../../../state/statemanagement/sessionstorage/default/defaultProductsSessionStorage.js';
import { PaginationLogic, PaginationLinks } from '../../../utils/products/Pagination.js';
import productCheckmark from '../../../state/statemanagement/sessionstorage/default/productCheckmark.js';
import setSessionStorage from '../../../state/statemanagement/sessionstorage/SET/setSessionStorage.js';

const rentalsStock = (data, fulldata) => {
  const items = [...data];

  if (!sessionStorage.getItem('checkmark')) {
    productCheckmark('stocks');
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
    if (e.target.matches('.showprod')) {
      const { prod_id } = e.target.dataset;
      if (prod_id) {
        const prod = items.find((v) => v.prod_id === prod_id);
        const prod_name = prod?.prod_name;
        const prod_size = prod?.prod_size;
        const prod_code = prod?.prod_code;
        const prod_image = prod?.prod_image;
        const selling_price = prod?.selling_price;
        const prod_qty = prod?.prod_qty;

        classSelector('modalboxone').classList.add('show');
        document.body.style.overflow = 'hidden';

        classSelector('prod-form-title').innerHTML = prod_name;

        let showmap = '';

        const splt = prod_code?.split('.')[1];

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
    }

    if (e.target.matches('.addProduct')) {
      //Spinner('add=product-wrapper');

      if (sessionStorage.getItem('prodsessionstorage')) {
        sessionStorage.removeItem('prodsessionstorage');
      }

      productsSessionStorage();

      classSelector('modalboxone').classList.add('show');
      document.body.style.overflow = 'hidden';
      classSelector('prod-form-title').innerHTML = 'ADD PRODUCTS';
      classSelector('prod-form-body').innerHTML = productForm(categories);
    }

    if (e.target.matches('.edit-prod')) {
      e.preventDefault();
      const { prod_id } = e.target.dataset;

      if (stocks) {
        const filter = stocks.find((v) => v.prod_id === prod_id);
        const arr = filter?.prod_qty_arr ? filter?.prod_qty_arr : [];
        const trans = Object.values(arr).reduce((a, b) => {
          a['prod_qty' + b.qty_id] = {
            prod_qty: b.prod_qty,
            qty_id: b.qty_id,
            createdAt: b.createdAt,
          };

          return a;
        }, {});

        if (filter) {
          filter.prod_qty_arr = trans;
          sessionStorage.setItem('prodsessionstorage', JSON.stringify(filter));
        } else {
          sessionStorage.setItem('prodsessionstorage', JSON.stringify([]));
        }

        classSelector('modalboxone').classList.add('show');
        document.body.style.overflow = 'hidden';

        classSelector('prod-form-title').innerHTML = 'EDIT PRODUCTS';
        setTimeout(() => {
          classSelector('prod-form-body').innerHTML = productForm(categories);
        }, 0);
      }
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.target.matches('.search-rental-products')) {
      const { value } = e.target;

      if(!value){
        sessionStorage.setItem('rend', 2);
      }
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
      classSelector('products-table-body-inner').innerHTML = productsList(
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
  categoriesComponent(categories);

  const total_stocks = Object.values(items).reduce((a, b) => {
    return Number(a) + Number(b.prod_qty);
  }, 0);
  const prod_title = `<span>ALL Products</span> <span>${total_stocks}</span>`;
  classSelector('top-box-left').innerHTML = productTitle(prod_title);

  classSelector('top-box-right').innerHTML = productsType();

  classSelector('top-box-middle').innerHTML = productSearchBox(
    'Search Products',
    'search-rental-products'
  );

  const chkm = JSON.parse(sessionStorage.getItem('checkmark'));

  if (chkm?.checkall) {
    classSelector('products-table-body-inner').innerHTML = productsList(
      Object.values(stocks),
      chkm
    );
  } else {
    classSelector('products-table-body-inner').innerHTML = productsList(
      Object.values(stocks),
      chkm
    );
  }

  classSelector('products-table-header').innerHTML = `
      <tr class="products-table-top">
      <td><input ${
        chkm?.checkall ? 'checked' : ''
      } type="checkbox" class="checkallbox" /></td>
      <td>Name</td>
      <td>Qty</td>
      <td>Size</td>
      <td class="action">Actions</td>
      </tr>
    `;

  if (chkm?.checkedids.length > 0) {
    classSelector('generatepreview').classList.add('show');
  }

  if (chkm?.checkall) {
    classSelector('generatepreview').classList.add('show');
  }

  classSelector('add-product-wrapper').innerHTML = Buttons([
    {
      btnclass: 'addProduct',
      btnname: 'ADD PRODUCT',
    },
  ]);
};

export default rentalsStock;
