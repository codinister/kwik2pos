
import industryCheck from '../industryCheck.js';
import { classSelector } from '../Selectors.js';
import { Tabs, tabContent, tabMenu } from '../Tabs.js';

const TabsSections = () => {
  const set = JSON.parse(sessionStorage.getItem('sinpt'));
  let proforma = industryCheck('retails') ? 'Estimates' : 'Proforma';

  let tabMenuObj;


    tabMenuObj = [
      { name: proforma, active: 'active', tabTarget: 'tab1' },
      { name: 'Sales Invoice', active: '', tabTarget: 'tab2' },
      { name: 'Receipt', active: '', tabTarget: 'tab3' },
    ];
  

  let tabContentObj = [
    {
      tab: `<div id="tab1" class="active hide-tab cuts-tabs proformainvoice">
      </div>`,
    },
    {
      tab: `<div id="tab2" class="hide-tab  cuts-tabs salesinvoice">
      </div>`,
    },
    {
      tab: `<div id="tab3" class="hide-tab  cuts-tabs receipts">
  </div>`,
    },
    {
      tab: `<div id="tab4" class="hide-tab  cuts-tabs waybills">
      </div>`,
    },
  ];

  if (classSelector('bottom-part-desktop')) {
    classSelector('bottom-part-desktop').innerHTML = Tabs(
      tabMenu(tabMenuObj),
      tabContent(tabContentObj)
    );
  }
};

export default TabsSections;
