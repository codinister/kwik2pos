const ButtonDropdown = ({ ...options }) => {
  const { title, content, classname, icon } = options;
  return `
        <button class="button-dropdown ${classname}">
            <i class="fa fa-${icon}"></i>
            ${title}
            <ul>
            ${content}
            </ul>
        </button>
  `;
};

export default ButtonDropdown;
