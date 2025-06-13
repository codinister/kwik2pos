import { ymd } from '../../../../utils/DateFormats.js';

const defaultProductsSessionStorage = () => {
  const date = new Date();
  if (!sessionStorage.getItem('prodsessionstorage')) {
    sessionStorage.setItem(
      'prodsessionstorage',
      JSON.stringify({
        cat_id: '',
        cat_name: '',
        createdAt: ymd(date),
        prod_code: '',
        prod_id: '',
        prod_image: '',
        prod_name: '',
        prod_qty: '',
        prod_qty_arr: {
          prod_qty: {
            prod_qty: '',
            qty_id: '',
            createdAt: ymd(date),
          },
        },
        prod_size: '',
        selling_price: '',
      })
    );
  }
};

export default defaultProductsSessionStorage;
