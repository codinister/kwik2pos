import { classSelector } from '../../utils/Selectors.js';
import productsList from '../rentals/productsList.js';
import categoryHTMLList from './categoryHTMLList.js';
import productSearchBox from './productSearchBox.js';

const categoriesComponent = (categories, stocks) => {


  document.addEventListener('click', (e) => {
    if (e.target.matches('.prodbycat')) {
      const { id } = e.target.dataset;

      classSelector('products-table-body-inner').innerHTML = productsList(
        Object.values(stocks).filter((v) => v.cat_id === id)
      );
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.target.matches('.search-rental-cat')) {
      const { value } = e.target;
      classSelector('products-categories').innerHTML = categories
        .filter((v) =>
          Object.values(v).join(' ').toLowerCase().includes(value.toLowerCase())
        )
        .map((v) => categoryHTMLList(v, 'editrentalcat', 'deleterentalcat'))
        .join(' ');
    }
  });

  classSelector('categories-searchbox').innerHTML = productSearchBox(
    'Search Categories',
    'search-rental-cat'
  );

  classSelector('products-categories').innerHTML = categories
    .map((v) => categoryHTMLList(v, 'editrentalcat', 'deleterentalcat'))
    .join(' ');
};

export default categoriesComponent;
