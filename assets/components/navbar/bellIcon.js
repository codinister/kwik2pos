import reminderBox from './reminderBox.js';
import roleAccess from '../../utils/roleAccess.js'
const bellIcon = () => {

  if(roleAccess()){
  return `
  <div class="bellicon">
  <i class="fa fa-bell text-success"></i>
  ${reminderBox()}
  </div>
  `;
  }
  else{

  }
};

export default bellIcon;
