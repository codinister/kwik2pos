import sessionSet from './sessionSet.js';

const setLoginUser = (obj) => {
  sessionSet({
    statename: 'userprofile',
    content: obj,
  });
};

export default setLoginUser;
