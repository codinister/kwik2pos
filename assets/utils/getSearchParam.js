const getSearchParam = () => {
  const p = new URLSearchParams(window.location.search);
  const cur_page = p.get('p') || 1;
  const page = p.get('page');
  return { page, cur_page };
};

export default getSearchParam;
