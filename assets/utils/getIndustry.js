const getIndustry = () => {
  const sett = JSON.parse(sessionStorage.getItem('zsdf'))?.settings
  if (sett?.industry) return sett?.industry;
};

export default getIndustry;
