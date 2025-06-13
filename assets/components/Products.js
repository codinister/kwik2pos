import productsprofile from '../state/serverside/read/products/productsprofile.js';
import Modalboxone from '../utils/Modalboxone.js';
import { classSelector } from '../utils/Selectors.js';
import rerender from '../utils/rerender.js';
import rentalsStock from './products/rentals/rentalsStock.js';
import availableProduct from './products/rentals/available.js';
import rentedProducts from './products/rentals/rented.js';
import retailsStock from './products/retails/retailStock.js';
import serviceStock from './products/services/serviceStock.js';
import Buttons from '../utils/Buttons.js';
import productsSessionStorage from '../state/statemanagement/sessionstorage/default/defaultProductsSessionStorage.js';
import editCatForm from '../utils/products/editCatForm.js';
import roofingStock from './products/roofing/roofingStock.js';
import dataListDropdown from '../utils/dataListDropdown.js';
import { textInput } from '../utils/InputFields.js';
import productCheckmark from '../state/statemanagement/sessionstorage/default/productCheckmark.js';
import productCheckmarkSet from '../state/statemanagement/sessionstorage/SET/productCheckmarkSet.js';
import {
  PaginationLinks,
  PaginationLogic,
} from '../utils/products/Pagination.js';
import typeOfProduct from '../utils/typeOfProduct.js';
import getUrlSearchParam from '../utils/products/getUrlSearchParam.js';
import productsList from './products/rentals/productsList.js';
import availableList from './products/rentals/availableList.js';
import rentedList from './products/rentals/rentedList.js';
import industryCheck from '../utils/industryCheck.js';

const Products = () => {
  if (!sessionStorage.getItem('prodType')) {
    sessionStorage.setItem('prodType', 'stocks');
  }

  if (!sessionStorage.getItem('checkmark')) {
    productCheckmark('stocks');
  }

  document.addEventListener('click', (e) => {
    if (e.target.matches('.show-all-prod')) {
      const url = 'index.html?page=products&p=1';
      history.pushState({}, null, url);
      productCheckmarkSet({
        checkall: false,
        cat_id: '',
        checkedids: [],
        uncheckedIds: [],
        prod_size: '',
      });
      sessionStorage.setItem('rend', 2);
    }
    if (e.target.matches('.edit-prod-cat')) {
      if (!sessionStorage.getItem('prodsessionstorage')) {
        productsSessionStorage();
      }

      const { cat_name, cat_id } = e.target.dataset;

      const obj = JSON.parse(sessionStorage.getItem('prodsessionstorage'));
      obj['cat_name'] = cat_name;
      obj['cat_id'] = cat_id;
      sessionStorage.setItem('prodsessionstorage', JSON.stringify(obj));

      classSelector('modalboxone').classList.add('show');
      document.body.style.overflow = 'hidden';

      classSelector('prod-form-title').innerHTML = 'EDIT CATEGORY';
      classSelector('prod-form-body').innerHTML = editCatForm(cat_name);
    }

    if (e.target.matches('.delete-prod')) {
      e.stopImmediatePropagation();

      const { prod_id } = e.target.dataset;

      if (confirm('Are you sure you want to delete!')) {
        fetch(
          `router.php?controller=products&task=delete_product&prod_id=${prod_id}`
        )
          .then((resp) => resp.text())
          .then((data) => {
            sessionStorage.setItem('rend', 2);
          });
      } else {
      }
    }
  });

  productsprofile((proddata) => {
    const { output, fulldata } = typeOfProduct(proddata);

    document.addEventListener('change', (e) => {
      if (e.target.matches('.prodsizefilter')) {
        e.stopImmediatePropagation();
        const { value } = e.target;

        const obj = JSON.parse(sessionStorage.getItem('checkmark'));

        productCheckmarkSet({
          checkall: false,
          cat_id: obj?.cat_id,
          checkedids: [...obj?.checkedids],
          uncheckedIds: [...obj?.uncheckedIds],
          prod_size: value,
        });

        const url = getUrlSearchParam({
          cat: '',
          page: '',
          prodsize: value,
        });
        history.pushState({}, null, url);
        sessionStorage.setItem('rend', 2);
      }

      if (e.target.matches('.checkallavailable')) {
        e.stopImmediatePropagation();
        const obj = JSON.parse(sessionStorage.getItem('checkmark'));
        if (e.target.checked) {
          const { output } = typeOfProduct(proddata);
          const stocks = PaginationLogic(output);
          const obj = JSON.parse(sessionStorage.getItem('checkmark'));
          PaginationLinks({
            data: output,
            paginationCls: 'products-table-inner-pagination',
          });

          productCheckmarkSet({
            checkall: true,
            cat_id: obj?.cat_id,
            checkedids: [],
            uncheckedIds: [],
            prod_size: obj?.prod_size,
          });

          const data = JSON.parse(sessionStorage.getItem('checkmark'));

          classSelector('products-table-body-inner').innerHTML = availableList(
            Object.values(stocks),
            data
          );

          classSelector('generatepreview').classList.add('show');
        } else {
          productCheckmarkSet({
            checkall: false,
            cat_id: '',
            checkedids: [],
            uncheckedIds: [],
            prod_size: obj?.prod_size,
          });

          sessionStorage.setItem('rend', 2);
        }
      }

      if (e.target.matches('.checkallrented')) {
        e.stopImmediatePropagation();
        const obj = JSON.parse(sessionStorage.getItem('checkmark'));
        if (e.target.checked) {
          const { output } = typeOfProduct(proddata);
          const stocks = PaginationLogic(output);
          const obj = JSON.parse(sessionStorage.getItem('checkmark'));

          PaginationLinks({
            data: output,
            paginationCls: 'products-table-inner-pagination',
          });

          productCheckmarkSet({
            checkall: true,
            cat_id: obj?.cat_id,
            checkedids: [],
            uncheckedIds: [],
            prod_size: obj?.prod_size,
          });
          const data = JSON.parse(sessionStorage.getItem('checkmark'));

          classSelector('products-table-body-inner').innerHTML = rentedList(
            Object.values(stocks),
            data
          );

          classSelector('generatepreview').classList.add('show');
        } else {
          productCheckmarkSet({
            checkall: false,
            cat_id: '',
            checkedids: [],
            uncheckedIds: [],
            prod_size: obj?.prod_size,
          });

          sessionStorage.setItem('rend', 2);
        }
      }

      if (e.target.matches('.checkallbox')) {
        e.stopImmediatePropagation();
        const obj = JSON.parse(sessionStorage.getItem('checkmark'));
        if (e.target.checked) {
          const { output } = typeOfProduct(proddata);
          const stocks = PaginationLogic(output);

          PaginationLinks({
            data: output,
            paginationCls: 'products-table-inner-pagination',
          });

          productCheckmarkSet({
            checkall: true,
            cat_id: obj?.cat_id,
            checkedids: [],
            uncheckedIds: [],
            prod_size: obj?.prod_size,
          });

          const data = JSON.parse(sessionStorage.getItem('checkmark'));
          classSelector('products-table-body-inner').innerHTML = productsList(
            Object.values(stocks),
            data
          );

          classSelector('generatepreview').classList.add('show');

          //sessionStorage.setItem('rend', 2);
        } else {
          productCheckmarkSet({
            checkall: false,
            cat_id: obj?.cat_id,
            checkedids: [],
            uncheckedIds: [],
            prod_size: obj?.prod_size,
          });

          sessionStorage.setItem('rend', 2);
        }
      }

      if (e.target.matches('.checkmark')) {
        e.stopImmediatePropagation();

        const data = JSON.parse(sessionStorage.getItem('checkmark'));

        const { prod_id } = e.target.dataset;
        if (e.target.checked) {
          if (data?.checkall) {
            const res = data?.uncheckedIds.filter((v) => v !== prod_id);
            data['uncheckedIds'] = res;
            data['checkedids'] = [];
          } else {
            data['uncheckedIds'] = [];
            data['checkedids'] = [...data?.checkedids, prod_id];
            classSelector('generatepreview').classList.add('show');
          }
        } else {
          if (data?.checkall) {
            data['uncheckedIds'] = [...data?.uncheckedIds, prod_id];
            data['checkedids'] = [];
          } else {
            const arr = data?.checkedids.filter((v) => v !== prod_id);
            data['uncheckedIds'] = [];
            data['checkedids'] = arr;

            if (data?.checkedids.length < 1) {
              classSelector('generatepreview').classList.remove('show');
            }
          }
        }
        sessionStorage.setItem('checkmark', JSON.stringify(data));
      }

      if (e.target.matches('.products-type')) {
        const { value } = e.target;

        if (value === 'available') {
          const url = 'index.html?page=products&p=1';
          history.pushState({}, null, url);
          sessionStorage.setItem('prodType', 'available');
          if (sessionStorage.getItem('checkmark')) {
            productCheckmark('available');
          }
          const { output, fulldata } = typeOfProduct(proddata);
          availableProduct(output, fulldata);
          productCheckmark('available');
          sessionStorage.setItem('rend', 2);
        } else if (value === 'rented') {
          const url = 'index.html?page=products&p=1';
          history.pushState({}, null, url);
          sessionStorage.setItem('prodType', 'rented');
          if (sessionStorage.getItem('checkmark')) {
            productCheckmark('rented');
          }
          const { output, fulldata } = typeOfProduct(proddata);
          rentedProducts(output, fulldata);
          productCheckmark('rented');
          sessionStorage.setItem('rend', 2);
        } else {
          const url = 'index.html?page=products&p=1';
          history.pushState({}, null, url);
          sessionStorage.setItem('prodType', 'stocks');
          if (sessionStorage.getItem('checkmark')) {
            productCheckmark('stocks');
          }
          const { output, fulldata } = typeOfProduct(proddata);
          rentalsStock(output, fulldata);
          productCheckmark('stocks');
          sessionStorage.setItem('rend', 2);
        }
      }
    });

    if (industryCheck('rentals')) {
      setTimeout(() => {
        const value = sessionStorage.getItem('prodType');
        if (value === 'available') {
          availableProduct(output, fulldata);
        } else if (value === 'rented') {
          rentedProducts(output, fulldata);
        } else {
          rentalsStock(output, fulldata);
        }
      }, 0);
    }

    if (industryCheck('retails')) {
      setTimeout(() => {
        retailsStock(output, fulldata);
      }, 0);
    }

    if (industryCheck('service provider')) {
      setTimeout(() => {
        serviceStock(output, fulldata);
      }, 0);
    }

    if (industryCheck('roofing company')) {
      setTimeout(() => {
        roofingStock(output, fulldata);
      }, 0);
    }
    let n = 1;

    classSelector('prodsizesfilter').innerHTML =
      '<select class="prodsizefilter"><option hidden>Filter by product size</option>' +
      Object.values(
        output.reduce((a, b) => {
          const size = b.prod_size.split(' ').join('').toLowerCase();
          if (size) {
            a[size] = size;
          } else {
            a[size] = size;
          }

          return a;
        }, {})
      )
        .filter(Boolean)
        .map((v) => {
          return `
      <option>${v}</option>
      `;
        })
        .join(' ') +
      '</select>';
  });

  classSelector('display-page').innerHTML = `
      <div class="dash-container mb-2">

      <div class="dash-row gap-3">
     
      <div class="hideondesktop mobile-cat-dropdown">
      
      ${dataListDropdown(
        textInput,
        'categorylistinpt',
        'Select category',
        '',
        'hyy67f',
        'categwrapper'
      )}
      
      </div>

      
      <div class="sidebar bgwhite prod-side-bar hideonmobile">
        <div class="scroll-wrapper">
        <div class="categories-searchbox"></div>
        <div>
          <button class="show-all-prod">Display all products</button>
        </div>

        <div class="prodsizesfilter"></div>
        <div>
   
        </div>
        <br />
        <div class="scroll-inner">
        
        <table cellspacing="0">
        <tbody class="products-categories">
        
        </tbody>
        </table>
        
        </div>
        </div>

      </div>

      <div class="cont">

      <div class="top-box">
        <div class="top-box-left"></div>
        <div class="top-box-middle"></div>
        <div class="top-box-right"></div>
      </div>

   
      <div class="secondbox-wrapper">
          <div class="produsts-btns">
          <div class="generate-preview-wrapper">
            ${Buttons([
              {
                btnclass: 'generatepreview',
                btnname: 'GENERATE PREVIEW',
              },
            ])}
            </div>


            <div class="add-product-wrapper">
    
            </div>
          
          </div>
          <div class="other-box"></div>
        </div>
        <div class="products-table-wrapper">
            <div class="products-table-inner">
            <table cellspacing="0">
            <thead class="products-table-header"></thead>
            </table>

            <table cellspacing="0">
            <tbody class="products-table-body-inner"></tbody>
            </table>
            
            </div>
               <div class="products-table-inner-pagination">
            
               </div>
        </div>
      </div>
      </div>
      </div>
      ${Modalboxone('', '')}
      `;
};
rerender(Products, 2);
export default Products;
