import { classSelector } from './Selectors.js';

const Tabs = ({ ...options }) => {
  const { tabHeader, tabBody } = options;

  document.addEventListener('click', (e) => {
    if (e.target.matches('.tab-btn')) {
      const { tab } = e.target.dataset;
      document.querySelectorAll('.tab').forEach((v) => {
        v.classList.remove('active');
      });

      e.target.classList.add('active');
      if (classSelector(tab)) {
        classSelector(tab).classList.add('active');
      }
    }
  });

  const tabHeaderItems = tabHeader
    .map(
      (v) => `
        <li class="${v.classname} tab tab-btn" data-tab="${v.dataset}">
        <i class="fa fa-${v.icon}"></i> 
        ${v.tabname}
        </li>`
    )
    .join(' ');

  const tabBodyItems = tabBody
    .map(
      (v) => `
         <li class="${v.classname} tab ${v.dataset}">
              ${v.fn}
         </li>
        `
    )
    .join(' ');

  return `
  <div class="tabs-wrapper">
        <div class="tab-header">
          <ul>
            ${tabHeaderItems}
          </ul>
        </div>
        <div class="tab-body">
          <ul>
          ${tabBodyItems}
          </ul>
        </div>
      </div>
  `;
};

export default Tabs;
