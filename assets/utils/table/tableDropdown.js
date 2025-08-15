const tableDropdown = (dropdown) => {
  return `
  <a href="javascript:void(0);" class="tabledropdown">
    <div>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div>
    <ul>
      ${dropdown}
    </ul>
    </div>
  </a>
  
  `;
};

export default tableDropdown;
