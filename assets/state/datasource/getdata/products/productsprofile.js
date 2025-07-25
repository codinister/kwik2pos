import fetchApiUrl from '../../../../utils/fetchApiUrl.js';
import urlCode from '../../../../utils/urlCode.js';


const productsprofile = (callback) => {
  Promise.allSettled([
    fetch(fetchApiUrl('productsprofile', 'getStocks') + urlCode()).then(
      (resp) => resp.json()
    ),
    fetch(fetchApiUrl('productsprofile', 'getSoldProducts') + urlCode()).then(
      (resp) => resp.json()
    ),
  ])
    .then((value) => {
      const products = value[0].value;
      const sales = value[1].value;


      callback(products)

    })
    .catch((err) => console.log(err));
};

export default productsprofile;
