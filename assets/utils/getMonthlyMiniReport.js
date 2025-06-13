const getMonthlyMiniReport = async (callback) => {
  const data = JSON.parse(sessionStorage.getItem('kwikprodminireport'));
  callback(data);
};

export default getMonthlyMiniReport;
