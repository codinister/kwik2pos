
const trimPhone = (phone) => {
  const jn = phone.split(' ').join('');
  if (jn.startsWith('+233')) {
    const res = jn.slice(4, jn.length);
    return res
  }
  return jn
}

export default trimPhone