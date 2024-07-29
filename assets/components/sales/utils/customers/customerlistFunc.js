import deleteAccessControl from '../deleteAccessControl.js';

const customerlistFunc = (v) => {
  return `
  <div class="cust-list-box">


  <div class="custfullnamebx">
    <a href="javascript:void(0);" 
    data-cust_id="${v.cust_id}" 
    data-fullname = "${v.fullname}"
    data-phone = "${v.phone}"
    data-email = "${v.email}"
    data-location = "${v.location}"
    data-description = "${v.description}"
    data-type = "${v.typee}"
    data-user_id = "${v.user_id}"
    class="displaycustdetails" title= "Assigned to: ${v.firstname} ${
    v.lastname
  }">
    ${v.fullname}
    </a>
  </div>


  <div>
  <a href="javascript:void(0);">
  <i class="fa fa-pencil editcust"
    data-cust_id="${v.cust_id}" 
    data-fullname = "${v.fullname}"
    data-phone = "${v.phone}"
    data-email = "${v.email}"
    data-type = "${v.type}"
    data-location = "${v.location}"
    data-debt = "${v.debt}"
  ></i>
  </a>
  <a href="javascript:void(0);">
  ${deleteAccessControl(
    `<i class="fa fa-trash delt-cust"  
    data-cust_id="${v.cust_id}" 
    data-fullname = "${v.fullname}"
    ></i>`
  )}
  </a>
  </div>


</div>`;
};

export default customerlistFunc;
