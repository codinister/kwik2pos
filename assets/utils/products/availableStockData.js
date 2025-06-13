import industryCheck from "../industryCheck.js";

const availableStockData = (data) => {


  if (industryCheck('rentals')) {
    return data?.rentals.availables;
  }
  if (industryCheck('retails')) {
    return data?.retails.stocks;
  }
  if (industryCheck('service provider')) {
    return data.service
  }
  if (industryCheck('roofing company')) {
    return data?.roofing
  }
};

export default availableStockData;
