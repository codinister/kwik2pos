import CompanyDetails from '../utils/CompanyDetails.js';
import goBack from '../utils/goBack.js';
import dataList from '../utils/dataList.js';
import { Button, Input } from '../utils/InputFields.js';

const Userpermissions = () => {
  const user = JSON.parse(sessionStorage.getItem('permission'));

  return `
  <div class="userpermissions">


    <div>
    <div>
      ${CompanyDetails({
        title: 'Edit Permissions',
        desc: '',
      })}
    </div>
    <div>
      ${goBack()}
    </div>
    </div>





    <div>

      <div>
        <i class="fa fa-user"></i> 
        <span>${user?.firstname} ${user?.lastname}</span>
      </div>


      <div>
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

          inputName: 'role',
          labelName: 'Role',
        })}

        


        <div class="checkbox-wrapper">
        <h5>Analytics & Reports</h5>

        <div>
        <div>
          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Access Analytics',

            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}
        </div>
        </div>
        </div>





        <div class="checkbox-wrapper">
        <h5>business settings</h5>
        
        <div>
        <div>
          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Access Business Settings',

            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}
        </div>

         <div>
          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Edit/Update Business Settings',

            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}

        </div>

        </div>
    </div>


        
        <div class="checkbox-wrapper">
        <h5>customers</h5>

        <div>
        <div>
          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Access Customers',

            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}

          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Message Customers',

            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}
        </div>

         <div>
          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Add Customers',

            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}

          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Edit/Update Customers',

            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}
        </div>
    </div>
        </div>




        
        <div class="checkbox-wrapper">
        <h5>Expenses</h5>


        <div>
        <div>
          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Access Expenses',

            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}

          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Access Purchase Orders',

            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}

          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Add Suppliers',

            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}

          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Edit/Update Expenses',

            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}

          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Edit/Update Suppliers',

            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}
        </div>

         <div>
            ${Input({
              inputName: '',
              type: 'checkbox',
              className: 'checkbox-control',
              labelName: 'Access Suppliers',

              min: 1,
              stateName: 'usrs',
              stateFields: '',
              value: '',
            })}

            ${Input({
              inputName: '',
              type: 'checkbox',
              className: 'checkbox-control',
              labelName: 'Add Expenses',

              min: 1,
              stateName: 'usrs',
              stateFields: '',
              value: '',
            })}

            ${Input({
              inputName: '',
              type: 'checkbox',
              className: 'checkbox-control',
              labelName: 'Add Purchase Orders',

              min: 1,
              stateName: 'usrs',
              stateFields: '',
              value: '',
            })}


          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Edit/Update Purchase Orders',

            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}

             </div>
        </div>
        </div>



<div class="checkbox-wrapper">
        <h5>inventory</h5>


        <div>
        <div>
          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Access Products',
            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}

          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Access Damages & Loss',
            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}

          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Add Raw Materials',
            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}

          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Edit/Update Products',
            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}

          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Edit/Update Raw Materials',
            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}
        </div>

         <div>
            ${Input({
              inputName: '',
              type: 'checkbox',
              className: 'checkbox-control',
              labelName: 'Access Raw Materials',
              min: 1,
              stateName: 'usrs',
              stateFields: '',
              value: '',
            })}

            ${Input({
              inputName: '',
              type: 'checkbox',
              className: 'checkbox-control',
              labelName: 'Add Products',
              min: 1,
              stateName: 'usrs',
              stateFields: '',
              value: '',
            })}

            ${Input({
              inputName: '',
              type: 'checkbox',
              className: 'checkbox-control',
              labelName: 'Add Damages & Loss',
              min: 1,
              stateName: 'usrs',
              stateFields: '',
              value: '',
            })}


          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Edit/Update Damages & Loss',
            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}

        </div>
        </div>
        </div>



      <div class="checkbox-wrapper">
        <h5>sales & orders</h5>


        <div>
        <div>
          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Access Sales',
            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}

          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Access Orders',
            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}

          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Create Sale Orders',
            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}

          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Edit/Update Orders',
            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}

          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Record Sale Payments',
            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}
        </div>

         <div>
            ${Input({
              inputName: '',
              type: 'checkbox',
              className: 'checkbox-control',
              labelName: 'Access Sales Payment Received',
              min: 1,
              stateName: 'usrs',
              stateFields: '',
              value: '',
            })}

            ${Input({
              inputName: '',
              type: 'checkbox',
              className: 'checkbox-control',
              labelName: 'Access Payouts',
              min: 1,
              stateName: 'usrs',
              stateFields: '',
              value: '',
            })}

            ${Input({
              inputName: '',
              type: 'checkbox',
              className: 'checkbox-control',
              labelName: 'Create Invoice / Receipt',
              min: 1,
              stateName: 'usrs',
              stateFields: '',
              value: '',
            })}


          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Edit/Update Sales',
            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}

        </div>
        </div>
        </div>




        
        <div class="checkbox-wrapper">
        <h5>services</h5>
        <div>
        <div>
          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Access Services',
            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}

          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Edit/Update Services',
            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}
        </div>

         <div>
          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Add Services',
            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}

        </div>
    </div>
        </div>



        
        <div class="checkbox-wrapper">
        <h5>subscriptions</h5>
        <div>
        <div>
          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Access Subscriptions',
            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}

        </div>

         <div>
          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Edit/Update Subscriptions',
            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}

        </div>
    </div>
        </div>



        
        <div class="checkbox-wrapper">
        <h5>team members</h5>

        <div>
        <div>
          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Access Team Members',
            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}

          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Edit/Update Team Members',
            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}
        </div>

         <div>
          ${Input({
            inputName: '',
            type: 'checkbox',
            className: 'checkbox-control',
            labelName: 'Add Team Members',
            min: 1,
            stateName: 'usrs',
            stateFields: '',
            value: '',
          })}

        </div>
        </div>

    </div>



      </div>
    </div>

      ${Button({
          classname: 'save-businessprofile',
          buttonname: 'Save',
        })}

  </div>
  `;
};

export default Userpermissions;
