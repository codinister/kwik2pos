import Products from '../Products.js';
import Dashboard from '../Dashboard.js';
import Pos from '../Pos.js';
import Settings from '../Settings.js';
import Sms from '../Sms.js';
import Users from '../Users.js';
import Login from '../Login.js';
import Forgotpassword from '../Forgotpassword.js';
import Resetpassword from '../Resetpassword.js';

const pageHistory = () => {

  if (localStorage.getItem('zsdf')) {
    const user = JSON.parse(localStorage.getItem('zsdf'));

    const menu_names = user?.menus
      .filter((v) => v.menu_parent === 'null')
      .map((v) => v.menu_name.toLowerCase());

    const p = new URLSearchParams(window.location.search);
    const page = p.get('page');

    if (page === 'forgotpswd') {
      document.querySelector('.root').innerHTML = Forgotpassword();
    } else if (page === 'resetpassword') {
      document.querySelector('.root').innerHTML = Resetpassword();
    }  else if (!page) {
      document.querySelector('.root').innerHTML = Login();
    } else if (page === 'logout') {
      localStorage.removeItem('sales');
      localStorage.removeItem('prodlocalstorage');
      localStorage.removeItem('userlocalstorage');
      localStorage.removeItem('prozdlist');
      localStorage.removeItem('zsdf');
      localStorage.removeItem('nuser');
      localStorage.removeItem('stocks');
      localStorage.removeItem('qtys');
      localStorage.removeItem('soldinv');
      localStorage.removeItem('newrec');
      localStorage.removeItem('filterby');
      localStorage.removeItem('contract');
      localStorage.removeItem('custinp');
      localStorage.removeItem('custinfo');
      localStorage.removeItem('deletedproformas');
      localStorage.removeItem('deletedinvoices');
      localStorage.removeItem('deletedreceipt');
      localStorage.removeItem('prodlocalstorage');
      localStorage.removeItem('userprofile');
      localStorage.removeItem('usernote');
      localStorage.removeItem('settingupdate');

      history.pushState({page: ''}, '', '');

      document.querySelector('.root').innerHTML = Login();
    } else {
      const pages = {
        dashboard: menu_names.includes('dashboard') ? Dashboard : Dashboard,
        products: menu_names.includes('products') ? Products : Dashboard,
        sell: menu_names.includes('sell') ? Pos : Dashboard,
        settings: menu_names.includes('settings') ? Settings : Dashboard,
        sms: menu_names.includes('sms') ? Sms : Dashboard,
        users: menu_names.includes('users') ? Users : Dashboard,
      };

      pages[page]() || '';
    }
  }
  else{
    document.querySelector('.root').innerHTML = Login();
  }
};

export default pageHistory;
