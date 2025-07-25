
const receiptListTransform = (allreceipts) => {

    return Object.values(allreceipts)
      .map(v => v.receipts_list)
      .flat(3)
      .map(v => Object.values(v))
      .flat(3)
}

export default receiptListTransform