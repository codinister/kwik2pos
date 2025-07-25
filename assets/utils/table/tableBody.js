import innerHTML from "../innerHTML.js";
const tableBody = ({...options}) => {
  const { tbClass, tbData } = options;
  innerHTML({
    classname: `${tbClass}`,
    content: tbData.join(' '),
  });
}

export default tableBody