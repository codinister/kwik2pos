import { classSelector } from '../../../utils/Selectors.js';
import defaultLoginValues from '../../../state/statemanagement/sessionstorage/default/defaultLoginValues.js';
import Spinner from '../../../utils/Spinner.js';
import fetchApiUrl from '../../../utils/fetchApiUrl.js';

const loginEvent = () => {
  document.addEventListener('input', (e) => {
    if (e.target.matches('.lgn')) {
      defaultLoginValues();
      const { name, value } = e.target;

      const jsn = JSON.parse(sessionStorage.getItem('loginvalues'));

      const obj = { ...jsn, [name]: value };

      sessionStorage.setItem('loginvalues', JSON.stringify(obj));

      const res = Object.values(
        JSON.parse(sessionStorage.getItem('loginvalues'))
      );

      const loginbtn = classSelector('login-btn');
      if (res.filter(Boolean).length > 1) {
        loginbtn.classList.remove('hide');
        loginbtn.classList.add('show');
      } else {
        loginbtn.classList.remove('show');
        loginbtn.classList.add('hide');
      }
    }
  });

  document.addEventListener('submit', (e) => {
    if (e.target.matches('.login-form')) {
      e.preventDefault();

      const obj = sessionStorage.getItem('loginvalues');

      const fd = new FormData();
      fd.append('data', obj);

      Spinner('output1');

      fetch(fetchApiUrl('login', 'signin'), {
        method: 'Post',
        body: fd,
      })
        .then((resp) => resp.text())
        .then((data) => {
          if (data.indexOf('error') != -1) {
            const output1 = classSelector('output1');
            output1.innerHTML = `<div class="error-warning">Invalid credentials!</div>`;
            setTimeout(() => {
              output1.textContent = '';
            }, 2000);
          } else {
            const obj = JSON.parse(data);

            sessionStorage.setItem('zsdf', JSON.stringify(obj));

            sessionStorage.removeItem('loginvalues')

            window.location.href = 'index.html?page=dashboard'

          
          }
        });
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.matches('.showppass')) {
      const password = classSelector('password');

      if (password.getAttribute('type') === 'password') {
        password.setAttribute('type', 'text');
      } else {
        password.setAttribute('type', 'password');
      }
    }
  });

  window.addEventListener('load', (e) => {
    if (sessionStorage.getItem('loginvalues')) {
      const jsn = Object.values(
        JSON.parse(sessionStorage.getItem('loginvalues'))
      );

      if (classSelector('username')) {
        classSelector('username').value = jsn[0];
        classSelector('password').value = jsn[1];
        if (jsn.filter(Boolean).length > 1) {
          classSelector('login-btn').classList.add('show');
        }
      }
    }
  });
};

export default loginEvent;
