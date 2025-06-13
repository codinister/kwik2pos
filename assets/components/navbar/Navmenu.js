import toastNotification from '../../utils/toastNotification.js';

import bellIcon from './bellIcon.js';

import getLoginuser from '../../state/statemanagement/sessionstorage/GET/getLoginuser.js';

import userProfile from '../users/userProfile.js';
import industryCheck from '../../utils/industryCheck.js';

const Navmenu = (page) => {
  const loginuser = getLoginuser();
  const user = loginuser?.user;
  const sett = loginuser?.settings;
  const fullname = user?.firstname + ' ' + user?.lastname;

  const privelleges = loginuser?.menu
    .filter((v) => v.menu_parent === 'null')
    .map((v) => v.menu_name.toLowerCase());

  const linknames = [...privelleges]
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
    .join(' ');

  const otp = `
          <ul class="navbar-nav">
              ${linknames}
              <div class="navbar-nav-overlay"></div>
          </ul>
          `;

  let bell = '';
  if (industryCheck('rentals', 'service provider')) {
    bell = bellIcon();
  }

  return ` 
    <nav class="navbar">


      <div class="nav-bar-wrapper">
      <img src="assets/uploads/${
        sett?.comp_logo
      }" alt="" class="mob-logo hideondesktop" />
       <div class="navbaritems">
       
       </div>
       </div>



        <div class="nav-bar-icons">

          <img src="assets/images/hamburger.jpg" alt="" class="hamburger hideondesktop" />

          <span class="appexpiration"></span>

          <div class="other-nav-details ">
            ${bell}
            <a class="logout" href="?page=logout">
            <i class="fa fa-arrow-left fa-lg"></i> LOGOUT
            </a>             
            <a class="profile-img" href="javascript:void(0);" title="${fullname}">
            <img class="closeprofilebox profileimage"  src="assets/uploads/${
              user?.photo ? user?.photo : 'avatar.png'
            }" alt="Profile Photo">
            </a>
          </div>
        </div>


        <div class="nav-overlay"></div>

   
    </nav>
    ${userProfile()}
    ${toastNotification()}
    `;
};

export default Navmenu;
