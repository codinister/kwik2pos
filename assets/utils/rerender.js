import sessionSet from '../state/sessionstorage/SET/sessionSet.js';
import sessionGet from '../state/sessionstorage/GET/sessionGet.js';

const rerender = (fn, num) => {
  const rend = sessionGet('rend');

  if (rend == num) {
    fn();

    sessionSet({
      statename: 'rend',
      content: 0,
    });
  }

  setTimeout(() => {
    rerender(fn, num);
  }, 1000);
};

export default rerender;
