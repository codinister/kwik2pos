import { formatDate } from '../../../../utils/DateFormats.js';
import tableDropdown from '../../../../utils/table/tableDropdown.js';

const usersTableList = (v) => {
  const dropdown = `
      <li>
      <button
      data-user_id="${v.user_id}"
      class="user-permission"
      >
      <i class="fa fa-user"></i> Update Permissions 
      </button>
      </li>
      <li>
      <button
      data-modal="modal-two"
      class="show-modal edit-user"
      >
      <i class="fa fa-pencil"></i> Edit 
      </button>
      </li>
      <li>
      <button
      data-modal="modal-three"
      class="show-modal delete-user"
      >
      <i class="fa fa-trash"></i> Delete
      </button>
      </li>
  `;

  return `<tr> 
          <td>${v.firstname + ' ' + v.lastname}</td>
          <td>${v.email}</td>
          <td>${v.role_id}</td>
          <td>${formatDate(v.createdAt)}</td>
          <td>${tableDropdown(dropdown)}</td>
        </tr>
        `;
};

export default usersTableList;
