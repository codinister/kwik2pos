const getInvoiceDetails = async (
  cust_id,
  ss_id,
  user_id,
  duplicate = '',
  callback
) => {
  const fd = new FormData();
  fd.append('cust_id', cust_id);
  fd.append('user_id', user_id);
  fd.append('ss_id', ss_id);
  if (duplicate) {
    fd.append('duplicate', 'Yes');
  }
  const fech = await fetch(
    `router.php?controller=sales&task=getInvoiceDetails`,
    {
      method: 'Post',
      body: fd,
    }
  );
  const data = await fech.json();

  return callback(data);
};

export default getInvoiceDetails;
