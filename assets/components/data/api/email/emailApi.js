import displayToast from '../../../utils/displayToast.js';
import Spinner from '../../../utils/Spinner.js';
import baseurl from '../baseUrl.js';

const emailApi = (obj, wrapper, content) => {

//   const obj = {
//     comp_name: '',
//     user_name: '',
//     user_phone: '',
//     user_email: '',
//     url: '',
//     type: '',
//     comp_location: '',
//   };

  Spinner(wrapper);
  fetch(`${baseurl}email`, {
    mode: 'no-cors',
    method: 'Post',
    body: JSON.stringify(obj),
  })
    .then((resp) => resp.text())
    .then((data) => {
      const mess = `Email sent to ${obj?.cust_email}`;
      document.querySelector(`.${wrapper}`).innerHTML = content;
      displayToast('lightgreen', mess);
    })
    .catch((err) => {
      displayToast('bgdanger', 'An error occured');
    });
};

export default emailApi;
