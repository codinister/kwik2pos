const productsList = (obj) => {
  return Object.values(obj)
    .sort((a, b) => {
      if (a.prod_name > b.prod_name) return 1;
      else if (a.prod_name < b.prod_name) return -1;
      return 0;
    })
    .map(
      (v) => `
        <ul class="products-table-body">
        <li>  
        <span>    
        <input type="checkbox" 
        data-prod_id="${v.prod_id}" 
        data-prod_name="${v.prod_name}" 
        data-prod_size="${v.prod_size}" 
        data-stock="${v.stock}"
        data-sold="${v.sold}"
        data-prod_qty="${v.prod_qty}"
        data-available="${v.remaining}"
        data-cat_name="${v.cat_name}"
        data-selling_price = "${v.selling_price}"

        data-type="Stocks"
        class="checkmark" />
        </span>
        <span>
        <a href="javascript:void(0);" style="color: black;" class="showprod" data-prod_id="${v.prod_id}">${v.prod_name}</a>
        </span>
        </li>


        <li>${v.remaining}</li>
        <li>${v.prod_size}</li>

        <li class="action">
        <i class="fa fa-pencil edit-prod" data-prod_id="${v.prod_id}" title="Edit"></i>
            <i class="fa fa-trash delete-prod" data-prod_id="${v.prod_id}" title="Delete"></i>
        </li>
        </ul>
      `
    )
    .join(' ');
};

export default productsList;
