import getIndustry from './getIndustry.js';
const industryCheck = (...arr) => {
  const industry = getIndustry();
  return arr.includes(industry);
};

export default industryCheck;


//industryCheck('rentals', 'service provider','roofing company','retails')
