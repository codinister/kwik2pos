
import innerHTML from '../utils/innerHTML.js'
const Error = (outputClass, message, buttonText) => {
  setTimeout(() => {
    innerHTML({
      classname: outputClass,
      content: buttonText,
    });
  }, 4000);
  return innerHTML({
    classname: outputClass,
    content: `
	ERROR: ${message}
	`,
  });
};

export default Error;
