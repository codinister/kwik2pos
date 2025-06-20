const searchParam = () => {
  const url = new URLSearchParams(window.location.search);
  const page = url.get('page');
  return page;
};

export default searchParam;
