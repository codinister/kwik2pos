import { textInput, Button } from '../utils/InputFields.js';
import loginEvent from '../state/events/login/login.js';

const Login = () => {
  loginEvent();

  return `
  <div class="login-wrapper" 
  style="
  background-size: cover; 
  background-position: center;
  background-image: url('assets/images/cover.jpg');
  ">

  <div class="login-inner">
  <form autocomplet="off" class="login-form">
  <div class="comp_name">
  <h4 class="compnamex">KWIK POS</h4>
  <p>Sign in with your valid username and password</p>
  </div>

  ${textInput({
    type: 'text',
    classname: 'username lgn',
    required: true,
    name: 'username',
    label: 'Username',
  })}
    
  <div class="form-group  pt-0 input-animate">	
  <input type="password" placeholder="" class="fminpt form-control lgn password" readonly required  name="password">
  <label>Password</label>
  <i class="fa fa-eye showppass"></i>
  </div>

  <a href="javascript:void(0);" class=" forgot-pass">Reset Password?</a>

  ${Button({
    output: 'output1',
    classname: 'login-btn',
    buttonname: 'LOG IN',
    buttonType: 'submit',
  })}

  </form>
  </div>
  </div>

    `;
};

export default Login;
