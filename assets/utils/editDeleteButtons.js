
import roleAccess from './roleAccess.js';

const editDeleteButtons = (editClassName, deltClassName, id) => {


  if (roleAccess()) {
    return `
	<div class="edit-delete">
	  <i class="fa fa-edit edit-record ${editClassName}" title="EDIT"  data-id="${id}"></i>
	  <i class="fa fa-trash delete-record ${deltClassName}" title="DELETE" data-id="${id}"></i>
	</div>
	`;
  } else {
    return `
	<div class="edit-delete">
	  <i class="fa fa-lock"></i>
	  <i class="fa fa-lock"></i>
	</div>
	`;
  }
};

export default editDeleteButtons;
