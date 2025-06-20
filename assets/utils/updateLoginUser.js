const updateLoginUser = (option, data, statename) => {
  const required = statename + 'required';
  const obj = JSON.parse(sessionStorage.getItem('zsdf'));
  obj[option] = data;
  sessionStorage.setItem('zsdf', JSON.stringify(obj));

  const userprof = JSON.parse(sessionStorage.getItem(statename));
  userprof['signature'] = data?.signature;
  userprof['photo'] = data?.photo;
  sessionStorage.setItem(statename, JSON.stringify(userprof));
};

export default updateLoginUser;
