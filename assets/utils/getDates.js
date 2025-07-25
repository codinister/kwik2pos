const getDates = (data) => {
  if (Array.isArray(data)) {
    return data
      .sort((a, b) => {
        if (a.createdAt > b.createdAt) return 1;
        else if (a.createdAt < b.createdAt) return -1;
        else return 0;
      })
      .map((v) => v.createdAt)
      .filter(Boolean);
  } else {
    console.error('getDates function requires an array');
  }
};

export default getDates;
