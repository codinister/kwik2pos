import getIndustry from './getIndustry.js';

const posTableclasses = (duration = '', k = '') => {
  const industry = getIndustry();

  let product_size = '';
  let table_class = '';
  let length_duration = '';

  if (industry === 'roofing company') {
    length_duration = `<li>Length</li>`;
    table_class = 'roofing-table';
    product_size = `<li>
    <input class="sumitems duration" name="duration" type="number" data-key="${k}" value="${duration}" />
    </li>`;
  } else if (industry === 'service provider') {
    length_duration = `
    <li >
    <span class="hideonmobile">Duration</span>
    <span class="hideondesktop">Dur</span>
    </li>  
    `;
    table_class = 'service-table';
    product_size = `<li>
    <input class="sumitems duration" name="duration" type="number" data-key="${k}" value="${duration}" />
    </li>`;
  } else if (industry === 'rentals') {

    length_duration = `
    <li >
    <span class="hideonmobile">Duration</span>
    <span class="hideondesktop">Dur</span>
    </li>  
    `;

    table_class = 'rental-table';
    
    product_size = `
    <li>
    <input class="sumitems duration" name="duration" type="number" data-key="${k}" value="${duration}" />
    </li>
    `;


  } else if (industry === 'retails') {
    table_class = 'retail-table';
  }

  return {
    product_size,
    table_class,
    length_duration,
  };
};

export default posTableclasses;
