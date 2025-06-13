import defaultProductsSessionStorage from '../sessionstorage/default/defaultProductsSessionStorage.js';
import getProductsSessionStorage from '../sessionstorage/GET/getProductsSessionStorage.js';
import setProductsSessionStorage from '../sessionstorage/SET/setProductsSessionStorage.js';
import { ymd } from '../../../utils/DateFormats.js';

const productReducer = (e) => {
  if (e.target.matches('.prod-inpt')) {
    defaultProductsSessionStorage();

    const { name, value, id } = e.target;

    const obj = getProductsSessionStorage();

    if (e.target.matches('.prod_qty')) {
      const newobj = {
        ...obj,
        prod_qty_arr: {
          ...obj?.prod_qty_arr,
          [name]: {
            prod_qty: value,
            qty_id: obj?.prod_qty_arr[name]?.qty_id || '',
            createdAt: obj?.prod_qty_arr[name]?.createdAt || ymd(new Date()),
          },
        },
      };

      setProductsSessionStorage(newobj);
    } else {
      const newobj = { ...obj, [name]: value };
      setProductsSessionStorage(newobj);
    }
  }
};

export default productReducer;
