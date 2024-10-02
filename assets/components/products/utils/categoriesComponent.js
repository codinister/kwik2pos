import { classSelector } from '../../utils/Selectors.js';
import productsList from '../rentals/productsList.js';
import categoryHTMLList from './categoryHTMLList.js';
import productSearchBox from './productSearchBox.js';

const categoriesComponent = (categories, stocks) => {
  document.addEventListener('click', (e) => {
    if (e.target.matches('.categorylistinpt')) {
      if (categories) {
        const catarr = categories
          .map((v) => categoryHTMLList(v, 'editrentalcat', 'deleterentalcat'))
          .join('');
        classSelector('categwrapper').innerHTML = catarr
      }
    }

    if (e.target.matches('.prodbycat')) {
      const { id } = e.target.dataset;

      classSelector('products-table-body-inner').innerHTML = productsList(
        Object.values(stocks).filter((v) => v.cat_id === id)
      );
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.target.matches('.categorylistinpt')) {
      const val = e.target.value;
      if (users) {
        const usersdata = users
          .filter((v) =>
            Object.values(v).join('').toLowerCase().includes(val.toLowerCase())
          )
          .slice(0, 10)
          .map((v) => usersIteratorFunc(v))
          .join('');
        classSelector('categwrapper').innerHTML = usersdata;
      }
    }

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

  if (classSelector('categories-searchbox')) {
    classSelector('categories-searchbox').innerHTML = productSearchBox(
      'Search Categories',
      'search-rental-cat'
    );
  }

  if (classSelector('products-categories')) {
    classSelector('products-categories').innerHTML = categories
      .map((v) => categoryHTMLList(v, 'editrentalcat', 'deleterentalcat'))
      .join(' ');
  }
};

export default categoriesComponent;
