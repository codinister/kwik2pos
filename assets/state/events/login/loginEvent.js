import Error from '../../../utils/Error.js';
import Spinner from '../../../utils/Spinner.js';
import fetchApiUrl from '../../../utils/fetchApiUrl.js';
import innerHTML from '../../../utils/innerHTML.js';
import sessionGet from '../../sessionstorage/GET/sessionGet.js';
import sessionRemove from '../../sessionstorage/REMOVE/sessionRemove.js';
import sessionSet from '../../sessionstorage/SET/sessionSet.js';

const loginEvent = () => {
  document.addEventListener('submit', (e) => {
    if (e.target.matches('.login-form')) {
      e.preventDefault();

      const obj = sessionGet('login');

      if (Object.values(obj).filter(Boolean).length < 2) {
        Spinner('login-btn');
        Error('login-btn', 'All fields required!', 'LOG IN');
        return;
      }

      const fd = new FormData();
      fd.append('data', JSON.stringify(obj));

      fetch(fetchApiUrl('login', 'signin'), {
        method: 'Post',
        body: fd,
      })
        .then((resp) => resp.text())
        .then((data) => {
          if (data.indexOf('error') != -1) {
            Spinner('login-btn');
            Error('login-btn', 'Invalid credentials!', 'LOG IN');
          } else {
            Spinner('login-btn');
            const obj = JSON.parse(data);
            sessionSet({
              statename: 'zsdf',
              content: obj,
            });

            sessionRemove('login');

            window.location.href = 'index.html?page=dashboard';
          }
        });
    }
  });
};

export default loginEvent;
