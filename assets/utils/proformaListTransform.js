
const proformaListTransform = (allproforma) => {
    return Object.values(allproforma)
      .map(v => v.proforma_list)
      .flat(3)
      .map(v => Object.values(v))
      .flat(3)
}

export default proformaListTransform