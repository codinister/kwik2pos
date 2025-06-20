const uuid = () => {
  const crypto = self?.crypto?.randomUUID() || '';
  return crypto;
};

export default uuid;
