import Products from './Products.js';
import Dashboard from './Dashboard.js';
import Pos from './Pos.js';
import Settings from './Settings.js';
import Sms from './Sms.js';
import Users from './Users.js';
import Login from './Login.js';
import Forgotpassword from './Forgotpassword.js';
import Resetpassword from './Resetpassword.js';

import Navmenu from './navbar/Navmenu.js';
import contentModal from './utils/contentModal.js';
import contentPreview from './utils/contentPreview.js';
import { classSelector } from './utils/Selectors.js';
import Footer from './footer/Footer.js';
import Logout from './Logout.js';

const searchstring = new URLSearchParams(window.location.search);
const page = searchstring.get('page');

const Pages = () => {
  const searchstring = new URLSearchParams(window.location.search);
  const page = searchstring.get('page');

  const user = JSON.parse(localStorage.getItem('zsdf'));
  const menu_names = user?.menus
    .filter((v) => v.menu_parent === 'null')
    .map((v) => v.menu_name.toLowerCase());

  const pagess = {
    dashboard: menu_names.includes('dashboard') ? Dashboard : Dashboard,
    products: menu_names.includes('products') ? Products : Dashboard,
    sell: menu_names.includes('sell') ? Pos : Dashboard,
    settings: menu_names.includes('settings') ? Settings : Dashboard,
    sms: menu_names.includes('sms') ? Sms : Dashboard,
    users: menu_names.includes('users') ? Users : Dashboard,
    logout: Logout,
  };

  Navmenu(page);

  pagess[page]() || '';
};

if (localStorage.getItem('zsdf')) {
  classSelector('root').innerHTML = `
      <div class="display-navbar"></div>
      <div class="display-page"></div>
      ${Footer()}
      ${contentModal('', ``)}
  `;

  Pages();

  contentPreview();
} else {
  if (page === 'forgotpswd') {
    classSelector('root').innerHTML = Forgotpassword();
  } else if (page === 'resetpassword') {
    classSelector('root').innerHTML = Resetpassword();
  } else {
    classSelector('root').innerHTML = Login();
  }
}

window.onpopstate = function (e) {
  if (localStorage.getItem('zsdf')) {
    Pages();
  } else {
    classSelector('root').innerHTML = Login();
  }
};

document.addEventListener('click', (e) => {
  if (e.target.matches('.navlinks')) {
    const { navlinks } = e.target.dataset;
    history.pushState(null, '', navlinks);
    Pages(page);
  }
});
