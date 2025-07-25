import getLoginuser from '../../state/sessionstorage/GET/getLoginuser.js';

const menuSettingsLink = () => {
  const user = getLoginuser('user');

  if (user?.role_id === '111') {
    return `
            <li>
              <a href="javascript:void(0);" class="dropdownitem">
                <i class="fa fa-gear"></i> 
                Settings
                <i class="fa fa-angle-down"></i>
              </a>
                <ul class="drop-down">
                  <li>
                  <a class="navlinks"  
                  href="javascript:void(0);"   
                  data-navlinks="?page=businessprofile">
                  Business Profile</a>
                  </li>
                  <li>
                  <a class="navlinks"  
                  href="javascript:void(0);"   
                  data-navlinks="?page=smssendername">
                  SMS Sender Name</a>
                  </li>
                  <li>
                  <a class="navlinks"  
                  href="javascript:void(0);"   
                  data-navlinks="?page=apikey">
                  API Key</a>
                  </li>
                  <li>
                  <a class="navlinks"  
                  href="javascript:void(0);"   
                  data-navlinks="?page=inventorysettings">
                  Inventory Settings</a>
                  </li>
                  <li>
                  <a class="navlinks"  
                  href="javascript:void(0);"   
                  data-navlinks="?page=taxprofile">
                  Tax Profile</a>
                  </li>
                </ul>
            </li>
  
  `;
  } else {
    return 's';
  }
};

export default menuSettingsLink;
