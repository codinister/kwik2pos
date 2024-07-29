import getIndustry from '../../utils/getIndustry.js';

const availableStockData = (data) => {
  const industry = getIndustry();

  if (industry === 'rentals') {
    return data?.rentals.availables;
  }
  if (industry === 'retails') {
    return data?.retails.stocks;
  }
  if (industry === 'service provider' || industry === 'roofing company') {
    return data.service
  }
};

export default availableStockData;
