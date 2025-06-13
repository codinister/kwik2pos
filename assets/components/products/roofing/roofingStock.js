import { classSelector } from '../../../utils/Selectors.js';
import productSearchBox from '../../../utils/products/productSearchBox.js';
import productTitle from '../../../utils/products/productTitle.js';
import roofingForm from './roofingForm.js';
import productsSessionStorage from '../../../state/statemanagement/sessionstorage/default/defaultProductsSessionStorage.js';
import roofingList from './roofingList.js';
import Buttons from '../../../utils/Buttons.js';
import categoriesComponent3 from '../../../utils/products/categoriesComponent3.js';

const roofingStock = (prod) => {
  const products = prod.roofing;

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
    if (e.target.matches('.showroofing')) {
      const { prod_id } = e.target.dataset;

      if (products) {
        const prod = products.find((v) => v.prod_id === prod_id);

        const prod_name = prod?.prod_name;
        const cat_name = prod?.cat_name;
        const prod_image = prod?.prod_image;
        const selling_price = prod?.selling_price;

        classSelector('modalboxone').classList.add('show');
        document.body.style.overflow = 'hidden';

        classSelector('prod-form-title').innerHTML = prod_name;

        classSelector('prod-form-body').innerHTML = `
      <div class="show-prod-box">
        <div>
          <ul>
            <li>
            <span>Category</span> <span>${cat_name}</span>
            </li>
            <li>
            <span>Unit Price (GHs)</span> <span>${selling_price}</span>
            </li>
          </ul>
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

      if (sessionStorage.getItem('prodsessionstorage')) {
        sessionStorage.removeItem('prodsessionstorage');
      }

      productsSessionStorage();

      classSelector('modalboxone').classList.add('show');
      document.body.style.overflow = 'hidden';
      classSelector('prod-form-title').innerHTML = 'ADD PRODUCT';
      classSelector('prod-form-body').innerHTML = roofingForm(categories);
    }

    if (e.target.matches('.edit-prod')) {
      const { prod_id } = e.target.dataset;

      const filter = products.find((v) => v.prod_id === prod_id);

      // filter.prod_qty_arr = trans;
      sessionStorage.setItem('prodsessionstorage', JSON.stringify(filter));

      classSelector('modalboxone').classList.add('show');
      document.body.style.overflow = 'hidden';

      classSelector('prod-form-title').innerHTML = 'EDIT PRODUCT';

      setTimeout(() => {
        classSelector('prod-form-body').innerHTML = roofingForm(categories);
      }, 0);
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.target.matches('.search-rental-products')) {
      const { value } = e.target;
      classSelector('products-table-body-inner').innerHTML = roofingList(
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

  const total_products = Object.values(products).length;

  const prod_title = `<span>Products</span> <span>${total_products}</span>`;
  classSelector('top-box-left').innerHTML = productTitle(prod_title);

  //classSelector('top-box-right').innerHTML = productsType();

  classSelector('top-box-middle').innerHTML = productSearchBox(
    'Search Products',
    'search-rental-products'
  );

  
  if(classSelector('products-table-header')){
  classSelector('products-table-header').innerHTML = `
      <tr class="service-table-top">
      <td>      
      <input type="checkbox" class="checkall" />
      </td>
      <td>Product</td>
      <td>Unit Price</td>
      <td class="action">Actions</td>
      </tr>
      `;
  }




  if(classSelector('products-table-body-inner')){
  classSelector('products-table-body-inner').innerHTML = roofingList(
    Object.values(products)
  );
}

  classSelector('add-product-wrapper').innerHTML = Buttons([
    {
      btnclass: 'addProduct',
      btnname: 'ADD PRODUCT',
    },
  ]);
};

export default roofingStock;
