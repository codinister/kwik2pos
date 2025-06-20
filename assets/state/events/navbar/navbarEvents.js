import { classSelector } from '../../../utils/Selectors.js';
import updateLoginUser from '../../../utils/updateLoginUser.js';
import Spinner from '../../../utils/Spinner.js';
import displayToast from '../../../utils/displayToast.js';
import fetchApiUrl from '../../../utils/fetchApiUrl.js';
import getFileUpload from '../../../utils/getFileUpload.js';
import disabledButton from '../../../utils/disabledButton.js';

const navbarEvents = () => {
  document.addEventListener('click', (e) => {
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
      document.querySelector(`.sendsmsbx${ss_id}`).innerHTML = '';
    }

    if (e.target.matches('.userprofile')) {
      const obj = sessionStorage.getItem('userprofile');

      const signature = getFileUpload('signature');
      const photo = getFileUpload('photo');

      const fd = new FormData();
      fd.append('data', obj);
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

            classSelector('userprofile').innerHTML = disabledButton();

            classSelector('profileformbox').classList.add('hide');

            sessionStorage.setItem('rend', 246);
          }
        });
    }
  });
};

export default navbarEvents;
