import getPerpage from './getPerpage.js'


const pagination = (data) => {
  const p = new URLSearchParams(window.location.search);
  const cur_page = p.get('p') || 1;
  const per_page = Number(getPerpage())

  //List
  const pag_start = Number(cur_page) * per_page - per_page;
  const pag_end = Number(cur_page) * per_page;

  const paginResult = data.slice(pag_start, pag_end);
  const length = Math.floor(Number(data.length) / per_page);

  return {length, paginResult}
};

export default pagination;
