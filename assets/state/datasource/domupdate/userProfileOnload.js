import profilePhoto from '../../../components/navbar/profilePhoto.js';


const userProfileOnload = (users, user_id, innerHTML) => {
  const loginuser = users.filter((v) => v.user_id === user_id)[0]

  innerHTML({
    classname: 'profile-img',
    content: profilePhoto(loginuser),
  });
};

export default userProfileOnload;
