import { classSelector } from '../../../utils/Selectors.js';

const userProfileOnload = (users, user_id) => {
  const loginuser = users.filter((v) => v.user_id === user_id);

  if (classSelector('profile-img')) {
    classSelector(
      'profile-img'
    ).innerHTML = `<img class="profileimage"  src="assets/uploads/${
      loginuser[0]?.photo ? loginuser[0]?.photo : 'avatar.png'
    }" alt="Profile Photo" />`;
  }
};

export default userProfileOnload;
