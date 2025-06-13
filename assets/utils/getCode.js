const getCode = () => {
  if(sessionStorage.getItem('zsdf')){
    const { code } = JSON.parse(sessionStorage.getItem('zsdf'));
    return code;
  }
  else{
    return ''
  }

};
export default getCode;
