import userForm from '../../../components/users/userForm.js';
import innerHTML from '../../../utils/innerHTML.js';
import successAlert from '../../../utils/successAlert.js';
import tableDataSearch from '../../../utils/table/tableDataSearch.js';
import warningMessage from '../../../utils/warningMessage.js';
import usersTableList from '../../datasource/domupdate/users/usersTableList.js';

const usersEvent = (data) => {


  if(data){

  document.addEventListener('click', (e) => {
    if (e.target.matches('.user-permission')) {
      e.stopImmediatePropagation();
      const { user_id } = e.target.dataset;
      if (data) {
        const user = Object.values(data).filter((v) => v.user_id === user_id)[0];

        sessionStorage.setItem('permission', JSON.stringify(user))

        window.location.href="?page=userpermissions"
      }
    }

    if (e.target.matches('.usermodalbox')) {
      innerHTML({ classname: 'modal-box', content: userForm() });
    }

    if (e.target.matches('.user-permissions')) {
      innerHTML({ classname: 'modal-box', content: successAlert() });
    }
    if (e.target.matches('.edit-user')) {
      innerHTML({ classname: 'modal-box', content: userForm() });
    }
    if (e.target.matches('.delete-user')) {
      innerHTML({ classname: 'modal-box', content: warningMessage() });
    }
  });

  document.addEventListener('input', (e) => {
    if (e.target.matches('.users-search-box')) {
      const { value } = e.target;

      const datalist = data
        .map((v) => v)
        .flat(2)
        .filter((v) =>
          Object.values(v).join(' ').toLowerCase().includes(value.toLowerCase())
        );

      tableDataSearch({
        datalist,
        listFn: usersTableList,
        thClass: 'users-table-head',
        thData: ['Name', 'Email', 'Role', 'Date', 'Action'],
        tbClass: 'users-table-body',
        pagClass: 'users-table-pagination',
        value,
      });
    }
  });

}
};

export default usersEvent;
