import dataList from '../../utils/dataList.js';
import { Button, Input } from '../../utils/InputFields.js';

const userForm = () => {
  return `
    <div class="user-form">

    <div class="user-form-caption">
      <div>
      <i class="fa fa-user"></i>
      </div>
      <div>
      <h5>User Information</h5>
      <p>Use the form below to sent invitation to new members.</p>

      </div>
    </div>


      ${Input({
        inputName: '',
        labelName: 'First Name',
        required: 1,
        min: 1,
        stateName: 'usrs',
        stateFields: '',
        value: '',
      })}

      ${Input({
        inputName: '',
        labelName: 'Last Name',
        required: 1,
        min: 1,
        stateName: 'usrs',
        stateFields: '',
        value: '',
      })}


      ${dataList({
        data: [
          {
            name: 'Manager',
            id: '1',
          },
          {
            name: 'Sales Representative',
            id: '2',
          },
          {
            name: 'Accountant/Bookkeeper',
            id: '3',
          },
          {
            name: 'Customer Service Representative',
            id: '4',
          },
        ],
        state: 'users',
        required: 1,
        inputName: 'role',
        labelName: 'Role',
      })}



      ${Input({
        inputName: '',
        labelName: 'User name',
        required: 1,
        min: 1,
        stateName: 'usrs',
        stateFields: '',
        value: '',
      })}

      ${Input({
        inputName: 'password',
        labelName: 'Password',
        type: 'password',
        min: 6,
        value: '',
        stateName: 'usrs',
        stateFields: '',
      })}


      
        ${Button({
          classname: 'save-businessprofile',
          buttonname: 'Save Changes',
        })}

    </div>
  `;
};

export default userForm;
