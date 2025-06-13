import getUsersSessionStorage from '../../state/statemanagement/sessionstorage/GET/getUsersSessionStorage.js';
import Buttons from '../../utils/Buttons.js';

const userSavebtn = () => {

  if (getUsersSessionStorage()) {
    const obj = getUsersSessionStorage();
    const length = Object.values(obj).filter(Boolean).length;

    if (obj?.modified && length > 13) {
      return Buttons([
        {
          btnclass: 'saveuserbtn',
          btnname: 'SAVE USER',
        },
      ]);
    } else if (!obj?.modified && length > 13) {
      return `<span>No changes made!</span>`;
    } else {
      return `<span>All User details fields required!</span>`;
    }
  } else {
    return `<span>All User details fields required!</span>`;
  }
};

export default userSavebtn;
