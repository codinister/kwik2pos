import Dashboard from './Dashboard.js';
import Analytics from './Analytics.js';
import Activitylogs from './Activitylogs.js';
import Salesreport from './Salesreport.js';
import Profitandloss from './Profitandloss.js';
import Products from './Products.js';
import Rawmaterials from './Rawmaterials.js';
import Manufacturingorders from './Manufacturingorders.js';
import Damagesandloss from './Damagesandloss.js';
import Expenses from './Expenses.js';
import Suppliers from './Suppliers.js';
import Businessprofile from './Businessprofile.js';
import Smssendername from './Smssendername.js';
import Apikey from './Apikey.js';
import Inventorysettings from './Inventorysettings.js';
import Taxprofile from './Taxprofile.js';
import Sales from './Sales.js';
import Users from './Users.js';
import Bulksms from './Bulksms.js';
import Services from './Services.js';
import Login from './Login.js';
import Navmenu from './navbar/Navmenu.js';
import Footer from './footer/Footer.js';
import Logout from './Logout.js';
import domupdate from '../state/datasource/domupdate/domupdate.js';
import getLoginuser from '../state/sessionstorage/GET/getLoginuser.js';
import sessionGet from '../state/sessionstorage/GET/sessionGet.js';
import innerHTML from '../utils/innerHTML.js';
import Modal from '../utils/Modal.js';
import Userpermissions from './Userpermissions.js';
import Recordexpenses from './Recordexpenses.js';

const searchstring = new URLSearchParams(window.location.search);
const page = searchstring.get('page');

const Pages = () => {
  const searchstring = new URLSearchParams(window.location.search);
  const page = searchstring.get('page');

  const menu = getLoginuser('menu');
  const slugs = [
    ...menu.map((v) => v.slug),
    'businessprofile',
    'smssendername',
    'apikey',
    'inventorysettings',
    'taxprofile',
    'userpermissions',
    'recordexpenses',
  ];

  const pagess = {
    dashboard: slugs.includes('dashboard') ? Dashboard : Dashboard,
    services: slugs.includes('services') ? Services : Dashboard,
    sales: slugs.includes('sales') ? Sales : Dashboard,
    recordexpenses: slugs.includes('recordexpenses')
      ? Recordexpenses
      : Dashboard,
    users: slugs.includes('users') ? Users : Dashboard,
    activitylogs: slugs.includes('activitylogs') ? Activitylogs : Dashboard,
    analytics: slugs.includes('analytics') ? Analytics : Dashboard,
    userpermissions: slugs.includes('userpermissions')
      ? Userpermissions
      : Dashboard,
    salesreport: slugs.includes('salesreport') ? Salesreport : Dashboard,
    profitandloss: slugs.includes('profitandloss') ? Profitandloss : Dashboard,
    products: slugs.includes('products') ? Products : Dashboard,
    rawmaterials: slugs.includes('rawmaterials') ? Rawmaterials : Dashboard,
    manufacturingorders: slugs.includes('manufacturingorders')
      ? Manufacturingorders
      : Dashboard,
    damagesandloss: slugs.includes('damagesandloss')
      ? Damagesandloss
      : Dashboard,
    expenses: slugs.includes('expenses') ? Expenses : Dashboard,
    suppliers: slugs.includes('suppliers') ? Suppliers : Dashboard,
    businessprofile: slugs.includes('businessprofile')
      ? Businessprofile
      : Dashboard,
    smssendername: slugs.includes('smssendername') ? Smssendername : Dashboard,
    apikey: slugs.includes('apikey') ? Apikey : Dashboard,
    inventorysettings: slugs.includes('inventorysettings')
      ? Inventorysettings
      : Dashboard,
    taxprofile: slugs.includes('taxprofile') ? Taxprofile : Dashboard,
    bulksms: slugs.includes('bulksms') ? Bulksms : Dashboard,
    logout: Logout,
  };

  innerHTML({
    classname: 'display-navbar',
    content: Navmenu(page),
  });

  innerHTML({
    classname: 'display-page',
    content: pagess[page]() || '',
  });
};

if (sessionGet('zsdf')) {
  innerHTML({
    classname: 'root',
    content: `
      <div class="display-navbar"></div>
      <div>
          <div class="marginTop"></div>
          <div class="display-page"></div>
      </div>
      ${Footer()}
      ${Modal()}
  `,
  });

  Pages();
} else {
  Logout();
}

window.onpopstate = function (e) {
  if (sessionGet('zsdf')) {
    Pages();
  } else {
    innerHTML({
      classname: 'root',
      content: Login(),
    });
  }
};

document.addEventListener('click', (e) => {

if(e.target.matches('.logout')){
   history.pushState(null, '', "?page=logout");
}

  if (e.target.matches('.navlinks')) {
    const { navlinks } = e.target.dataset;
    history.pushState(null, '', navlinks);
    Pages(page);
    sessionStorage.setItem('rend', '246');
  }
  if (e.target.matches('.fminpt')) {
    e.target.removeAttribute('readonly');
  }
});

window.addEventListener('load', (e) => {
  domupdate();
});
