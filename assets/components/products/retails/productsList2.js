const productsList = (obj) => {
  console.log(obj)
  return Object.values(obj)
    .sort((a, b) => {
      if (a.prod_name > b.prod_name) return 1;
      else if (a.prod_name < b.prod_name) return -1;
      return 0;
    })
    .map(
      (v) => `
        <tr class="products-table-body">

        <td>     
        <input type="checkbox" 
        data-prod_id="${v.prod_id}" 
        data-prod_name="${v.prod_name}" 
        data-prod_size="${v.prod_size}" 
        data-stock="${v.stock}"
        data-sold="${v.sold}"
        data-prod_qty="${v.prod_qty}"
        data-cat_name="${v.cat_name}"
        data-createdat="${v.qty_date}"
        data-selling_price="${v.selling_price}"
        data-type="Stocksreport"
        class="checkmark" />
        </td>

        <td>
        <a href="javascript:void(0);" style="color: black;" class="showprod" data-prod_id="${v.prod_id}">${v.prod_name}</a>
        </td>


        <td>${v.prod_qty}</td>
        <td>${v.prod_size}</td>

        <td class="action">
        <table>
        <tbody>
        <tr>

        <td>
        <i class="fa fa-pencil edit-prod" data-prod_id="${v.prod_id}" title="Edit"></i>
        </td>

        <td>
        <i class="fa fa-trash delete-prod" data-prod_id="${v.prod_id}" title="Delete"></i>
        </td>

        </tr>
        </tbody>
        </table>
        </td>
        </tr>
      `
    )
    .join(' ');
};

export default productsList;
