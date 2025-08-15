import profitandlossEvent from '../state/events/pages/profitandlossEvent.js';
import CompanyDetails from '../utils/CompanyDetails.js';
import { classSelector } from '../utils/Selectors.js';
import Tabs from '../utils/Tabs.js';
import simpleReport from './profitandloss/simpleReport.js';
import standardReport from './profitandloss/standardReport.js';

const Profitandloss = () => {
  profitandlossEvent();

  return `
    <section class="profitandloss">
      <div class="">
        <div>
          ${CompanyDetails({
            title: 'Profit & Loss Report',
            desc: '',
          })}
        </div>
        <div>
          <button> 
          <i class="fa fa-calendar"></i>
          <span data-modal="modal-one"  class="show-modal profitlossreport">
          Filter Report</span>
          </button>
          <button> 
          <i class="fa fa-print"></i>
          <span>Print</span>
          </button>
          <button> 
          <i data-modal="modal-two" class="fa fa-question-circle-o show-modal  profit-loss-question"></i>
          </button>
        </div>
      </div>


      <div class="tabs-container">

      ${Tabs({
        tabHeader: [
          {
            tabname: 'Simple Report',
            dataset: 'tab-item-1',
            icon: 'file-o',
            classname: 'active',
          },
          {
            tabname: 'Standard Report',
            dataset: 'tab-item-2',
            icon: 'file-text-o',
            classname: '',
          },
        ],

        tabBody: [
          {
            fn: simpleReport(),
            dataset: 'tab-item-1',
            classname: 'active',
          },
          {
            fn: standardReport(),
            dataset: 'tab-item-2',
            classname: '',
          },
        ],
      })}

    </div>
    </section>
  `;
};

export default Profitandloss;
