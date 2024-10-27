import { classSelector } from '../../utils/Selectors.js';
import productSearchBox from '../utils/productSearchBox.js';
import productTitle from '../utils/productTitle.js';
import serviceForm from './serviceForm.js';
import productsLocalstorage from '../../data/clientside/localstorage/default/defaultProductsLocalstorage.js';

import serviceList from './serviceList.js';
import Buttons from '../../utils/Buttons.js';
import categoriesComponent3 from '../utils/categoriesComponent3.js';

const serviceStock = (data) => {


  const products = data.service

  const categories = Object.values(
    products
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


    
    if (e.target.matches('.showservice')) {
      const { prod_id } = e.target.dataset;

      if(products){

      const prod = products.find((v) => v.prod_id === prod_id);

      const prod_name = prod?.prod_name
      const cat_name = prod?.cat_name
      const prod_image = prod?.prod_image
      const selling_price = prod?.selling_price

      classSelector('modalboxone').classList.add('show');
      document.body.style.overflow = 'hidden';

      classSelector('prod-form-title').innerHTML = prod_name;


      classSelector('prod-form-body').innerHTML = `
      <div class="show-prod-box">

        <div>
          <tr>
            <td>
            <span>Category</span> <span>${cat_name}</span>
            </td>
            <td>
            <span>Unit Price (GHs)</span> <span>${selling_price}</span>
            </td>
          </tr>

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
      classSelector('prod-form-title').innerHTML = 'ADD SERVICE';
      classSelector('prod-form-body').innerHTML = serviceForm(categories);
    }


    if (e.target.matches('.edit-prod')) {
      const { prod_id } = e.target.dataset;

      const filter = products.find((v) => v.prod_id === prod_id);

      // filter.prod_qty_arr = trans;
      localStorage.setItem('prodlocalstorage', JSON.stringify(filter));

      classSelector('modalboxone').classList.add('show');
      document.body.style.overflow = 'hidden';

      classSelector('prod-form-title').innerHTML = 'EDIT SERVICE';

      setTimeout(()=>{
        classSelector('prod-form-body').innerHTML = serviceForm(categories);
      },0)

    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.target.matches('.search-rental-products')) {
      const { value } = e.target;
      classSelector('products-table-body-inner').innerHTML = serviceList(
        products.filter((v) =>
          Object.values(v).join(' ').toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  });

  /*
   * Categories Component
   */
  categoriesComponent3(categories, products);

  const total_products = Object.values(products).length 

  const prod_title = `<span>Services</span> <span>${total_products}</span>`;
  classSelector('top-box-left').innerHTML = productTitle(prod_title);

  //classSelector('top-box-right').innerHTML = productsType();

  classSelector('top-box-middle').innerHTML = productSearchBox(
    'Search Products',
    'search-rental-products'
  );

  classSelector('products-table-header').innerHTML = `
      <tr class="service-table-top">
      <td>      
      <input type="checkbox" class="checkall" />
      
      <td>
      Service
      </td>
      <td>Price</td>
      <td class="action">Actions</td>
      </tr>
      `;

  classSelector('products-table-body-inner').innerHTML = serviceList(
    Object.values(products)
  );

  classSelector('add-product-wrapper').innerHTML = Buttons([
    {
      btnclass: 'addProduct',
      btnname: 'ADD SERVICE',
    },
  ]);
};

export default serviceStock;




