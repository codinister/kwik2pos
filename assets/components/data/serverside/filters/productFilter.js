import { expdate_left } from '../../../utils/DateFormats.js';

const rentalsFilter = (product, sale) => {
  /*
   * ALL PRODUCTS
   */
  const products = product
    .map((v) => ({
      ...v,
      prod_qty_arr: [
        {
          qty_id: v.qty_id,
          prod_qty: v.prod_qty,
          createdAt: v.qty_date,
        },
      ],
      pq: v.prod_qty,
      prod_qty: Number(v.prod_qty),
    }))
    .reduce((a, b) => {
      if (a[b.prod_id]) {
        a[b.prod_id].prod_qty += Number(b.prod_qty);
        a[b.prod_id].prod_qty_arr.push({
          qty_id: b.qty_id,
          prod_qty: b.prod_qty,
          createdAt: b.qty_date,
        });
      } else {
        a[b.prod_id] = b;
      }
      return a;
    }, {});

  /*
   * ALL SALES
   */
  const sales = sale
    .filter((v) => expdate_left(v.exp_date) > 0)
    .map((v) => ({ ...v, qty: Number(v.qty) }))
    .reduce((a, b) => {
      if (a[b.prod_id]) {
        a[b.prod_id].qty += Number(b.qty);
      } else {
        a[b.prod_id] = b;
      }
      return a;
    }, {});

  /*
   * BEGIN STOCK
   */
  const stocks = Object.values(products);

  /*
   * BEGIN RENTED
   */
  const rented = Object.values(sales)
    .map((v) => {
      const prd = products[v.prod_id] ? products[v.prod_id] : false;
      const stk = Number(prd?.prod_qty);
      const sold = Number(stk) < Number(v.qty) ? stk : v.qty;
      return {
        createdAt: v.createdAt,
        prod_id: v.prod_id,
        prod_name: v.prod_name,
        prod_size: prd ? prd?.prod_size : '',
        prod_code: prd ? prd?.prod_code : '',
        cat_name: prd ? prd?.cat_name : '',
        cat_id: prd ? prd?.cat_id : '',
        prod_qty: Number(v.qty),
        exp_date: v.exp_date,
        prod_image: prd ? prd?.prod_image : '',
        selling_price: prd ? prd?.selling_price : '',
        prod_qty_arr: prd ? prd?.prod_qty_arr : '',
        cust_id: v.cust_id,
        fullname: v.fullname,
        available: expdate_left(v.exp_date) < 1,
        sold,
      };
    })
    .filter((v) => v.available === false);

  /*
   * BEGIN AVAILABLE
   */

  const availables = Object.values(products).map((v) => {
    const sold = sales[v.prod_id] ? sales[v.prod_id]?.qty : 0;
    const sold_qty = Number(sold) > Number(v.prod_qty) ? v.prod_qty : sold;
    return {
      ...v,
      remaining: Number(v.prod_qty) - Number(sold_qty),
    };
  });

  return { stocks, rented, availables };
};

const serviceFilter = (products) => {
  return products;
};

const roofingFilter = (roofing) => {
  return roofing;
};

const retailsFilter = (product, sale) => {
  const sales = [...sale]
    .map((v) => {
      return {
        ...v,
        qty: Number(v.qty),
      };
    })
    .reduce((a, b) => {
      if (a[b.prod_id]) {
        a[b.prod_id].qty += Number(b.qty);
      } else {
        a[b.prod_id] = b;
      }

      return a;
    }, {});

  /*
   * ALL PRODUCTS
   */
  const products = [...product]
    .map((v) => ({
      ...v,
      prod_qty_arr: [
        {
          prod_id: v.prod_id,
          qty_id: v.qty_id,
          prod_qty: v.prod_qty,
          createdAt: v.qty_date,
        },
      ],
      pq: v.prod_qty,
      prod_qty: Number(v.prod_qty),
    }))
    .reduce((a, b) => {
      if (a[b.prod_id]) {
        a[b.prod_id].prod_qty += Number(b.prod_qty);
        a[b.prod_id].prod_qty_arr.push({
          prod_id: b.prod_id,
          qty_id: b.qty_id,
          prod_qty: b.prod_qty,
          createdAt: b.qty_date,
        });
      } else {
        a[b.prod_id] = b;
      }
      return a;
    }, {});

  const stocks = Object.values(products).map((v) => {
    const sell = sales[v.prod_id] ? sales[v.prod_id]?.qty : 0;
    const calcsell = Number(sell) > Number(v.prod_qty) ? v.prod_qty : sell;
    return {
      ...v,
      stock: v.prod_qty,
      sold: calcsell,
      remaining: Number(v.prod_qty) - Number(calcsell),
    };
  });

  return stocks;
};

export { rentalsFilter, retailsFilter, roofingFilter, serviceFilter };
