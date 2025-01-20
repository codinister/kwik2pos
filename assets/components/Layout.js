import Navmenu from './navbar/Navmenu.js';
import contentModal from './utils/contentModal.js';
import contentPreview from './utils/contentPreview.js';

const Layout = (page, html) => {
  contentPreview();
  return `
    <style>
    .${page}{  
      background-color: #425c59;
      color: white!important;
    padding-block: .8rem;
    padding-inline: 1.2rem;
    border-radius: 2.4rem;
      }
    </style>
    <div class="nav-menu">${Navmenu()}</div>
    <div class="marginTop"></div>
    ${html}
    <footer>
    <small>&copy; copyright 2023 <span id="appname"></span> by <a href="http://www.emagwebsolutions.com">Emagweb Solutions</a></small>
    </footer>	
    <br><br><br>
    ${contentModal('', ``)}
    `;
};

export default Layout;
