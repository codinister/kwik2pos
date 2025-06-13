// getUrlSearchParam({
//   cat: '',
//   page: '',
//   prodsize: '',
// });

const getUrlSearchParam = ({ ...newp }) => {
  const { cat, page, prodsize } = newp;

  const url = new URLSearchParams(window.location.search);

  const pageParam = url.get('p');
  const catParam = url.get('c');
  const prodsizeParam = url.get('ps');

  const p = page ? `&p=${page}` : pageParam ? `&p=${pageParam}` : '';
  const c = cat ? `&c=${cat}` : catParam ? `&c=${catParam}` : '';
  const ps = prodsize
    ? `&ps=${prodsize}`
    : prodsizeParam
    ? `&ps=${prodsizeParam}`
    : '';

  const newurl = p + c + ps;
  return `index.html?page=products${newurl}`;
};

export default getUrlSearchParam;
