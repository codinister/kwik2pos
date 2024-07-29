import toastNotification from '../utils/toastNotification.js';
import { classSelector } from '../utils/Selectors.js';
import bellIcon from './bellIcon.js';
import getIndustry from '../utils/getIndustry.js';
import getLoginuser from '../data/clientside/localstorage/GET/getLoginuser.js';
import getSettingLocalstorage from '../data/clientside/localstorage/GET/getSettingLocalstorage.js';
import defaultProfileLocalstorage from '../data/clientside/localstorage/default/defaultProfileLocalstorage.js';
import userProfile from '../users/userProfile.js';

const Navmenu = () => {
  const industry = getIndustry();
  const sett = getSettingLocalstorage();
  const user = getLoginuser();

  const sess = JSON.parse(localStorage.getItem('zsdf'));
  const fullname = sess?.firstname + ' ' + sess?.lastname;

  const privelleges = user?.menus
    .filter((v) => v.menu_parent === 'null')
    .map((v) => v.menu_name.toLowerCase());

  const arr = privelleges
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
              <li class="close-box">
                <a href="javascript:void(0);" title="Close" class="close-btn">x</a>
              </li>
              ${arr}
              <div class="navbar-nav-overlay"></div>
          </ul>
          `;

  setTimeout(() => {
    if (classSelector('navbaritems')) {
      classSelector('navbaritems').innerHTML = otp;
    }
  }, 0);

  document.addEventListener('click', (e) => {
    if (e.target.matches('.close-btn')) {
      classSelector('navbar-nav').classList.remove('show');
      classSelector('navbar-nav').classList.add('hide');
    }

    if (e.target.matches('.navbar-nav-overlay')) {
      classSelector('navbar-nav').classList.add('hide');
    }

    if (e.target.matches('.hamburger-span')) {
      classSelector('navbar-nav').classList.remove('hide');
      classSelector('navbar-nav').classList.add('show');
    }

    if (e.target.matches('.close-profile-box')) {
      e.stopImmediatePropagation();
      classSelector('profileformbox').classList.remove('show');
    }

    if (e.target.matches('.closeprofilebox')) {
      e.stopImmediatePropagation();
      classSelector('profileformbox').classList.toggle('show');
    }
  });

  document.addEventListener('change', (e) => {
    if (e.target.matches('.uploadsig')) {
      e.stopImmediatePropagation();
      defaultProfileLocalstorage();
      const img = classSelector('simg');
      const fr = new FileReader();
      if (e.target.files && e.target.files[0]) {
        fr.onload = function (e) {
          img.setAttribute('src', e.target.result);
        };
        fr.readAsDataURL(e.target.files[0]);
      }
    }

    if (e.target.matches('.uploadprofimg')) {
      e.stopImmediatePropagation();
      defaultProfileLocalstorage();
      const img = classSelector('profileimage');
      const img2 = classSelector('pimg');
      const fr = new FileReader();
      if (e.target.files && e.target.files[0]) {
        fr.onload = function (e) {
          img.setAttribute('src', e.target.result);
          img2.setAttribute('src', e.target.result);
        };
        fr.readAsDataURL(e.target.files[0]);
      }
    }
  });

  let bell = '';

  if (industry === 'rentals' || industry === 'service provider') {
    bell = bellIcon();
  }

  return ` 
    <nav class="navbar">
        <div class="navbaritems"></div>
        <span class="appexpiration"></span>
        <div class="other-nav-details">
        <a href="javascript:void(0);" class="hamburger hamburger-span">
        <span class="hamburger-span"></span>
        <span class="hamburger-span"></span>
        <span class="hamburger-span"></span>
        </a>

        ${bell}
 
        <a class="logout" href="?page=logout">
        <i class="fa fa-arrow-left fa-lg"></i> LOGOUT
        </a>
                        
        <a class="profile-img" href="javascript:void(0);" title="${fullname}">
        <img class="closeprofilebox profileimage"  src="assets/uploads/${
          sess?.photo ? sess?.photo : 'avatar.png'
        }" alt="Profile Photo">
        </a>
        
        </div>
    </nav>
    ${userProfile()}
    ${toastNotification()}
    `;
};

export default Navmenu;
