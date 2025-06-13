const urlCode = () => {
  const code = JSON.parse(sessionStorage.getItem('zsdf'))?.user.code;

  return `&code=${code}`;
};

export default urlCode;
