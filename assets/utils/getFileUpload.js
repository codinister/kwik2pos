import { classSelector } from './Selectors.js';

const getFileUpload = (inputname) => {
  if (classSelector(inputname)) {
    const img = classSelector(inputname);
    if (img.files && img.files[0]) {
      return img.files[0];
    }
  }
};

export default getFileUpload;
