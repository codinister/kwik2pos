const profilePhoto = (user) => {
  return `
      <img class="profileimage"  src="assets/uploads/${
        user?.photo ? user?.photo : 'avatar.png'
      }" alt="Profile Photo" />
`;
};

export default profilePhoto;
