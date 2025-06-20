import toastNotification from '../../utils/toastNotification.js';
import bellIcon from './bellIcon.js';
import getLoginuser from '../../state/statemanagement/sessionstorage/GET/getLoginuser.js';
import userProfile from '../users/userProfile.js';
import industryCheck from '../../utils/industryCheck.js';
import navbarEvents from '../../state/events/navbar/navbarEvents.js';

const Navmenu = (page) => {
  navbarEvents();

  const menu = getLoginuser('menu');
  const user = getLoginuser('user');
  const sett = getLoginuser('settings');


  const privelleges = menu
    .filter((v) => v.menu_parent === 'null')
    .map((v) => v.menu_name.toLowerCase());



  return ` 
    <nav class="navbar">

      <div class="nav-bar-wrapper">
      <img src="assets/uploads/${sett?.comp_logo}" alt="" class="mob-logo" />

      <div class="navbaritems">
        <ul>
        ${[...privelleges]
          .map((a) => {
            return `
                      <li class="nav-item dropdown">
                      <a class="${a.toLowerCase()} navlinks   nav-link"  
                      href="javascript:void(0);"   
                      data-navlinks = "?page=${a.toLowerCase()}"
                      id="navbarDropdownMenuLink"
                      >
                      ${a} 
                      </a>
                      </li>`;
          })
          .join(' ')}
        </ul>
      </div>
      </div>

      <div class="nav-bar-icons">

          <div> 
          <div>
          <img src="assets/images/hamburger.jpg" alt="" class="hamburger" />
          </div>
          <div>
          <h4>${sett?.comp_name}</h4>
          </div>
          </div>

          <div class="other-nav-details">
          
            ${industryCheck('rentals', 'service provider') ? bellIcon() : ''}
    
            <a class="logout" href="?page=logout">
            <i class="fa fa-arrow-left fa-lg"></i> Logout
            </a>     

            <a class="profile-img" href="javascript:void(0);" title="${user?.firstname + ' ' + user?.lastname}">
            <img class="profileimage"  src="assets/uploads/${
              user?.photo ? user?.photo : 'avatar.png'
            }" alt="Profile Photo">
           
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
