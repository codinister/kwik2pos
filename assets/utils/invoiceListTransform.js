


const invoiceListTransform = (allinvoice) => {
    return Object.values(allinvoice)
      .map(v => v.invoice_list)
      .flat(3)
      .map(v => Object.values(v))
      .flat(3)
}

export default invoiceListTransform