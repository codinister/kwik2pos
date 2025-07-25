
const menuLinkDropdown = ({...options}) => {
  const {name,icon, expected_menu,actual_menu} = options


  const arr = Object.values(actual_menu).filter(v => expected_menu.includes(v.slug))

  if(arr.length > 0){
    return `<li>
            <a href="javascript:void(0);" class="dropdownitem">
            <i class="fa fa-${icon}"></i> 
            ${name}
            <i class="fa fa-angle-down"></i>
            </a>
            <ul class="drop-down">
              ${
                arr.map(v => {
                return `<li>
                <a class="navlinks"  
                href="javascript:void(0);"   
                data-navlinks="?page=${v.slug}">
                ${v.menu_name}
                </a>
                </li>`
                }).join(' ')
              }
            </ul>
          </li>`
  }

}

export default menuLinkDropdown