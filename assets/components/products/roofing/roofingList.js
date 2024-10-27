const roofingList = (obj) => {
  return Object.values(obj)
    .sort((a, b) => {
      if (a.prod_name > b.prod_name) return 1;
      else if (a.prod_name < b.prod_name) return -1;
      return 0;
    })
    .map(
      (v) => `
        <tr class="service-table-body">


        <td>  
        <input type="checkbox" 
        data-prod_id="${v.prod_id}" 
        data-prod_name="${v.prod_name}" 
        data-cat_name="${v.cat_name}"
        data-selling_price="${v.selling_price}"
        data-type="Roofing"
        class="checkmark" />
        </td>


        <td>
        <a href="javascript:void(0);" style="color: black;" class="showroofing" data-prod_id="${v.prod_id}">${v.prod_name}</a>

        </td>


        <td>${v.selling_price}</td>

        <td>
        <table>
        <tbody>
        <tr>

        <td class="action">
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

export default roofingList;
