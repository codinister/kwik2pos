const sessionGet = (statename) => {

    return JSON.parse(sessionStorage.getItem(statename));
  
};

export default sessionGet;
