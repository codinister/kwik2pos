import getSearchParam from '../../utils/getSearchParam.js';
import setSearchParamURL from '../../utils/setSearchParamURL.js';

const paginationEvent = () => {
  const { cur_page } = getSearchParam();

  document.addEventListener('click', (e) => {
    if (e.target.matches('.pgn-btn')) {
      const { num } = e.target.dataset;
      setSearchParamURL(num);
    }

    if (e.target.matches('.prev-btn')) {
      const num = Number(cur_page) - 1;
      setSearchParamURL(num);
    }

    if (e.target.matches('.next-btn')) {
      const num = Number(cur_page) + 1;
      setSearchParamURL(num);
    }
  });
};

export default paginationEvent;
