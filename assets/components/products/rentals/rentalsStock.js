import { classSelector } from '../../utils/Selectors.js';
import productSearchBox from '../utils/productSearchBox.js';
import productTitle from '../utils/productTitle.js';
import productsType from './productsType.js';
import productForm from './productForm.js';
import productsList from './productsList.js';
import { textInput } from '../../utils/InputFields.js';
import Buttons from '../../utils/Buttons.js';
import googlemap from '../../utils/googlemap.js';
import categoriesComponent from '../utils/categoriesComponent.js';
import productsLocalstorage from '../../data/clientside/localstorage/default/defaultProductsLocalstorage.js';

const rentalsStock = (data) => {
  const stocks = data.rentals.stocks;

  const categories = Object.values(
    stocks
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

      if (stocks && prod_id) {
        const prod = stocks.find((v) => v.prod_id === prod_id);

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
    }

    if (e.target.matches('.addProduct')) {
      //Spinner('add=product-wrapper');

      if (localStorage.getItem('prodlocalstorage')) {
        localStorage.removeItem('prodlocalstorage');
      }

      productsLocalstorage();

      classSelector('modalboxone').classList.add('show');
      document.body.style.overflow = 'hidden';
      classSelector('prod-form-title').innerHTML = 'ADD PRODUCTS';
      classSelector('prod-form-body').innerHTML = productForm(categories);
    }

    if (e.target.matches('.edit-prod')) {
      e.preventDefault()
      const { prod_id } = e.target.dataset;

      if (stocks) {
        const filter = stocks.find((v) => v.prod_id === prod_id);
        const arr = filter?.prod_qty_arr? filter?.prod_qty_arr : [];
        const trans = Object.values(arr).reduce((a, b) => {
          a['prod_qty' + b.qty_id] = {
            prod_qty: b.prod_qty,
            qty_id: b.qty_id,
            createdAt: b.createdAt,
          };

          return a;
        }, {});

        if(filter){
          filter.prod_qty_arr = trans;
          localStorage.setItem('prodlocalstorage', JSON.stringify(filter));
        }
        else{
          localStorage.setItem('prodlocalstorage', JSON.stringify([]));
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
      classSelector('products-table-body-inner').innerHTML = productsList(
        stocks.filter((v) =>
          Object.values(v).join(' ').toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  });

  /*
   * Categories Component
   */
  categoriesComponent(categories, stocks);

  const total_stocks = Object.values(stocks).reduce((a, b) => {
    return Number(a) + Number(b.prod_qty);
  }, 0);
  const prod_title = `<span>ALL Products</span> <span>${total_stocks}</span>`;
  classSelector('top-box-left').innerHTML = productTitle(prod_title);

  classSelector('top-box-right').innerHTML = productsType();

  classSelector('top-box-middle').innerHTML = productSearchBox(
    'Search Products',
    'search-rental-products'
  );

  classSelector('products-table-header').innerHTML = `
      <ul class="products-table-top">
      <li>      
      <input type="checkbox" class="checkall" />&nbsp;&nbsp;
      Name
      </li>
      <li>Qty</li>
      <li>Size</li>
      <li class="action">Actions</li>
      </ul>
      `;

  classSelector('products-table-body-inner').innerHTML = productsList(
    Object.values(stocks)
  );

  classSelector('add-product-wrapper').innerHTML = Buttons([
    {
      btnclass: 'addProduct',
      btnname: 'ADD PRODUCT',
    },
  ]);
};

export default rentalsStock;
