import { classSelector } from './Selectors.js';

const textContent = ({ ...options }) => {
  const { classname, content } = options;
  if (classSelector(classname)) {
    classSelector(classname).textContent = content;
  }
};

export default textContent;
