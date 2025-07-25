import { classSelector } from '../../../utils/Selectors.js';
import Spinner from '../../../utils/Spinner.js';
import fetchApiUrl from '../../../utils/fetchApiUrl.js';
import innerHTML from '../../../utils/innerHTML.js';
import sessionGet from '../../sessionstorage/GET/sessionGet.js';
import sessionRemove from '../../sessionstorage/REMOVE/sessionRemove.js';
import sessionSet from '../../sessionstorage/SET/sessionSet.js';

const loginEvent = () => {
  document.addEventListener('input', (e) => {
    if (e.target.matches('.lgn')) {

      if (!sessionGet('loginvalues')) {

        sessionSet({
          statename: 'loginvalues',
          content: {
            username: '',
            password: '',
          },
        });
      }



      const { name, value } = e.target;
      const jsn = sessionGet('loginvalues');
      const obj = { ...jsn, [name]: value };
    
      sessionSet({
        statename: 'loginvalues',
        content: obj,
      });

      const res = sessionGet('loginvalues');
      const loginbtn = classSelector('login-btn');

      if (Object.values(res).filter(Boolean).length > 1) {
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

      const obj = sessionGet('loginvalues');
      const fd = new FormData();
      fd.append('data', JSON.stringify(obj));

      fetch(fetchApiUrl('login', 'signin'), {
        method: 'Post',
        body: fd,
      })
        .then((resp) => resp.text())
        .then((data) => {
          if (data.indexOf('error') != -1) {
            innerHTML({
              classname: 'output1',
              content: `<div class="error-warning">Invalid credentials!</div>`,
            });

            setTimeout(() => {
              innerHTML({
                classname: 'output1',
                content: '',
              });
            }, 2000);
          } else {

            Spinner('spinnerbox');

            const obj = JSON.parse(data);

            sessionSet({
              statename: 'zsdf',
              content: obj,
            });

            sessionRemove('loginvalues');

            window.location.href = 'index.html?page=dashboard';
            
          }
        });
    }
  });

  document.addEventListener('click', (e) => {

    if(e.target.matches('.lgn')){
e.target.removeAttribute('readonly')
    }

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
    if (sessionGet('loginvalues')) {
      const jsn = Object.values(sessionGet('loginvalues'));

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
