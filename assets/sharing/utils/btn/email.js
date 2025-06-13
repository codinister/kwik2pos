import emailApi from '../../data/api/email/emailApi.js';

const email = (obj) => {
  document.addEventListener('click', (e) => {
    if (e.target.matches('.sendmail')) {
      emailApi(obj, 'sendmail-wrapper', '<i class="fa fa-envelope cred"></i>');
    }
  });

  if (obj?.cust_email.length > 0) {
    return `
  <div class="sendmail-wrapper">
    <i class="fa fa-envelope sendmail" title="Email to ${obj?.cust_email}"></i>
    </div>
    `;
  } else {
    return '';
  }
};

export default email;
