import sessionGet from '../state/sessionstorage/GET/sessionGet.js';

const setInputValue = (stateName, inputName, value) => {
  if (sessionGet(stateName)) {
    const obj = sessionGet(stateName);

    if (obj) {
      return obj[inputName];
    } else {
      return value;
    }
  }


};

export default setInputValue;
