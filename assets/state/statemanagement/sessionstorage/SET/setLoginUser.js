const setLoginUser = (obj) => {
  sessionStorage.setItem('userprofile', JSON.stringify(obj));
};

export default setLoginUser;

