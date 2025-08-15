import usersEvent from '../state/events/pages/usersEvent.js';
import CompanyDetails from '../utils/CompanyDetails.js';
import table from '../utils/table/table.js';
const Users = () => {
  usersEvent();
  return `
    <div class="users-wrapper">

      <div>

        <div>
          <div>
            ${CompanyDetails({
              title: 'Manage Users',
              desc: '',
            })}
          </div>
          <div>
            <button>Usage: 1/5 <i class="fa fa-circle-o-notch"></i></button>
            <button
                 data-modal="modal-one"  
        class="show-modal usermodalbox"
            >
            <i class="fa fa-user"></i>
            Add User
            </button>
          </div>
        </div>



        <div>
        ${table({
          thClass: 'users-table-head',
          tbClass: 'users-table-body',
          pagClass: 'users-table-pagination',
          searchClass: 'users-search-box',
          otherdetails: '<strong class="total-users"></strong>',
          custWrapperClass: 'all-users-wrapper',
        })}
        </div>



      </div>

    </div>
  `;
};

export default Users;
