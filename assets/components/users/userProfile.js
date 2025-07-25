import { Input, FileUpload } from '../../utils/InputFields.js';
import getLoginuser from '../../state//sessionstorage/GET/getLoginuser.js';
import setPageState from '../../utils/setPageState.js';
import setButton from '../../utils/setButton.js';

const userProfile = () => {
  //Get user data
  const user = getLoginuser('user');

  //Define required fields
  const reqfields = ['firstname', 'lastname', 'phone', 'residence', 'email'];

  //Get required fields length
  const datalength = reqfields.length;

  //Populate the userprofile state
  setPageState('userprofile', user, reqfields);

  //Show button if userprofilerequired state is valid
  setTimeout(() => {
    setButton('userprofile', datalength);
  }, 1000);

  return `
      <div class="profileformbox">
          <div>
            ${Input({
              inputName: reqfields[0],
              labelName: 'First Name',
              required: 1,
              min: 1,
              stateName: 'userprofile',
              stateFields: datalength,
              value: user?.firstname,
            })}


            ${Input({
              inputName: reqfields[1],
              labelName: 'Last Name',
              required: 1,
              min: 1,
              stateName: 'userprofile',
              stateFields: datalength,
              value: user?.lastname,
            })}

            ${Input({
              inputName: reqfields[2],
              labelName: 'Phone',
              type: 'tel',
              required: 1,
              min: 10,
              stateName: 'userprofile',
              stateFields: datalength,
              value: user ? user?.phone : '',
            })}

            ${Input({
              inputName: reqfields[3],
              labelName: 'Residence',
              required: 1,
              min: 1,
              stateName: 'userprofile',
              stateFields: datalength,
              value: user?.residence,
            })}

            ${Input({
              inputName: reqfields[4],
              labelName: 'Email',
              type: 'email',
              required: 1,
              min: 1,
              stateName: 'userprofile',
              stateFields: datalength,
              value: user?.email,
            })}

  
             ${Input({
               inputName: 'password',
               labelName: 'Password',
               type: 'password',
               min: 6,
               value: user?.password,
               stateName: 'userprofile',
               stateFields: datalength,
             })}

          

            <div class="profile-upload-bx">
              ${FileUpload({
                inputName: 'pimg',
                labelName: 'Avatar',
                stateName: `userprofile`,
                stateFields: datalength,
                classname: 'photo',
              })}
              ${FileUpload({
                inputName: 'simg',
                labelName: 'Signature',
                stateName: 'userprofile',
                stateFields: datalength,
                classname: 'signature',
              })}
          </div>

          <div class="img-preview">
          <div>
              <img src="assets/uploads/${
                user ? user?.photo : ''
              }" alt="" class="pimg" />
          </div>
          <div>
              <img src="assets/uploads/${
                user ? user?.signature : ''
              }" alt="" class="simg" />
          </div>
          </div>
          <div class="userprofile"></div>
          </div>
          </div>
  
      </div>`;
};
export default userProfile;
