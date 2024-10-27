
const apiBaseUrl = (task) => {
  return `../router.php?controller=preview&task=${task}`
}

export default apiBaseUrl