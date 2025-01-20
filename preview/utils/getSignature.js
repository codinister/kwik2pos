const getSignature = (signatures, fullname) => {
  let signature;

  if (localStorage.getItem('zsdf')) {
    signature =
      signatures.length > 0
        ? `<img src="assets/uploads/${signatures}" height="60" style= alt="" />`
        : fullname;
  } else {
    signature =
      signatures.length > 0
        ? `<img src="../assets/uploads/${signatures}" style="margin: 0 auto;" height="60" alt="" />`
        : fullname;
  }

  return signature;
};

export default getSignature;
