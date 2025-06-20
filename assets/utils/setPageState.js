const setPageState = (sname, data, reqfields) => {
  if (!sessionStorage.getItem(sname)) {
    
    if (data) {
      const obj = {};
      reqfields.forEach((v) => {
        if (data[v].length > 0) obj[v] = data[v];
      });
      const statename = sname + 'required';
      sessionStorage.setItem(sname, JSON.stringify(data));
      sessionStorage.setItem(statename, JSON.stringify(obj));
    }
  }
};

export default setPageState;
