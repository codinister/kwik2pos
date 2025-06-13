const defaultLoginValues = () => {
  if (!sessionStorage.getItem('loginvalues')) {
    sessionStorage.setItem(
      'loginvalues',
      JSON.stringify({
        username: '',
        password: '',
      })
    );
  }
};

export default defaultLoginValues;
