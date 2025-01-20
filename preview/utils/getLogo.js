const getLogo = (comp_logo) => {
  let logo;
  if (localStorage.getItem('zsdf')) {
    logo = `<img  src="assets/uploads/${comp_logo}" alt="logo" />`;
  } else {
    logo = `<img  src="../assets/uploads/${comp_logo}" alt="logo" />`;
  }

  return logo;
};

export default getLogo;
