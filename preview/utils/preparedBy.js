const preparedBy = (user_id, onj) => {
  const { firstname, lastname, signature } = obj;
  if (user_id.length > 0) {
    return {
      fullname: firstname + ' ' + lastname,
      signature: signature,
    };
  } else {
    return {
      fullname: false,
      signature: false,
    };
  }
};

export default preparedBy;
