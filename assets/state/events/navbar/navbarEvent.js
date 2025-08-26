import { classSelector } from '../../../utils/Selectors.js';
import updateLoginUser from '../../../utils/updateLoginUser.js';
import Spinner from '../../../utils/Spinner.js';
import displayToast from '../../../utils/displayToast.js';
import fetchApiUrl from '../../../utils/fetchApiUrl.js';
import getFileUpload from '../../../utils/getFileUpload.js';
import disabledButton from '../../../utils/disabledButton.js';
import sessionGet from '../../sessionstorage/GET/sessionGet.js';
import sessionSet from '../../sessionstorage/SET/sessionSet.js';
import innerHTML from '../../../utils/innerHTML.js';

const navbarEvent = () => {
  document.addEventListener('click', (e) => {


if(e.target.matches('.logout')){
  //history.pushState(null,'', "?page=logout")

window.location.href="?page=logout"
}

    if (e.target.matches('.button-dropdown')) {
      e.target.classList.add('show');
    }

    if (!e.target.matches('.button-dropdown')) {
      if (classSelector('button-dropdown')) {
        document.querySelectorAll('.button-dropdown').forEach((v) => {
          v.classList.remove('show');
        });
      }
    }

    if (e.target.matches('.go-back')) {
      history.back();
    }
    if (e.target.matches('.dropdownitem')) {
      e.stopImmediatePropagation();
      e.target.classList.toggle('show-menu');
    }

    if (e.target.matches('.hamburger')) {
      classSelector('nav-overlay').classList.remove('hide');
      classSelector('nav-bar-wrapper').classList.remove('hide');
      classSelector('nav-overlay').classList.add('show');
      classSelector('nav-bar-wrapper').classList.add('show');
    }

    if (e.target.matches('.nav-overlay')) {
      classSelector('nav-overlay').classList.remove('show');
      classSelector('nav-bar-wrapper').classList.remove('show');
      classSelector('nav-overlay').classList.add('hide');
      classSelector('nav-bar-wrapper').classList.add('hide');
    }

    if (e.target.matches('.profileimage')) {
      classSelector('profileformbox').classList.remove('hide');
      classSelector('profileformbox').classList.toggle('show');
    }

    if (e.target.matches('.alert-rounded')) {
      document.querySelector('.expiries-wrapper').classList.add('show');
    }

    if (e.target.matches('.close-expiry-wrapper')) {
      document.querySelector('.expiries-wrapper').classList.remove('show');
    }

    if (e.target.matches('.closesmsbx')) {
      const { ss_id } = e.target.dataset;

      innerHTML({
        classname: `.sendsmsbx${ss_id}`,
        content: '',
      });
    }

    if (e.target.matches('.userprofile')) {
      const obj = sessionGet('userprofile');

      const signature = getFileUpload('signature');
      const photo = getFileUpload('photo');

      const fd = new FormData();
      fd.append('data', JSON.stringify(obj));
      fd.append('signatureupld', signature);
      fd.append('photoupld', photo);

      Spinner('userprofile');

      fetch(fetchApiUrl('user', 'update_profile'), {
        method: 'Post',
        body: fd,
      })
        .then((resp) => resp.text())
        .then((data) => {
          if (data.indexOf('error') != -1) {
            displayToast('bgdanger', data);
          } else {
            displayToast('lightgreen', 'Profile Updated!');

            updateLoginUser('user', JSON.parse(data), 'userprofile');

            innerHTML({
              classname: 'userprofile',
              content: disabledButton(),
            });

            classSelector('profileformbox').classList.add('hide');

            sessionSet({
              statename: 'rend',
              content: 246,
            });
          }
        });
    }
  });
};

export default navbarEvent;
