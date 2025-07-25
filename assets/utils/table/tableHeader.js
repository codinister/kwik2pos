

import innerHTML from '../innerHTML.js'

const tableHeader = ({ ...options }) => {
  const { thClass, thData } = options;
  innerHTML({
    classname: `${thClass}`,
    content: `<tr>
          ${Object.values(thData)
            .map((v) => {
              return `<td>${v}</td>`;
            }).join(' ')}
        </tr>`,
  });
};

export default tableHeader;
