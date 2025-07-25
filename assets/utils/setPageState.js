import sessionSet from '../state/sessionstorage/SET/sessionSet.js';
import sessionGet from '../state/sessionstorage/GET/sessionGet.js';

const setPageState = (sname, data, reqfields) => {
  if (!sessionGet(sname)) {
    if (data) {
      const obj = {};
      reqfields.forEach((v) => {
        if (data[v].length > 0) obj[v] = data[v];
      });
      const statename = sname + 'required';

      sessionSet({
        statename: sname,
        content: data,
      });

      sessionSet({
        statename,
        content: obj,
      });
    }
  }
};

export default setPageState;
