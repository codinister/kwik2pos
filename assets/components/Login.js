import loginEvent from '../state/events/login/loginEvent.js';
import { Button, Input } from '../utils/InputFields.js';

const Login = () => {
  loginEvent();

  return `
  <div class="login-wrapper">

    <div>
      <div>
        <div>
          <h4>Kwiktul</h4>
          <p>Fast and easy invoicing system</p>
        </div>
        <div>
         <form autocomplet="off" class="login-form">
            ${Input({
              inputName: 'username',
              labelName: 'Username',
              required: 1,
              min: 1,
              stateName: 'login',
              stateFields: '',
            })}

            ${Input({
              inputName: 'password',
              labelName: 'Password',
              type: 'password',
              min: 6,
              stateName: 'login',
              stateFields: '',
            })}

            <a href="javascript:void(0)" class="forgot-pass">Reset password ?</a>
            
            <div class="err-res">
            ${Button({
              classname: 'login-btn',
              buttonname: 'Log in',
            })}
            </div>
         </form>
        </div>
      </div>
    </div>
    <div
      style="
      background-size: cover; 
      background-position: center;
      background-image: url('assets/images/cover.jpg');
      "
    >
    </div>
  </div>
    `;
};

export default Login;
