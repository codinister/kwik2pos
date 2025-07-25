import sessionGet from '../state/sessionstorage/GET/sessionGet.js';
import sessionSet from '../state/sessionstorage/SET/sessionSet.js';

const updateLoginUser = (option, data, statename) => {

  const obj = sessionGet('zsdf');
  obj[option] = data;
  sessionSet({
    statename: 'zsdf',
    content: obj,
  });

  const userprof = sessionGet(statename);
  userprof['signature'] = data?.signature;
  userprof['photo'] = data?.photo;

  sessionSet({
    statename,
    content: userprof,
  });
};

export default updateLoginUser;
