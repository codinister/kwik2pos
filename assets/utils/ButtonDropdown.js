const ButtonDropdown = ({ ...options }) => {
  const { title, content, classname, icon } = options;
  return `
        <button class="button-dropdown ${classname}">
            ${icon ? `<i class="fa fa-${icon}"></i>` : ''}
            ${title}
            <ul>
            ${content}
            </ul>
        </button>
  `;
};

export default ButtonDropdown;
