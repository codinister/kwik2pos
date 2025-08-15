import toastNotification from '../../utils/toastNotification.js';
import bellIcon from './bellIcon.js';
import getLoginuser from '../../state/sessionstorage/GET/getLoginuser.js';
import userProfile from '../users/userProfile.js';
import industryCheck from '../../utils/industryCheck.js';
import navbarEvent from '../../state/events/navbar/navbarEvent.js';
import profilePhoto from './profilePhoto.js';
import menuSettingsLink from './menuSettingsLink.js';
import menuLinkDropdown from './menuLinkDropdown.js';
import menuLink from './menuLink.js';
import getMenu from '../../utils/getMenu.js';

const Navmenu = (page) => {
  navbarEvent();
  const user = getLoginuser('user');
  const sett = getLoginuser('settings');
  const actual_menu = getMenu();

  return ` 
    <nav class="navbar">
      <div class="nav-bar-wrapper">

      <img src="assets/uploads/${sett?.comp_logo}" alt="" class="mob-logo" />

      <div class="navbaritems">
        <ul>

        <li>
          <a class="navlinks"  
          href="javascript:void(0);"   
          data-navlinks="?page=dashboard">
          <i class="fa fa-qrcode"></i> 
          Dashboard
          </a>
        </li>

        ${menuLinkDropdown({
          name: 'Analytics & Reports',
          icon: 'bar-chart',
          expected_menu: ['analytics', 'salesreport', 'profitandloss'],
          actual_menu,
        })}
       
        ${menuLinkDropdown({
          name: 'Inventory',
          icon: 'cube',
          expected_menu: [
            'products',
            'rawmaterials',
            'manufacturingorders',
            'damagesandloss',
          ],
          actual_menu,
        })}

        ${menuLinkDropdown({
          name: 'Expenses',
          icon: 'pie-chart',
          expected_menu: ['expenses', 'suppliers'],
          actual_menu,
        })}

        ${menuLinkDropdown({
          name: 'User Management',
          icon: 'users',
          expected_menu: ['users', 'activitylogs'],
          actual_menu,
        })}
        
        ${menuSettingsLink()}
        ${menuLink(actual_menu)}
        </ul>
      </div>
      </div>

      <div class="nav-bar-icons">
          <div> 
          <div>
          <img src="assets/images/hamburger.jpg" alt="" class="hamburger" />
          </div>
          <div>
          <h4>
          <a class="navlinks"  
          href="javascript:void(0);"   
          data-navlinks = "?page=dashboard" style="color: #888;">
          ${sett?.comp_name}
          </a>
          </h4>
          </div>
          </div>
          <div class="other-nav-details">
            ${industryCheck('rentals', 'service provider') ? bellIcon() : ''}
    
            <a class="logout" href="?page=logout">
            <i class="fa fa-arrow-left fa-lg"></i> Logout
            </a>     

            <a class="profile-img" href="javascript:void(0);" title="${
              user?.firstname + ' ' + user?.lastname
            }">
            ${profilePhoto(user)}
            </a>
            ${userProfile()}
          </div>
      </div>
      <div class="nav-overlay"></div>
    </nav>

    ${toastNotification()}
    `;
};

export default Navmenu;
