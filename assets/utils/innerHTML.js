import { classSelector } from './Selectors.js';
const innerHTML = ({ ...options }) => {
  const { classname, content } = options;
  if (classSelector(classname)) {
    classSelector(classname).innerHTML = content;
  }
};

export default innerHTML;
