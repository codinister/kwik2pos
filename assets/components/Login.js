
import loginEvent from '../state/events/login/loginEvent.js';

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

  <div class="login-form-group">	
  <input type="text" placeholder="" class="username lgn" readonly   name="username">
  <label>Username</label>
  </div>

    
  <div class="login-form-group">	
  <input type="password" placeholder="" class=" password lgn" readonly   name="password">
  <label>Password</label>
  <i class="fa fa-eye showppass"></i>
  </div>

  <a href="javascript:void(0)" class="forgot-pass">Reset password ?</a>

  <div class="output1"></div>

  <div class="spinnerbox">
  <button class="login-btn">LOG IN</button>
  </div>

  </form>
  </div>
  </div>

    `;
};

export default Login;
