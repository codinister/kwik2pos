const getDataLength = (data) => {
  return Object.values(data).filter(Boolean).length;
};

export default getDataLength;
