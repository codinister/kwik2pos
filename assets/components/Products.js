import productsprofile from './data/serverside/fetch/productsprofile.js';
import Modalboxone from './utils/Modalboxone.js';
import { classSelector } from './utils/Selectors.js';
import rerender from './utils/rerender.js';
import getIndustry from './utils/getIndustry.js';
import rentalsStock from './products/rentals/rentalsStock.js';
import availableProduct from './products/rentals/available.js';
import rentedProducts from './products/rentals/rented.js';
import retailsStock from './products/retails/retailStock.js';
import serviceStock from './products/services/serviceStock.js';
import Buttons from './utils/Buttons.js';
import productsLocalstorage from './data/clientside/localstorage/default/defaultProductsLocalstorage.js';
import editCatForm from './products/utils/editCatForm.js';
import roofingStock from './products/roofing/roofingStock.js';
import dataListDropdown from './utils/dataListDropdown.js';

import { textInput } from './utils/InputFields.js';

const Products = () => {
  const industry = getIndustry();

  document.addEventListener('click', (e) => {
    if (e.target.matches('.edit-prod-cat')) {
      if (!localStorage.getItem('prodlocalstorage')) {
        productsLocalstorage();
      }

      const { cat_name, cat_id } = e.target.dataset;

      const obj = JSON.parse(localStorage.getItem('prodlocalstorage'));
      obj['cat_name'] = cat_name;
      obj['cat_id'] = cat_id;
      localStorage.setItem('prodlocalstorage', JSON.stringify(obj));

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
            localStorage.setItem('rend', 2);
          });
      } else {
      }
    }

    if (e.target.matches('.generatepreview')) {
      let arr = [];
      document.querySelectorAll('.checkmark').forEach((v) => {

        if (v.checked) {
          arr.push({
            prod_id: v.dataset.prod_id,
            prod_name: v.dataset.prod_name,
            prod_size: v.dataset.prod_size,
            prod_qty: v.dataset.prod_qty,
            cat_name: v.dataset.cat_name,
            type: v.dataset?.type,
            rented: v.dataset?.rented ? v.dataset?.rented : '',
            sold: v.dataset?.sold ? v.dataset?.sold : '',
            available: v.dataset?.available ? v.dataset?.available : '',
       
            exp_date: v.dataset?.exp_date ? v.dataset?.exp_date : '',
            createdAt: v.dataset?.createdat ? v.dataset?.createdat : '',

            selling_price: v.dataset?.selling_price
              ? v.dataset?.selling_price
              : '',
            selling_price: v.dataset?.selling_price
              ? v.dataset?.selling_price
              : '',
          });
        }
      });

      const fd = new FormData();
      fd.append('stocks', JSON.stringify(arr));

      let baseUrl =
        arr[0].type === 'Stock List'
          ? 'stocks.php'
          : arr[0].type === 'Available List'
          ? 'stocks.php'
          : arr[0].type === 'Services'
          ? 'service.php'
          : arr[0].type === 'Rented List'
          ? 'rented.php'
          : arr[0].type === 'Stocks'
          ? 'retail.php'
          : arr[0].type === 'Stocksreport'
          ? 'stocksreport.php'
          : arr[0].type === 'Roofing'
          ? 'roofing.php'
          : '';

      fetch(`router.php?controller=products&task=stocks`, {
        method: 'Post',
        body: fd,
      })
        .then((resp) => resp.text())
        .then((data) => {
          window.location = `assets/pdf/stocks/${baseUrl}`;
        });
    }
  });


  

  productsprofile((output) => {
    document.addEventListener('change', (e) => {
      if (e.target.matches('.checkall')) {
        if (e.target.checked) {
          classSelector('generatepreview').classList.add('show');
          Array.from(document.querySelectorAll('.checkmark')).forEach((v) => {
            v.checked = true;
          });
        } else {
          classSelector('generatepreview').classList.remove('show');
          Array.from(document.querySelectorAll('.checkmark')).forEach((v) => {
            v.checked = false;
          });
        }
      }

      if (e.target.matches('.checkmark')) {
        let arr = [];
        const somechecked = document
          .querySelectorAll('.checkmark')
          .forEach((v) => {
            if (v.checked) {
              arr.push(1);
            }
          });

        if (arr.length > 0) {
          classSelector('generatepreview').classList.add('show');
        } else {
          classSelector('generatepreview').classList.remove('show');
        }
      }

      if (e.target.matches('.products-type')) {
        const { value } = e.target;

        if (value === 'available') {
          availableProduct(output);
        } else if (value === 'rented') {
          rentedProducts(output);
        } else {
          rentalsStock(output);
        }
      }
    });

    if (industry === 'rentals') {
      setTimeout(() => {
        rentalsStock(output);
      }, 0);
    }

    if (industry === 'retails') {
      setTimeout(() => {
        retailsStock(output);
      }, 0);
    }

    if (industry === 'service provider') {
      setTimeout(() => {
        serviceStock(output);
      }, 0);
    }

    if (industry === 'roofing company') {
      setTimeout(() => {
        roofingStock(output);
      }, 0);
    }
  });

  classSelector('display-page').innerHTML = `
      <div class="dash-container mb-2">

      <div class="dash-row gap-3">
<br /> <br />
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
        <div class="scroll-inner">
        
        <table cellspacing="0">
        <tbody class="products-categories"></tbody>
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
        </div>

      </div>
      </div>
      </div>
      ${Modalboxone('', '')}
      `;

};
rerender(Products, 2);
export default Products;
