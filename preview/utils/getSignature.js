const getSignature = (signatures, fullname) => {
  const signature =
    signatures.length > 0
      ? `<img src="../assets/uploads/${signatures}" alt="" />`
      : fullname;

  return signature;
};

export default getSignature;
